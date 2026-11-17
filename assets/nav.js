// Navigasi antar halaman untuk desain hasil ekspor Google Stitch (Nara Hijab).
// Menyambungkan tombol/tautan placeholder ("#") ke halaman yang sesuai.
(function () {
  var inMobile = /\/mobile\//.test(location.pathname.replace(/\\/g, '/'));
  var root = inMobile ? '../' : '';
  var m = inMobile ? '' : 'mobile/';
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();

  var PATHS = {
    beranda: root + 'index.html',
    koleksi: root + 'katalog.html', gamis: root + 'katalog.html?k=abaya', hijab: root + 'katalog.html?k=khimar',
    outer: root + 'katalog.html?k=bergo-tali', set: root + 'katalog.html?k=niqab-cadar',
    cerita: root + 'cerita.html',
    wishlist: root + 'wishlist.html',
    checkout: root + 'checkout.html',
    akun: root + 'akun.html', 'akun-saya': root + 'akun.html',
    'riwayat-pesanan': root + 'akun.html'
  };

  function go(url) { return function (e) { if (e) e.preventDefault(); location.href = url; }; }
  function text(el) { return (el.textContent || '').replace(/\s+/g, ' ').trim().toLowerCase(); }
  function each(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
  // Hubungkan elemen <a>/<button> yang teksnya memuat `needle` ke `url`.
  function link(needle, url, opts) {
    opts = opts || {};
    each('a, button', function (el) {
      if (text(el).indexOf(needle) === -1) return;
      if (el.tagName === 'A' && el.getAttribute('href') && el.getAttribute('href') !== '#') return;
      if (el.tagName === 'A') { el.setAttribute('href', url); return; }
      el.addEventListener('click', function (e) {
        if (opts.delay) { setTimeout(function () { location.href = url; }, opts.delay); }
        else { e.preventDefault(); e.stopImmediatePropagation(); location.href = url; }
      }, true);
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    // 1. Tautan dengan data-path dari Stitch
    each('a[data-path]', function (a) {
      var p = PATHS[a.getAttribute('data-path')];
      if (p && a.getAttribute('href') === '#') a.setAttribute('href', p);
    });
    // Breadcrumb
    each('a[href="#"]', function (a) {
      var t = text(a);
      if (t === 'beranda') a.setAttribute('href', root + 'index.html');
      if (t === 'gamis' || t === 'koleksi') a.setAttribute('href', root + 'katalog.html');
    });
    link('beranda butik', root + 'index.html');
    link('kembali ke beranda', root + 'index.html');

    // 2. Kartu produk di Beranda & Katalog -> halaman detail produk
    if (page === 'index.html' || page === '' || page === 'katalog.html') {
      each('[class*="aspect-[4/5]"], [class*="aspect-[3/4]"]', function (card) {
        if (!card.querySelector('img') || card.closest('a') || card.closest('[data-produk]')) return; // kartu produk ditangani kartu-warna.js
        var target = card.parentElement || card;
        target.style.cursor = 'pointer';
        target.addEventListener('click', function (e) {
          if (e.target.closest('button')) return; // biarkan tombol wishlist/quick-add bekerja
          location.href = 'produk.html';
        });
      });
    }

    // 3. Alur checkout
    switch (page) {
      case 'checkout.html':
        link('lanjut ke pembayaran', 'pembayaran.html');
        link('lanjut pembayaran', 'pembayaran.html');
        break;
      case 'pembayaran.html':
        link('ubah pengiriman', 'checkout.html');
        link('saya sudah membayar', inMobile ? 'pesanan-berhasil-ulasan.html' : 'pesanan-berhasil.html', { delay: 1200 });
        break;
      case 'pesanan-berhasil.html':
      case 'pesanan-berhasil-ulasan.html':
        link('kirim ulasan', 'ulasan-terkirim.html', { delay: 800 });
        
        break;
      case 'ulasan-terkirim.html':
        link('belanja lagi', root + 'katalog.html', { delay: 600 });
        
        break;
      case 'akun.html':
        link('beli lagi', root + 'katalog.html');
        break;
    }
  });
})();
