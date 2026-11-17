// Kartu produk (Beranda & Katalog): klik swatch -> foto & nama warna langsung berganti;
// klik kartu -> halaman detail produk dengan warna yang sedang dipilih.
(function () {
  var P = window.YARKA_PRODUCTS || {}, Y = window.YARKA;
  var root = /\/mobile\//.test(location.pathname.replace(/\\/g, '/')) ? '../' : '';

  function find(p, name) {
    for (var i = 0; i < p.colors.length; i++) if (p.colors[i].n === name) return p.colors[i];
    return p.colors[0];
  }

  function pilih(card, name) {
    var p = P[card.getAttribute('data-produk')]; if (!p) return;
    var col = find(p, name);
    card.setAttribute('data-warna', col.n);
    [].forEach.call(card.querySelectorAll('.yk-sw'), function (b) {
      var on = b.getAttribute('data-warna') === col.n;
      b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on);
    });
    var img = card.querySelector('img.yk-img');
    if (img && img.getAttribute('src') !== col.img) {
      img.classList.add("is-fading");
      img.onload = img.onerror = function () { img.classList.remove("is-fading"); };
      img.src = col.img; img.alt = p.name + " warna " + col.n;
      setTimeout(function () { img.classList.remove("is-fading"); }, 600);
    }
    var lbl = card.querySelector('.yk-color-name');
    if (lbl) lbl.innerHTML = col.n + ' <span class="text-outline">• ' + p.colors.length + ' warna</span>';
  }

  // Pilih warna pertama dari keluarga warna (filter Katalog); null = kembali ke warna utama.
  function pilihKeluarga(card, fam) {
    var p = P[card.getAttribute('data-produk')]; if (!p) return;
    var col = p.colors[0];
    if (fam) for (var i = 0; i < p.colors.length; i++) if (p.colors[i].fam === fam) { col = p.colors[i]; break; }
    pilih(card, col.n);
  }

  window.YarkaKartu = { pilih: pilih, pilihKeluarga: pilihKeluarga };

  function init() {
    [].forEach.call(document.querySelectorAll('[data-produk]'), function (card) {
      var p = P[card.getAttribute('data-produk')]; if (!p) return;
      card.style.cursor = 'pointer';
      [].forEach.call(card.querySelectorAll('.yk-sw'), function (b) {
        b.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); pilih(card, b.getAttribute('data-warna')); });
      });
      card.addEventListener('click', function (e) {
        if (e.target.closest('button')) return; // swatch, wishlist, tambah cepat
        location.href = Y.url(root, p, find(p, card.getAttribute('data-warna')));
      });
      // preload foto warna saat kursor masuk kartu agar pergantian instan
      card.addEventListener('mouseenter', function () {
        if (card._pre) return; card._pre = 1;
        p.colors.forEach(function (c) { var i = new Image(); i.src = c.img; });
      });
    });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
