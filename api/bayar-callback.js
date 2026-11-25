// POST /api/bayar-callback  <- dipanggil server Komerce saat status pembayaran berubah.
// Tanda tangan: header X-Callback-Api-Key = HMAC-SHA256(body mentah, callback key).
// Isi callback hanya dipakai sebagai "petunjuk" pesanan mana yang berubah; status LUNAS
// selalu dipastikan ulang lewat API status Komerce sebelum disimpan.
'use strict';
const crypto = require('crypto');
const L = require('./_lib/yarka');

function bacaMentah(req) {
  return new Promise((ok, gagal) => {
    const parts = [];
    req.on('data', c => parts.push(c));
    req.on('end', () => ok(Buffer.concat(parts)));
    req.on('error', gagal);
  });
}
function sama(a, b) {
  const x = Buffer.from(String(a)), y = Buffer.from(String(b));
  return x.length === y.length && crypto.timingSafeEqual(x, y);
}
// Format keluaran (hex/base64) & kunci yang dipakai belum dijelaskan rinci di dokumentasi,
// jadi semua kombinasi yang wajar diterima. Semuanya tetap butuh kunci rahasia.
function tandaTanganSah(raw, header) {
  if (!header) return false;
  const kunci = [process.env.KOMERCE_CALLBACK_KEY, process.env.KOMERCE_API_KEY].filter(Boolean);
  for (const k of kunci) {
    const h = crypto.createHmac('sha256', k).update(raw);
    const d = h.digest();
    if (sama(header.toLowerCase(), d.toString('hex')) || sama(header, d.toString('base64'))) return true;
  }
  return false;
}

module.exports = async function (req, res) {
  if (req.method !== 'POST') return L.kirim(res, 405, { error: 'Metode tidak didukung.' });
  if (!L.siap()) return L.kirim(res, 503, { error: 'not configured' });
  try {
    const raw = await bacaMentah(req);
    const sah = tandaTanganSah(raw, req.headers['x-callback-api-key']);
    let body = {}; try { body = JSON.parse(raw.toString('utf8')); } catch (e) {}
    if (!sah) console.warn('Callback: tanda tangan tidak cocok. Isi:', raw.toString('utf8').slice(0, 800));

    const d = L.dataDari(body);
    const pid = L.cari(d, ['payment_id', 'paymentId']);
    const oid = String(L.cari(d, ['order_id', 'orderId', 'merchant_ref']) || '');
    const refDariOid = (oid.match(/^YRK-[0-9]{8}-[0-9A-F]{6}/) || [])[0];

    let order = null;
    if (pid) order = await L.ambilPesanan('payment_id=eq.' + encodeURIComponent(pid));
    if (!order && refDariOid) order = await L.ambilPesanan('ref=eq.' + encodeURIComponent(refDariOid));
    if (order) {
      const st = await L.sinkronStatus(order); // dipastikan ke API Komerce, bukan dari isi callback
      console.log('Callback', order.ref, '->', st);
    } else {
      console.warn('Callback: pesanan tidak ditemukan', pid, oid);
    }
    if (!sah) return L.kirim(res, 401, { error: 'invalid signature' });
    L.kirim(res, 200, { ok: true });
  } catch (e) {
    console.error(e);
    L.kirim(res, 500, { error: 'server error' });
  }
};
