// GET /api/metode -> daftar Virtual Account & QRIS yang aktif di akun Komerce.
'use strict';
const L = require('./_lib/yarka');

module.exports = async function (req, res) {
  if (req.method !== 'GET') return L.kirim(res, 405, { error: 'Metode tidak didukung.' });
  if (!process.env.KOMERCE_API_KEY) return L.kirim(res, 503, { error: 'Pembayaran otomatis belum diaktifkan.' });
  try {
    const r = await L.km('GET', '/api/v1/user/methods');
    const list = r.json && Array.isArray(r.json.data) ? r.json.data : [];
    if (!r.ok || !list.length) {
      console.error('metode gagal', r.status, r.text.slice(0, 300));
      return L.kirim(res, 502, { error: 'Daftar metode pembayaran belum bisa dimuat.' });
    }
    const metode = list.map(m => ({
      tipe: /qris/i.test(m.payment_type) ? 'qris' : 'va',
      kode: m.bank_code || '',
      nama: m.display_name || m.bank_code || 'QRIS',
      logo: m.logo_url || '',
      min: Number(m.min_amount) || 10000,
      max: Number(m.max_amount) || 0
    })).filter(m => m.tipe === 'qris' || m.kode);
    res.setHeader('Cache-Control', 'public, s-maxage=3600');
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json; charset=utf-8');
    res.end(JSON.stringify({ metode }));
  } catch (e) {
    console.error(e);
    L.kirim(res, 500, { error: 'Terjadi kesalahan server.' });
  }
};
