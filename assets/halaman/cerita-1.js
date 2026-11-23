// Dipindah dari <script> inline (agar lolos Content-Security-Policy). Dipakai di: cerita.html
(function () {
  var root = document.getElementById('cerita'); if (!root) return;
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  // Manifesto: pecah jadi kata
  var wp = root.querySelector('[data-words]');
  if (wp) {
    var words = wp.textContent.trim().split(/\s+/);
    wp.innerHTML = words.map(function (w) { return '<span class="ycp-word">' + w + '</span>'; }).join(' ');
  }
  if (reduce || !('IntersectionObserver' in window)) { root.classList.add('ycp-static'); return; }
  root.classList.add('ycp-js');
  requestAnimationFrame(function () { root.classList.add('ycp-ready'); });

  var io = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('is-in'); io.unobserve(e.target); } });
  }, { rootMargin: '0px 0px -12% 0px', threshold: 0.2 });
  [].forEach.call(root.querySelectorAll('.ycp-rv, .ycp-tagline, .ycp-ch, .ycp-steps'), function (el) { io.observe(el); });

  // Bab aktif -> ganti foto sticky + penghitung
  var imgs = root.querySelectorAll('.ycp-frame img'), now = root.querySelector('.ycp-count-now'),
      bar = root.querySelector('.ycp-count-bar span'), cur = -1;
  function setCh(i) {
    if (i === cur) return; cur = i;
    [].forEach.call(imgs, function (im) { im.classList.toggle('is-on', +im.getAttribute('data-ch') === i); });
    if (now) { now.innerHTML = '<span>0' + (i + 1) + '</span>'; }
    if (bar) bar.style.transform = 'scaleX(' + ((i + 1) / 4) + ')';
  }
  var chIo = new IntersectionObserver(function (es) {
    es.forEach(function (e) { if (e.isIntersecting) setCh(+e.target.getAttribute('data-i')); });
  }, { rootMargin: '-45% 0px -45% 0px' });
  [].forEach.call(root.querySelectorAll('.ycp-ch'), function (el) { chIo.observe(el); });
  setCh(0);

  // Manifesto: kata menyala sesuai scroll
  var ws = wp ? wp.querySelectorAll('.ycp-word') : [], ticking = false;
  function onScroll() {
    ticking = false; if (!wp) return;
    var r = wp.getBoundingClientRect(), vh = innerHeight;
    var p = (vh * 0.85 - r.top) / (r.height + vh * 0.45); p = Math.max(0, Math.min(1, p));
    var n = Math.round(p * ws.length);
    for (var i = 0; i < ws.length; i++) ws[i].classList.toggle('is-lit', i < n);
  }
  addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();

  // CTA: cahaya mengikuti kursor + tombol magnetis
  var cta = root.querySelector('.ycp-cta'), glow = root.querySelector('.ycp-glow');
  if (cta && glow && matchMedia('(hover: hover)').matches) {
    cta.addEventListener('pointermove', function (e) {
      var r = cta.getBoundingClientRect();
      glow.style.setProperty('--x', (e.clientX - r.left) + 'px'); glow.style.setProperty('--y', (e.clientY - r.top) + 'px');
      cta.classList.add('is-hover');
    });
    cta.addEventListener('pointerleave', function () { cta.classList.remove('is-hover'); });
    [].forEach.call(root.querySelectorAll('.ycp-magnet'), function (b) {
      b.addEventListener('pointermove', function (e) {
        var r = b.getBoundingClientRect();
        b.style.transform = 'translate(' + ((e.clientX - r.left - r.width / 2) * 0.18) + 'px,' + ((e.clientY - r.top - r.height / 2) * 0.3) + 'px)';
      });
      b.addEventListener('pointerleave', function () { b.style.transform = ''; });
    });
  }
})();
