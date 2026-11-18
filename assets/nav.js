// Navigasi antar halaman untuk desain hasil ekspor Google Stitch (Nara Hijab).
// Menyambungkan tombol/tautan placeholder ("#") ke halaman yang sesuai.
(function () {
  var inMobile = /\/mobile\//.test(location.pathname.replace(/\\/g, '/'));
  var root = inMobile ? '../' : '';
  var m = inMobile ? '' : 'mobile/';
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase(); if (!/\.html$/.test(page)) page += '.html'; // URL bersih (/katalog) -> katalog.html

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

  // Tombol WhatsApp admin di navbar (semua halaman) — dibangun sekali, sebelum ikon Wishlist.
  function waNav() {
    var wl = document.querySelector('header a[aria-label="Wishlist"]');
    if (!wl || document.getElementById('yk-wanav')) return;
    if (!document.getElementById('yk-wanav-css')) {
      var st = document.createElement('style'); st.id = 'yk-wanav-css';
      st.textContent =
        '.yk-wanav{position:relative;display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;border-radius:9999px;color:#1A1A1A;text-decoration:none;outline:none;opacity:0;transform:translateY(-6px);animation:ykWnIn .8s cubic-bezier(.22,1,.36,1) .35s forwards}' +
        '.yk-wanav::before{content:"";position:absolute;inset:0;border-radius:9999px;background:radial-gradient(circle at 30% 25%,#3CCB7F,#1C9A57);transform:scale(.35);opacity:0;transition:transform .55s cubic-bezier(.22,1,.36,1),opacity .4s ease}' +
        '.yk-wanav::after{content:"";position:absolute;inset:-3px;border-radius:9999px;border:1px solid rgba(166,124,110,.55);transform:scale(.8);opacity:0;transition:transform .6s cubic-bezier(.22,1,.36,1),opacity .45s ease}' +
        '.yk-wanav svg{position:relative;width:21px;height:21px;fill:currentColor;transition:color .35s ease,transform .6s cubic-bezier(.22,1,.36,1);animation:ykWnNod 1.1s cubic-bezier(.36,.07,.19,.97) 1.3s 1 both}' +
        '.yk-wanav-dot{position:absolute;top:4px;right:4px;width:8px;height:8px;border-radius:9999px;background:#25C26A;box-shadow:0 0 0 2px #FDF8F6;transition:opacity .3s ease}' +
        '.yk-wanav-dot::after{content:"";position:absolute;inset:0;border-radius:9999px;background:#25C26A;animation:ykWnPulse 2.8s cubic-bezier(.22,1,.36,1) 2s infinite}' +
        '.yk-wanav-tip{position:absolute;top:calc(100% + 12px);left:50%;transform:translate(-50%,-6px);white-space:nowrap;padding:7px 12px;border-radius:6px;background:#1A1A1A;color:#FDF8F6;font:600 10px/14px Inter,sans-serif;letter-spacing:.18em;text-transform:uppercase;opacity:0;pointer-events:none;transition:opacity .35s ease,transform .45s cubic-bezier(.22,1,.36,1);z-index:60}' +
        '.yk-wanav-tip::before{content:"";position:absolute;bottom:100%;left:50%;margin-left:-5px;border:5px solid transparent;border-bottom-color:#1A1A1A}' +
        '.yk-wanav-tip i{font-style:normal;color:#E3C2B5}' +
        '.yk-wanav:hover,.yk-wanav:focus-visible{color:#fff}' +
        '.yk-wanav:hover::before,.yk-wanav:focus-visible::before{transform:scale(1);opacity:1}' +
        '.yk-wanav:hover::after,.yk-wanav:focus-visible::after{transform:scale(1);opacity:1}' +
        '.yk-wanav:hover svg,.yk-wanav:focus-visible svg{transform:rotate(-12deg) scale(.95)}' +
        '.yk-wanav:hover .yk-wanav-dot,.yk-wanav:focus-visible .yk-wanav-dot{opacity:0}' +
        '.yk-wanav:hover .yk-wanav-tip,.yk-wanav:focus-visible .yk-wanav-tip{opacity:1;transform:translate(-50%,0)}' +
        '.yk-wanav:active svg{transform:scale(.85)}' +
        '.yk-wanav:focus-visible{box-shadow:0 0 0 2px #FDF8F6,0 0 0 3.5px #A67C6E}' +
        '@keyframes ykWnIn{to{opacity:1;transform:none}}' +
        '@keyframes ykWnNod{0%,100%{transform:rotate(0)}20%{transform:rotate(-14deg)}40%{transform:rotate(10deg)}60%{transform:rotate(-6deg)}80%{transform:rotate(3deg)}}' +
        '@keyframes ykWnPulse{0%{transform:scale(1);opacity:.7}70%,100%{transform:scale(2.6);opacity:0}}' +
        '@media (hover:none){.yk-wanav-tip{display:none}}' +
        '@media (max-width:639px){.yk-wanav{width:32px;height:32px}.yk-wanav svg{width:20px;height:20px}}' +
        '@media (prefers-reduced-motion:reduce){.yk-wanav,.yk-wanav svg,.yk-wanav-dot::after{animation:none!important}.yk-wanav{opacity:1;transform:none}}';
      document.head.appendChild(st);
    }
    var a = document.createElement('a');
    a.id = 'yk-wanav'; a.className = 'yk-wanav';
    a.href = 'https://wa.me/6285282437954?text=' + encodeURIComponent("Assalamu'alaikum Admin Yarka, saya ingin bertanya tentang produk Yarka.");
    a.target = '_blank'; a.rel = 'noopener';
    a.setAttribute('aria-label', 'Chat Admin Yarka via WhatsApp');
    a.innerHTML = '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>' +
      '<span class="yk-wanav-dot" aria-hidden="true"></span>' +
      '<span class="yk-wanav-tip" aria-hidden="true">Chat <i>Admin</i></span>';
    wl.parentNode.insertBefore(a, wl);
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
      '<div class="yk-mnav-foot">' + (document.getElementById('ykso-instagram') ? '<div class="yk-soc-row flex flex-wrap gap-2 mb-4">' +
        [['instagram', 'Instagram', 'https://www.instagram.com/yarka_indonesia/'], ['tiktok', 'TikTok', 'https://www.tiktok.com/@yarka_indonesia'],
         ['shopee', 'Shopee', 'https://id.shp.ee/wkBoyzxg'], ['telegram', 'Telegram', 'https://t.me/yarkaindonesia'], ['whatsapp', 'WhatsApp', 'https://wa.me/6285282437954']]
          .map(function (s) { return '<a class="yk-soc yk-soc-' + s[0] + '" href="' + s[2] + '" target="_blank" rel="noopener" aria-label="' + s[1] + ' Yarka"><svg class="yk-soc-ico" viewBox="0 0 24 24" aria-hidden="true"><use href="#ykso-' + s[0] + '"/></svg></a>'; }).join('') +
        '</div>' : '') + 'Yarka Moslem Wear<br>#IringiLangkahBaik</div></nav>';
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

  // URL bersih di server (Vercel cleanUrls): katalog.html -> /katalog, index.html -> /.
  // Saat dibuka langsung dari file (file://) tautan dibiarkan .html agar pratinjau lokal tetap jalan.
  var CLEAN = location.protocol === 'http:' || location.protocol === 'https:';
  function cleanHref(h) {
    var m = /^(?:\.\.\/|\.\/|\/)?([a-z0-9-]+)\.html(\?[^#]*)?(#.*)?$/i.exec(h || '');
    if (!m) return null;
    return '/' + (m[1].toLowerCase() === 'index' ? '' : m[1]) + (m[2] || '') + (m[3] || '');
  }
  function cleanLinks() {
    if (!CLEAN) return;
    each('a[href*=".html"]', function (a) { var c = cleanHref(a.getAttribute('href')); if (c) a.setAttribute('href', c); });
  }
  if (CLEAN && /\.html$/i.test(location.pathname) && window.history && history.replaceState) {
    var cp = cleanHref(location.pathname.split('/').pop());
    if (cp && !inMobile) history.replaceState(null, '', cp + location.search + location.hash);
  }

  // Tablet & HP: bingkai kartu tergambar saat kartu masuk layar (pasangan CSS: assets/yarka-hover.css §5).
  function touchReveal() {
    var mm = window.matchMedia;
    if (!mm || !mm('(hover: none), (pointer: coarse)').matches || !('IntersectionObserver' in window)) return;
    document.documentElement.classList.add('yk-touch');
    var SEL = '[data-produk], #wishlist-grid [data-wl], .yo-card, main a.group[class*="hover:shadow"], main [class*="hover:shadow"]';
    var batch = 0, timer = null;
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) {
        if (!e.isIntersecting) return;
        var el = e.target;
        if (el.querySelector('input, select, textarea')) { io.unobserve(el); return; }
        el.style.setProperty('--yk-d', Math.min(batch++, 5) * 0.12 + 's'); // berurutan antar kartu
        el.classList.add('yk-seen'); io.unobserve(el);
      });
      clearTimeout(timer); timer = setTimeout(function () { batch = 0; }, 400);
    }, { threshold: 0.25, rootMargin: '0px 0px -6% 0px' });
    function scan() {
      each(SEL, function (el) { if (!el._ykObs) { el._ykObs = 1; io.observe(el); } });
    }
    scan();
    // Kartu yang dibuat belakangan (wishlist, pesanan, filter katalog)
    var pending = false;
    new MutationObserver(function () {
      if (pending) return; pending = true;
      requestAnimationFrame(function () { pending = false; scan(); });
    }).observe(document.body, { childList: true, subtree: true });
  }

  document.addEventListener('DOMContentLoaded', function () {
    mobileMenu();
    waNav();
    touchReveal();
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

    // 4. URL bersih untuk semua tautan, termasuk yang dibuat belakangan (keranjang, wishlist, pesanan)
    cleanLinks();
    if (CLEAN) {
      var cleanPending = false;
      new MutationObserver(function () {
        if (cleanPending) return; cleanPending = true;
        requestAnimationFrame(function () { cleanPending = false; cleanLinks(); });
      }).observe(document.body, { childList: true, subtree: true });
    }
  });
})();
