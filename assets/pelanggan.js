// Simpan data pelanggan yang ingin repeat order ke Supabase (fungsi simpan_repeat_order).
// Tidak pernah menghalangi checkout: bila Supabase belum diatur / gagal, pesanan tetap lanjut.
(function () {
  function simpanRepeatOrder(order) {
    var cfg = window.YARKA_SUPABASE || {};
    if (!cfg.url || !cfg.anonKey || !window.fetch) return Promise.resolve(false);
    var body = {
      ref: order.ref,
      kontak: order.kontak,
      items: order.items.map(function (it) {
        return { id: it.id, nama: it.nama, warna: it.warna, ukuran: it.ukuran, q: it.q, unit: it.unit, total: it.total };
      }),
      kurir: order.kurir && order.kurir.label,
      kado: order.kado, subtotal: order.subtotal, ongkir: order.ongkir, total: order.total
    };
    var headers = { 'Content-Type': 'application/json', apikey: cfg.anonKey };
    // key format lama (JWT) juga dikirim sebagai Bearer; publishable key (sb_publishable_...) cukup di header apikey
    if (!/^sb_/.test(cfg.anonKey)) headers.Authorization = 'Bearer ' + cfg.anonKey;
    var req = fetch(cfg.url.replace(/\/$/, '') + '/rest/v1/rpc/simpan_repeat_order', {
      method: 'POST', keepalive: true,
      headers: headers,
      body: JSON.stringify({ p: body })
    }).then(function (r) { return r.ok; }, function () { return false; });
    // jangan menunggu lebih dari 4 detik
    return Promise.race([req, new Promise(function (ok) { setTimeout(function () { ok(false); }, 4000); })]);
  }
  window.YarkaPelanggan = { simpanRepeatOrder: simpanRepeatOrder };
})();
