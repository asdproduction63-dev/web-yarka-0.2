// GET /api/cek-bayar?ref=YRK-...  -> { status: "menunggu" | "lunas" | "kedaluwarsa" | "batal" | null }
// Dipanggil berkala oleh halaman pembayaran. Status dicek langsung ke Komerce, jadi tetap
// berjalan walaupun callback dari Komerce terlambat / gagal.
'use strict';
const L = require('./_lib/yarka');

module.exports = async function (req, res) {
  if (req.method !== 'GET') return L.kirim(res, 405, { error: 'Metode tidak didukung.' });
  if (!L.siap()) return L.kirim(res, 503, { error: 'Pembayaran otomatis belum diaktifkan.' });
  const ref = String((req.query && req.query.ref) || '');
  if (!L.REF_RE.test(ref)) return L.kirim(res, 400, { error: 'Nomor pesanan tidak valid.' });
  try {
    const order = await L.ambilPesanan('ref=eq.' + encodeURIComponent(ref));
    if (!order) return L.kirim(res, 404, { status: null });
    const status = await L.sinkronStatus(order);
    L.kirim(res, 200, { status });
  } catch (e) {
    console.error(e);
    L.kirim(res, 500, { error: 'Gagal memeriksa status.' });
  }
};
