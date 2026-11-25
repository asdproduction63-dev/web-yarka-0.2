// Kode bersama untuk fungsi server pembayaran (Vercel Functions).
// File di folder _lib tidak menjadi alamat publik.
//
// Variabel lingkungan (Vercel > Project > Settings > Environment Variables):
//   KOMERCE_API_KEY          API key "Payment API" dari dashboard Komerce/RajaOngkir
//   KOMERCE_CALLBACK_KEY     kata sandi acak buatan sendiri untuk tanda tangan callback
//   KOMERCE_MODE             "sandbox" (uji coba) atau "production" (uang sungguhan)
//   SUPABASE_URL             https://xxxx.supabase.co
//   SUPABASE_SERVICE_KEY     secret / service_role key Supabase (JANGAN dipasang di website)
//   SITE_URL                 opsional, mis. https://yarka.vercel.app
'use strict';
const fs = require('fs');
const path = require('path');
const vm = require('vm');

// ---------- Aturan toko (harus sama dengan assets/checkout.js) ----------
const ONGKIR_SAH = [22000, 25000, 35000]; // JNE, SiCepat, Paxel
const ASURANSI = 2500;
const MAX_QTY = 10;
const REF_RE = /^YRK-[0-9]{8}-[0-9A-F]{6}$/;

// ---------- Data produk: dibaca dari file yang sama dengan website ----------
let _produk = null;
function produk() {
  if (_produk) return _produk;
  const src = fs.readFileSync(path.join(process.cwd(), 'assets', 'produk-data.js'), 'utf8');
  const sandbox = { window: {} };
  vm.runInNewContext(src, sandbox, { timeout: 1000 });
  _produk = { P: sandbox.window.YARKA_PRODUCTS, Y: sandbox.window.YARKA };
  return _produk;
}

// Hitung ulang total pesanan dari katalog. Mengembalikan { total } atau { error }.
function hitungTotal(order) {
  const { P, Y } = produk();
  const items = Array.isArray(order.items) ? order.items : [];
  if (!items.length) return { error: 'Pesanan tidak berisi produk.' };
  let sub = 0;
  const baris = [];
  for (const it of items) {
    const p = P[it && it.id];
    const q = Number(it && it.q);
    if (!p || !Number.isInteger(q) || q < 1 || q > MAX_QTY) return { error: 'Data produk pesanan tidak valid.' };
    if (!it.s || p.sizes.indexOf(it.s) < 0) return { error: 'Ukuran produk pesanan tidak valid.' };
    const col = Y.color(p, it.warna);
    const unit = Y.harga(p, col && col.n, it.s); // harga satuan dari katalog, bukan dari browser
    sub += unit * q;
    baris.push({ nama: p.name + ' - ' + (col ? col.n : '') + ' / ' + it.s, q, unit });
  }
  const ongkir = Number(order.ongkir);
  if (ONGKIR_SAH.indexOf(ongkir) < 0) return { error: 'Ongkos kirim pesanan tidak valid.' };
  const total = sub + ongkir + ASURANSI;
  if (Number(order.total) !== total) return { error: 'Total pesanan tidak cocok dengan harga katalog.' };
  return { total, items: baris };
}

// ---------- Supabase (pakai secret key, melewati RLS) ----------
function sbHeaders(extra) {
  const key = String(process.env.SUPABASE_SERVICE_KEY || '').trim().replace(/^["']|["']$/g, '');
  const h = Object.assign({ apikey: key, 'Content-Type': 'application/json' }, extra || {});
  if (!/^sb_/.test(key)) h.Authorization = 'Bearer ' + key; // key lama berformat JWT
  return h;
}
function sbUrl(p) { return String(process.env.SUPABASE_URL || '').trim().replace(/\/+$/, '') + '/rest/v1/' + p; }

const KOLOM = 'ref,items,kontak,subtotal,ongkir,total,status_bayar,metode_bayar,payment_id,payment_info,dibayar_pada';
async function ambilPesanan(filter) {
  const r = await fetch(sbUrl('pesanan_repeat?select=' + KOLOM + '&' + filter + '&limit=1'), { headers: sbHeaders() });
  if (!r.ok) throw new Error('Supabase ' + r.status + ': ' + (await r.text()).slice(0, 300));
  const rows = await r.json();
  return rows[0] || null;
}
async function ubahPesanan(ref, data, syarat) {
  const r = await fetch(sbUrl('pesanan_repeat?ref=eq.' + encodeURIComponent(ref) + (syarat || '')), {
    method: 'PATCH', headers: sbHeaders({ Prefer: 'return=minimal' }), body: JSON.stringify(data)
  });
  if (!r.ok) throw new Error('Supabase ' + r.status + ': ' + (await r.text()).slice(0, 300));
}

// ---------- Komerce Payment API ----------
function kmBase() {
  return process.env.KOMERCE_MODE === 'production'
    ? 'https://api.collaborator.komerce.id/user'
    : 'https://api-sandbox.collaborator.komerce.id/user';
}
async function km(method, p, body) {
  const r = await fetch(kmBase() + p, {
    method,
    headers: { 'x-api-key': process.env.KOMERCE_API_KEY || '', 'Content-Type': 'application/json', Accept: 'application/json' },
    body: body ? JSON.stringify(body) : undefined
  });
  const text = await r.text();
  let json = null; try { json = JSON.parse(text); } catch (e) {}
  return { ok: r.ok, status: r.status, json, text };
}

// Dokumentasi Komerce belum mencantumkan nama kolom respons secara lengkap, jadi nilai dicari
// dengan beberapa nama yang umum dipakai (mis. va_number / virtual_account).
function cari(obj, keys, depth) {
  if (!obj || typeof obj !== 'object' || (depth || 0) > 4) return undefined;
  for (const k of keys) if (obj[k] != null && obj[k] !== '' && typeof obj[k] !== 'object') return obj[k];
  for (const v of Object.values(obj)) {
    const f = cari(v, keys, (depth || 0) + 1);
    if (f !== undefined) return f;
  }
  return undefined;
}
const K = {
  id: ['payment_id', 'paymentId', 'transaction_id', 'id'],
  va: ['va_number', 'virtual_account_number', 'virtual_account', 'vaNumber', 'account_number', 'va'],
  qr: ['qr_string', 'qris_string', 'qr_content', 'qrString', 'qr_code'],
  qrImg: ['qr_url', 'qr_image', 'qr_image_url', 'qris_url'],
  url: ['payment_url', 'checkout_url', 'redirect_url', 'pay_url'],
  exp: ['expired_at', 'expires_at', 'expiry_time', 'expired_time', 'expiry_date', 'expiration_time', 'expired_date'],
  status: ['payment_status', 'transaction_status', 'status'],
  amount: ['amount', 'gross_amount', 'total_amount']
};
function dataDari(json) { return (json && (json.data || json.result)) || json || {}; }

// Ringkas respons pembuatan pembayaran menjadi data yang ditampilkan ke pembeli.
function ringkasPembayaran(json, metode, bank, total) {
  const d = dataDari(json);
  const info = {
    metode, bank: bank || null, total,
    payment_id: cari(d, K.id) || null,
    va: cari(d, K.va) || null,
    qr: cari(d, K.qr) || null,
    qr_img: cari(d, K.qrImg) || null,
    url: cari(d, K.url) || null,
    kedaluwarsa: cari(d, K.exp) || null,
    dibuat: new Date().toISOString()
  };
  if (!info.kedaluwarsa) {
    const detik = metode === 'qris' ? 5 * 60 : 24 * 3600;
    info.kedaluwarsa = new Date(Date.now() + detik * 1000).toISOString();
  }
  return info;
}

// Status dari Komerce -> status di database Yarka.
function petaStatus(json) {
  const d = dataDari(json);
  const s = String(cari(d, K.status) || '').toUpperCase();
  if (/^(PAID|SUCCESS|SUCCEEDED|SETTLEMENT|SETTLED|COMPLETED|LUNAS)$/.test(s)) return 'lunas';
  if (/^(EXPIRED|EXPIRE)$/.test(s)) return 'kedaluwarsa';
  if (/^(CANCELED|CANCELLED|FAILED|VOID)$/.test(s)) return 'batal';
  return 'menunggu';
}

// Cek status langsung ke Komerce lalu simpan bila berubah. Sumber kebenaran status pembayaran.
async function sinkronStatus(order) {
  if (!order || !order.payment_id) return order ? order.status_bayar : null;
  if (order.status_bayar === 'lunas') return 'lunas';
  const r = await km('GET', '/api/v1/user/payment/status/' + encodeURIComponent(order.payment_id));
  if (!r.ok || !r.json) { console.warn('cek status gagal', r.status, r.text.slice(0, 300)); return order.status_bayar; }
  const st = petaStatus(r.json);
  if (st === 'lunas') {
    const dibayar = Number(cari(dataDari(r.json), K.amount));
    if (dibayar && dibayar < Number(order.total)) {
      console.error('Nominal dibayar kurang', order.ref, dibayar, order.total);
      return order.status_bayar;
    }
    await ubahPesanan(order.ref, { status_bayar: 'lunas', dibayar_pada: new Date().toISOString() }, '&status_bayar=neq.lunas');
  } else if (st !== order.status_bayar && st !== 'menunggu') {
    await ubahPesanan(order.ref, { status_bayar: st }, '&status_bayar=neq.lunas');
  }
  return st;
}

// ---------- HTTP ----------
function kirim(res, code, data) {
  res.statusCode = code;
  res.setHeader('Content-Type', 'application/json; charset=utf-8');
  res.setHeader('Cache-Control', 'no-store');
  res.end(JSON.stringify(data));
}
function siap() {
  const kurang = ['KOMERCE_API_KEY', 'KOMERCE_CALLBACK_KEY', 'SUPABASE_URL', 'SUPABASE_SERVICE_KEY'].filter(k => !process.env[k]);
  if (kurang.length) console.error('Variabel lingkungan belum diisi:', kurang.join(', '));
  return !kurang.length;
}
// Jenis error server (tanpa rahasia) agar penyebab bisa diketahui dari jawaban API.
function kodeError(e) {
  const m = String((e && e.message) || '') + ' ' + String((e && e.cause && e.cause.code) || '');
  if (!process.env.SUPABASE_URL || /Invalid URL|ENOTFOUND|EAI_AGAIN|fetch failed/i.test(m)) return 'DB_URL';
  if (/Supabase 40[13]|Invalid API key|JWT|apikey/i.test(m)) return 'DB_KUNCI';
  if (/42703|column .* does not exist/i.test(m)) return 'DB_MIGRASI';
  if (/42P01|relation .* does not exist/i.test(m)) return 'DB_TABEL';
  if (/42501|permission denied/i.test(m)) return 'DB_IZIN';
  if (/^Supabase/.test(m)) return 'DB_LAIN';
  return 'SERVER';
}
// Jenis key Supabase yang terpasang (bukan isinya) untuk diagnosis DB_KUNCI.
function jenisKunci() {
  const raw = process.env.SUPABASE_SERVICE_KEY || '';
  const k = raw.trim();
  let jenis = 'kosong';
  if (/^sb_secret_/.test(k)) jenis = 'sb_secret';
  else if (/^sb_publishable_/.test(k)) jenis = 'sb_publishable (SALAH: ini key publik)';
  else if (/^eyJ/.test(k)) {
    try {
      const role = JSON.parse(Buffer.from(k.split('.')[1], 'base64url').toString()).role;
      jenis = 'jwt role=' + role + (role === 'service_role' ? '' : ' (SALAH: harus service_role)');
    } catch (e) { jenis = 'jwt tidak terbaca'; }
  } else if (k) jenis = 'format tidak dikenal';
  return { jenis, panjang: k.length, spasi: raw !== k, kutip: /^["']|["']$/.test(k) };
}
function detailError(e) {
  const m = String((e && e.message) || '');
  const pesan = (m.match(/"message"\s*:\s*"([^"]{0,120})/) || [])[1] || m.slice(0, 80);
  return { pesan: pesan.replace(/(sb_[a-z]+_|eyJ)[A-Za-z0-9._-]+/g, '[key]'), kunci: jenisKunci() };
}
function siteUrl() { return String(process.env.SITE_URL || 'https://yarka.vercel.app').replace(/\/$/, ''); }

module.exports = {
  REF_RE, hitungTotal, ambilPesanan, ubahPesanan, km, ringkasPembayaran, sinkronStatus,
  petaStatus, cari, K, dataDari, kirim, siap, siteUrl, kodeError, detailError
};
