// Animasi halus beranda khusus mobile/tablet (< 1024px):
// - Parallax ringan: hero, foto kartu kategori, foto spotlight.
// - Reveal saat scroll: judul section, kartu kategori, produk, pilar, testimoni, galeri.
// Mati otomatis bila pengunjung mengaktifkan "Kurangi Gerakan" (prefers-reduced-motion).
// Hanya memakai transform/opacity (properti translate/scale terpisah) agar tetap mulus & tidak
// bentrok dengan animasi/hover yang sudah ada.
(function () {
  var mq = window.matchMedia;
  if (!mq || !('IntersectionObserver' in window)) return;
  if (mq('(prefers-reduced-motion: reduce)').matches || !mq('(max-width: 1023px)').matches) return;

  var EASE = 'cubic-bezier(.22,.61,.36,1)';
  var css =
    // selektor dibuat lebih kuat agar tidak tertimpa transisi efek tekan di yarka-hover.css
    'html body .gk-rv{opacity:0;translate:0 28px;transition:opacity .9s ' + EASE + ' var(--gk-d,0ms),translate .9s ' + EASE + ' var(--gk-d,0ms),transform .35s ' + EASE + ',box-shadow .35s ease}' +
    'html body .gk-rv.gk-in{opacity:1;translate:0 0}' +
    '.gk-px{will-change:translate}' +
    '.gk-px-img{scale:1.18}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  function $$(sel) { return [].slice.call(document.querySelectorAll(sel)); }

  // ---------- Reveal ----------
  var reveal = [].concat(
    $$('main > section > div > div:first-child').filter(function (el) { return el.querySelector('h2'); }),
    $$('a.group[href^="katalog.html?k="]'),
    $$('#koleksi-terbaru [data-category]'),
    $$('#spotlight-terbaru > div > div'),
    $$('#story .grid > div'),
    $$('#testimonials-grid > div'),
    $$('#yw-grid .yw-item')
  );
  var io = new IntersectionObserver(function (entries) {
    var i = 0;
    entries.forEach(function (e) {
      if (!e.isIntersecting) return;
      e.target.style.setProperty('--gk-d', Math.min(i++, 4) * 90 + 'ms'); // muncul berurutan
      e.target.classList.add('gk-in');
      io.unobserve(e.target);
    });
  }, { rootMargin: '0px 0px -8% 0px', threshold: 0.12 });
  reveal.forEach(function (el) {
    var r = el.getBoundingClientRect();
    if (r.top < innerHeight && r.bottom > 0) return; // sudah terlihat saat dibuka: biarkan apa adanya
    el.classList.add('gk-rv'); io.observe(el);
  });

  // ---------- Parallax ----------
  var hero = document.querySelector('.yarka-hero');
  var heroIsi = hero && hero.querySelector(':scope > .relative.z-10');
  var orb1 = hero && hero.querySelector('.yh-orb-1'), orb2 = hero && hero.querySelector('.yh-orb-2');
  // [elemen, kecepatan]: positif = bergerak lebih lambat dari scroll (terasa "jauh")
  var layers = [];
  $$('a.group[href^="katalog.html?k="] > .bg-cover').forEach(function (el) { layers.push([el, 0.08]); });
  var spot = document.getElementById('spot-img'); if (spot) layers.push([spot, 0.08]);
  layers.forEach(function (l) { l[0].classList.add('gk-px', 'gk-px-img'); });
  [heroIsi, orb1, orb2].forEach(function (el) { if (el) el.classList.add('gk-px'); });

  var ticking = false;
  function frame() {
    ticking = false;
    var vh = innerHeight;
    if (hero) {
      var h = hero.offsetHeight || vh, y = Math.min(scrollY, h);
      if (heroIsi) { heroIsi.style.translate = '0 ' + (y * 0.35).toFixed(1) + 'px'; heroIsi.style.opacity = (1 - y / h * 0.7).toFixed(3); }
      if (orb1) orb1.style.translate = '0 ' + (y * 0.2).toFixed(1) + 'px';
      if (orb2) orb2.style.translate = '0 ' + (y * -0.12).toFixed(1) + 'px';
    }
    layers.forEach(function (l) {
      var p = l[0].parentElement.getBoundingClientRect();
      if (p.bottom < -50 || p.top > vh + 50) return;
      var d = (p.top + p.height / 2 - vh / 2) * l[1];
      l[0].style.translate = '0 ' + d.toFixed(1) + 'px';
    });
  }
  function onScroll() { if (!ticking) { ticking = true; requestAnimationFrame(frame); } }
  addEventListener('scroll', onScroll, { passive: true });
  addEventListener('resize', onScroll, { passive: true });
  frame();
})();
