// POST /api/bayar  { ref, metode: "va" | "qris", bank: "BCA" }
// Membuat Virtual Account / QRIS di Komerce untuk pesanan yang sudah tersimpan di Supabase.
// Nominal TIDAK diambil dari browser: dihitung ulang dari katalog (assets/produk-data.js).
'use strict';
const L = require('./_lib/yarka');

async function bacaBody(req) {
  if (req.body && typeof req.body === 'object') return req.body;
  if (typeof req.body === 'string') { try { return JSON.parse(req.body); } catch (e) { return {}; } }
  return {};
}
const BANK_RE = /^[A-Z0-9_]{2,20}$/;

module.exports = async function (req, res) {
  if (req.method !== 'POST') return L.kirim(res, 405, { error: 'Metode tidak didukung.' });
  if (!L.siap()) return L.kirim(res, 503, { error: 'Pembayaran otomatis belum diaktifkan. Silakan pilih transfer manual.' });
  try {
    const b = await bacaBody(req);
    const ref = String(b.ref || '');
    const metode = b.metode === 'qris' ? 'qris' : 'va';
    const bank = metode === 'va' ? String(b.bank || '').toUpperCase() : null;
    if (!L.REF_RE.test(ref)) return L.kirim(res, 400, { error: 'Nomor pesanan tidak valid.' });
    if (metode === 'va' && !BANK_RE.test(bank)) return L.kirim(res, 400, { error: 'Pilih bank Virtual Account.' });

    const order = await L.ambilPesanan('ref=eq.' + encodeURIComponent(ref));
    if (!order) return L.kirim(res, 404, { error: 'Pesanan belum tercatat di sistem. Coba lagi sebentar, atau gunakan transfer manual.' });
    if (order.status_bayar === 'lunas') return L.kirim(res, 200, { status: 'lunas' });

    // Masih ada tagihan aktif dengan metode yang sama: pakai lagi (tidak membuat VA ganda).
    const lama = order.payment_info;
    if (order.payment_id && order.status_bayar === 'menunggu' && lama && lama.metode === metode &&
        (lama.bank || null) === bank && Date.parse(lama.kedaluwarsa) > Date.now() + 60 * 1000) {
      const st = await L.sinkronStatus(order);
      if (st === 'lunas') return L.kirim(res, 200, { status: 'lunas' });
      if (st === 'menunggu') return L.kirim(res, 200, { status: 'menunggu', bayar: lama });
    }

    const cek = L.hitungTotal(order);
    if (cek.error) {
      console.warn('Total ditolak', ref, cek.error);
      return L.kirim(res, 422, { error: cek.error + ' Silakan gunakan transfer manual atau hubungi admin.' });
    }
    if (metode === 'qris' && cek.total > 10000000) return L.kirim(res, 422, { error: 'Nominal melebihi batas QRIS. Silakan pilih Virtual Account.' });

    const k = order.kontak || {};
    const body = {
      order_id: ref + '-' + Date.now().toString(36).toUpperCase(), // unik per percobaan bayar
      payment_type: metode === 'qris' ? 'qris' : 'bank_transfer',
      amount: cek.total,
      customer: {
        name: String(k.nama || 'Pelanggan Yarka').slice(0, 100),
        email: String(k.email || 'pelanggan@yarka.id').slice(0, 200),
        phone: String(k.wa || '').replace(/[^0-9]/g, '')
      },
      items: cek.items.map(it => ({ name: it.nama.slice(0, 100), quantity: it.q, price: it.unit }))
        .concat([{ name: 'Ongkos Kirim', quantity: 1, price: Number(order.ongkir) }, { name: 'Asuransi Pengiriman', quantity: 1, price: 2500 }]),
      callback_url: L.siteUrl() + '/api/bayar-callback',
      callback_api_key: process.env.KOMERCE_CALLBACK_KEY
    };
    if (metode === 'va') { body.channel_code = bank; body.expiry_duration = 24 * 3600; }

    const r = await L.km('POST', '/api/v1/user/payment/create', body);
    if (!r.ok || !r.json) {
      console.error('create gagal', r.status, r.text.slice(0, 500));
      const pesan = r.json && r.json.meta && r.json.meta.message;
      return L.kirim(res, 502, { error: 'Kode pembayaran gagal dibuat' + (pesan ? ' (' + String(pesan).slice(0, 120) + ')' : '') + '. Coba lagi atau gunakan transfer manual.' });
    }
    const info = L.ringkasPembayaran(r.json, metode, bank, cek.total);
    if (!info.payment_id || (!info.va && !info.qr && !info.qr_img && !info.url)) {
      // Format respons berbeda dari dugaan: catat agar bisa disesuaikan (lihat Vercel > Logs).
      console.error('Respons create tidak dikenali:', r.text.slice(0, 1500));
      return L.kirim(res, 502, { error: 'Kode pembayaran belum bisa ditampilkan. Silakan gunakan transfer manual.' });
    }

    // Tagihan lama yang masih aktif dibatalkan agar tidak dibayar dua kali.
    if (order.payment_id && order.payment_id !== info.payment_id && order.status_bayar === 'menunggu') {
      L.km('POST', '/api/v1/user/payment/cancel', { payment_id: order.payment_id, reason: 'Diganti metode lain oleh pembeli' })
        .catch(() => {});
    }
    await L.ubahPesanan(ref, {
      payment_id: String(info.payment_id), payment_info: info, metode_bayar: metode === 'qris' ? 'QRIS' : 'VA ' + bank,
      status_bayar: 'menunggu'
    }, '&status_bayar=neq.lunas');
    L.kirim(res, 200, { status: 'menunggu', bayar: info });
  } catch (e) {
    console.error(e);
    L.kirim(res, 500, { error: 'Terjadi kesalahan server. Silakan gunakan transfer manual.', kode: L.kodeError(e) });
  }
};
