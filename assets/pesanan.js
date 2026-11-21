// Halaman pembayaran & pesanan berhasil: tampilkan data pesanan dari checkout (yarka_order).
// Tanpa data pesanan, halaman tetap menampilkan contoh bawaan.
(function () {
  var Y = window.YARKA, T = window.YarkaToko;
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase(); if (!/\.html$/.test(page)) page += '.html'; // URL bersih (/katalog) -> katalog.html
  var o; try { o = JSON.parse(localStorage.getItem('yarka_order') || 'null'); } catch (e) { o = null; }
  if (!Y || !o || !o.items) return;
  var root = /\/mobile\//.test(location.pathname.replace(/\\/g, '/')) ? '../' : '';
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }
  var main = function () { return document.querySelector('main') || document.body; };
  // elemen tanpa anak elemen yang teksnya cocok
  function leaves(test) {
    return [].filter.call(main().querySelectorAll('*'), function (el) {
      return !el.children.length && test((el.textContent || '').replace(/\s+/g, ' ').trim());
    });
  }
  function set(test, val) { leaves(typeof test === 'string' ? function (t) { return t === test; } : function (t) { return test.test(t); }).forEach(function (el) { el.textContent = val; }); }
  function hp(n) { n = String(n || '').replace(/[^\d]/g, '').replace(/^0/, '62'); return '(+' + n.slice(0, 2) + ') ' + n.slice(2, 5) + '-' + n.slice(5, 9) + '-' + n.slice(9); }
  var k = o.kontak || {};
  var alamat = [k.alamat, k.kec, k.kota, k.prov].filter(Boolean).join(', ') + (k.kodepos ? ' ' + k.kodepos : '');
  var n = o.jumlah || o.items.reduce(function (a, b) { return a + b.q; }, 0);
  var ongTxt = o.ongkir ? Y.rp(o.ongkir) : 'Rp0';

  function common() {
    set('#YRK-202503-8821', '#' + o.ref);
    set('Rp618.000', Y.rp(o.subtotal));
    set('Rp619.000', Y.rp(o.total));
    set('Rp1.000', Y.rp(o.asuransi));
  }

  function pembayaran() {
    common();
    set('Siti Andini', k.nama);
    set('(+62) 812-3456-7890', hp(k.wa));
    set(/^Jl\. Senopati/, alamat);
    set('SiCepat BEST', o.kurir.label);
    set(/^Estimasi Tiba:/, 'Estimasi Tiba: ' + o.kurir.eta);
    set(/^Produk Dipesan/, 'Produk Dipesan (' + n + ')');
    set(/^Ongkos Kirim Kilat/, 'Ongkos Kirim (' + o.kurir.label + ')');
    set('Biaya Layanan & Kode Verifikasi', 'Asuransi Pengiriman');
    leaves(function (t) { return t === 'Subsidi 100%'; }).forEach(function (el) { el.style.display = o.ongkir ? 'none' : ''; });
    leaves(function (t) { return t === 'Rp0'; }).forEach(function (el) { el.textContent = ongTxt; });
    var w = document.getElementById('order-items-wrapper');
    if (w) w.innerHTML = o.items.map(function (it) {
      return '<div class="flex items-center gap-3.5 bg-surface-container-low p-2.5 rounded-lg">' +
        '<img class="w-16 h-20 object-cover rounded" alt="' + esc(it.nama + ' warna ' + it.warna) + '" src="' + root + esc(it.img) + '">' +
        '<div class="flex-1 min-w-0"><h4 class="font-body-sm text-body-sm font-semibold text-primary truncate">' + esc(it.nama) + '</h4>' +
        '<p class="font-label-caps-sm text-label-caps-sm text-on-surface-variant uppercase mt-0.5">' + esc(it.warna) + ' • ' + esc(it.ukuran) + '</p>' +
        '<div class="flex items-center justify-between mt-1"><span class="font-label-text text-label-text text-outline">' + it.q + ' x ' + Y.rp(it.unit) + '</span>' +
        '<span class="font-body-sm text-body-sm font-semibold text-primary">' + Y.rp(it.total) + '</span></div></div></div>';
    }).join('');
  }

  function berhasil() {
    common();
    if (T) T.clearCart(); // pesanan selesai: kosongkan keranjang
    // "Sarah Humaira / Siti Andini <span>(+62 ...)</span>": ganti node teks nama & nomor
    [].forEach.call(main().querySelectorAll('p'), function (p) {
      var t = p.firstChild;
      if (t && t.nodeType === 3 && /Sarah Humaira/.test(t.nodeValue)) {
        t.nodeValue = k.nama + ' ';
        var s = p.querySelector('span'); if (s) s.textContent = hp(k.wa);
      }
    });
    set(/^Jl\. Senopati/, alamat);
    set(/^Instruksi:/, k.catatan ? 'Instruksi: ' + k.catatan : 'Instruksi: –');
    set('sarah.humaira@example.com', k.email);
    set('SiCepat BEST (Next Day Delivery)', o.kurir.label);
    var d = new Date(o.dibuat || Date.now()), BLN = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni', 'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember'];
    var a = new Date(d), b = new Date(d);
    var plus = o.kurir.id === 'paxel' ? [0, 0] : o.kurir.id === 'sicepat' ? [1, 1] : [1, 2];
    a.setDate(a.getDate() + plus[0]); b.setDate(b.getDate() + plus[1]);
    set('24 – 26 Maret 2025', a.getDate() === b.getDate() ? a.getDate() + ' ' + BLN[a.getMonth()] + ' ' + a.getFullYear() : a.getDate() + ' – ' + b.getDate() + ' ' + BLN[b.getMonth()] + ' ' + b.getFullYear());
    set('Biaya Pengiriman', 'Biaya Pengiriman (' + o.kurir.label + ')');
    set('Asuransi Pengiriman Premium', 'Asuransi Pengiriman');
    leaves(function (t) { return t === 'Rp0'; }).forEach(function (el) { el.textContent = ongTxt; });
    var head = leaves(function (t) { return t === 'Rincian Busana Dipesan'; })[0];
    if (head) {
      var cnt = head.parentElement.querySelector('span'); if (cnt) cnt.textContent = n + ' Item';
      var list = head.parentElement.nextElementSibling;
      if (list) list.innerHTML = o.items.map(function (it) {
        return '<div class="flex gap-4 items-center pb-4">' +
          '<img class="w-20 h-24 rounded-lg object-cover bg-surface-container flex-shrink-0" alt="' + esc(it.nama + ' warna ' + it.warna) + '" src="' + root + esc(it.img) + '">' +
          '<div class="flex-1 min-w-0"><span class="font-label-caps-sm text-label-caps-sm uppercase tracking-wider text-secondary font-semibold">' + esc(it.cat) + '</span>' +
          '<h4 class="font-body-md text-body-md font-medium text-primary truncate">' + esc(it.nama) + '</h4>' +
          '<p class="font-body-sm text-body-sm text-on-surface-variant">' + esc(it.warna) + ' • ' + esc(it.ukuran) + ' • ' + esc(it.bahan) + '</p>' +
          '<div class="flex items-center justify-between mt-1"><span class="font-body-sm text-body-sm text-on-surface-variant">' + it.q + ' × ' + Y.rp(it.unit) + '</span>' +
          '<span class="font-body-md text-body-md font-semibold text-primary">' + Y.rp(it.total) + '</span></div></div></div>';
      }).join('');
    }
  }

  // Simpan ke riwayat pesanan (dipakai halaman akun.html)
  function simpan(status, paksa) {
    var L; try { L = JSON.parse(localStorage.getItem('yarka_orders') || '[]'); } catch (e) { L = []; }
    var ada = L.filter(function (x) { return x.ref === o.ref; })[0];
    if (ada) { if (paksa) ada.status = status; }
    else L.unshift({ ref: o.ref, dibuat: o.dibuat, items: o.items, total: o.total, status: status, kurir: { label: o.kurir && o.kurir.label } });
    try { localStorage.setItem('yarka_orders', JSON.stringify(L.slice(0, 30))); } catch (e) {}
  }

  function init() {
    if (page === 'pembayaran.html') { simpan('menunggu'); pembayaran(); }
    if (page === 'pesanan-berhasil.html' || page === 'pesanan-berhasil-ulasan.html') { simpan('diproses', true); berhasil(); }
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
