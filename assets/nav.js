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

  // Menu navigasi mobile (tombol hamburger #mobile-nav-toggle) — dibangun sekali untuk semua halaman.
  function mobileMenu() {
    var btn = document.getElementById('mobile-nav-toggle');
    if (!btn || document.getElementById('yk-mnav')) return;
    var here = page + location.search;
    var ITEMS = [
      ['Beranda', PATHS.beranda, 'home'],
      ['Koleksi', PATHS.koleksi, 'styler'],
      ['Cerita Kami', PATHS.cerita, 'auto_stories'],
      ['Abaya', PATHS.gamis], ['Khimar', PATHS.hijab], ['Bergo', PATHS.outer], ['Niqab', PATHS.set],
      ['Wishlist', PATHS.wishlist, 'favorite'],
      ['Pesanan Saya', PATHS.akun, 'receipt_long']
    ];
    function isHere(url) { var u = url.replace(root, ''); return u === here || (u === page && !location.search); }
    function row(it) {
      var cur = isHere(it[1]);
      return '<a href="' + it[1] + '"' + (cur ? ' aria-current="page"' : '') + ' class="yk-mnav-link' + (it[2] ? '' : ' is-sub') + '">' +
        (it[2] ? '<span class="material-symbols-outlined">' + it[2] + '</span>' : '') + '<span>' + it[0] + '</span></a>';
    }
    var css = document.createElement('style');
    css.textContent =
      '.yk-mnav{position:fixed;inset:0;z-index:70;visibility:hidden}' +
      '.yk-mnav.is-open{visibility:visible}' +
      '.yk-mnav-bg{position:absolute;inset:0;background:rgba(26,26,26,.4);backdrop-filter:blur(2px);opacity:0;transition:opacity .3s ease}' +
      '.yk-mnav.is-open .yk-mnav-bg{opacity:1}' +
      '.yk-mnav-panel{position:absolute;top:0;left:0;bottom:0;width:min(86vw,340px);background:#FDF8F6;display:flex;flex-direction:column;transform:translateX(-100%);transition:transform .35s cubic-bezier(.22,.61,.36,1);box-shadow:20px 0 50px -20px rgba(26,26,26,.3);overflow-y:auto}' +
      '.yk-mnav.is-open .yk-mnav-panel{transform:none}' +
      '.yk-mnav-head{display:flex;align-items:center;justify-content:space-between;padding:18px 20px;border-bottom:1px solid #EDE4DE}' +
      '.yk-mnav-close{width:44px;height:44px;margin-right:-10px;display:inline-flex;align-items:center;justify-content:center;border-radius:9999px;color:#1A1A1A}' +
      '.yk-mnav-close:hover{background:#F5EDE8}' +
      '.yk-mnav-close:focus{outline:none}.yk-mnav-close:focus-visible,.yk-mnav-link:focus-visible{outline:2px solid #A67C6E;outline-offset:2px}' +
      '.yk-mnav-list{padding:10px 12px;display:flex;flex-direction:column}' +
      '.yk-mnav-link{display:flex;align-items:center;gap:14px;min-height:48px;padding:0 12px;border-radius:10px;font-family:Inter,sans-serif;font-size:13px;font-weight:600;letter-spacing:.14em;text-transform:uppercase;color:#1A1A1A;transition:background-color .2s ease}' +
      '.yk-mnav-link .material-symbols-outlined{font-size:20px;color:#A67C6E}' +
      '.yk-mnav-link:hover{background:#F5EDE8}' +
      '.yk-mnav-link.is-sub{min-height:44px;padding-left:46px;font-weight:500;color:#6B6B6B}' +
      '.yk-mnav-link[aria-current]{background:#F5EDE8;color:#A67C6E}' +
      '.yk-mnav-sep{margin:6px 12px 6px 46px;font-family:Inter,sans-serif;font-size:10px;letter-spacing:.2em;text-transform:uppercase;color:#9A9A9A}' +
      '.yk-mnav-foot{margin-top:auto;padding:20px;border-top:1px solid #EDE4DE;font-family:Inter,sans-serif;font-size:12px;line-height:1.6;color:#6B6B6B}' +
      '@media (min-width:1024px){.yk-mnav{display:none}}' +
      // Ikon header (menu, wishlist, keranjang, profil) dengan area sentuh ≥ 44px di layar sentuh
      '@media (max-width:1023px){header #mobile-nav-toggle,header a[aria-label],header button[aria-label]{min-width:44px;min-height:44px;display:inline-flex;align-items:center;justify-content:center}' +
      'footer li>a{display:inline-block;padding:6px 0}}' +
      '@media (prefers-reduced-motion:reduce){.yk-mnav-panel,.yk-mnav-bg{transition:none}}';
    document.head.appendChild(css);
    var nav = document.createElement('div');
    nav.id = 'yk-mnav'; nav.className = 'yk-mnav'; nav.setAttribute('aria-hidden', 'true');
    nav.innerHTML = '<div class="yk-mnav-bg" data-mnav-close></div>' +
      '<nav class="yk-mnav-panel" role="dialog" aria-modal="true" aria-label="Menu navigasi">' +
      '<div class="yk-mnav-head"><a href="' + PATHS.beranda + '"><img src="' + root + 'assets/img/logo.png" alt="Yarka Moslem Wear" style="height:34px;width:auto"></a>' +
      '<button type="button" class="yk-mnav-close" aria-label="Tutup menu" data-mnav-close><span class="material-symbols-outlined">close</span></button></div>' +
      '<div class="yk-mnav-list">' + ITEMS.slice(0, 3).map(row).join('') +
      '<p class="yk-mnav-sep">Kategori</p>' + ITEMS.slice(3, 7).map(row).join('') +
      '<p class="yk-mnav-sep">Akun</p>' + ITEMS.slice(7).map(row).join('') + '</div>' +
      '<div class="yk-mnav-foot">Yarka Moslem Wear<br>#IringiLangkahBaik</div></nav>';
    document.body.appendChild(nav);
    btn.setAttribute('aria-controls', 'yk-mnav'); btn.setAttribute('aria-expanded', 'false');
    function setOpen(on) {
      nav.classList.toggle('is-open', on); nav.setAttribute('aria-hidden', on ? 'false' : 'true');
      btn.setAttribute('aria-expanded', on ? 'true' : 'false');
      document.body.style.overflow = on ? 'hidden' : '';
      if (on) { var c = nav.querySelector('.yk-mnav-close'); setTimeout(function () { c.focus(); }, 50); } else btn.focus();
    }
    btn.addEventListener('click', function (e) { e.preventDefault(); setOpen(true); });
    nav.addEventListener('click', function (e) {
      if (e.target.closest('[data-mnav-close]')) setOpen(false);
      else if (e.target.closest('a')) { nav.classList.remove('is-open'); document.body.style.overflow = ''; }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && nav.classList.contains('is-open')) setOpen(false); });
  }

  document.addEventListener('DOMContentLoaded', function () {
    mobileMenu();
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
