// Halaman detail produk dinamis: produk.html?p=<id>&w=<warna>
// Mengisi nama, harga, warna (klik swatch -> foto berganti), ukuran, galeri, deskripsi, dan tabel ukuran.
(function () {
  var P = window.YARKA_PRODUCTS, Y = window.YARKA; if (!P) return;
  var q = new URLSearchParams(location.search);
  var p = P[q.get('p')] || P.zen;
  var col = Y.color(p, q.get('w'));
  var state = { color: col.n, size: null, qty: 1 };
  window.YarkaProduk = { p: p, state: state }; // dipakai toko.js (keranjang & wishlist)
  var IMG = 'assets/img/warna/';
  function src(g) { return (g.indexOf('/') > -1 ? 'assets/img/' : IMG) + g + '.jpg'; }
  var SIZE_LABEL = { ALL: 'All Size', KECIL: 'Kecil (Shoulder)', BESAR: 'Besar (Berlin)' };
  if (p.id === 'zhaa') SIZE_LABEL = { S: 'Mini (S)', M: 'Medium (M)' };
  if (p.sizeLabels) for (var sk in p.sizeLabels) SIZE_LABEL[sk] = p.sizeLabels[sk];

  function $(s, r) { return (r || document).querySelector(s); }
  function $$(s, r) { return [].slice.call((r || document).querySelectorAll(s)); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;'); }

  function setMain(src, alt) {
    var m = $('#main-product-img'); if (!m) return;
    m.style.transition = 'opacity .25s ease'; m.style.opacity = '.35';
    m.onload = m.onerror = function () { m.style.opacity = "1"; };
    m.src = src; m.alt = alt || p.name;
    setTimeout(function () { m.style.opacity = "1"; }, 600);
  }

  function init() {
    document.title = p.name + ' – Yarka Indonesia';
    // Breadcrumb & judul
    var bc = $$('nav span.text-primary.font-semibold')[0]; if (bc) bc.textContent = p.name;
    var bcCat = bc && bc.parentElement ? $$('a', bc.parentElement).filter(function (a) { return a.textContent.trim() === 'Abaya'; })[0] : null;
    if (bcCat) { bcCat.textContent = p.catLabel; bcCat.setAttribute('href', 'katalog.html?k=' + p.cat); }
    var h1 = $('h1'); if (h1) h1.textContent = p.name;
    var badge = $$('span').filter(function (s) { return /Koleksi Esensial/.test(s.textContent); })[0];
    if (badge) badge.textContent = p.baru ? 'Rilis Baru' : p.mlf ? 'Launching MLF 2026' : 'Koleksi Yarka';
    var mat = $$('span').filter(function (s) { return s.textContent.trim() === 'Cottonblended Sandwash'; })[0];
    if (mat) mat.textContent = p.bahanLabel;

    // Rating & ulasan contoh hanya berlaku untuk halaman Zen Abaya
    if (p.id !== 'zen') {
      var rating = $('a[href="#ulasan-section"]'); if (rating) rating.parentElement.style.display = 'none';
      var ul = $('#ulasan-section'); if (ul) ul.style.display = 'none';
    }

    // Harga
    var priceBox = $$('span').filter(function (s) { return s.textContent.trim() === 'Rp429.000'; })[0];
    if (priceBox) {
      var row = priceBox.parentElement;
      row.className = 'flex flex-wrap items-baseline gap-x-3 gap-y-1';
      row.innerHTML = '<span class="font-headline-md text-headline-md text-primary font-semibold whitespace-nowrap">' + Y.priceText(p) + '</span>' +
        '<span class="font-body-sm text-body-sm text-outline">' + esc(p.priceNote) + '</span>';
    }

    // Warna
    var label = $('#selected-color-label');
    var oldBtn = $('.color-btn');
    if (oldBtn) {
      var wrap = oldBtn.parentElement;
      wrap.className = 'flex flex-wrap items-center gap-2.5 sm:gap-3';
      wrap.innerHTML = p.colors.map(function (c) {
        return '<button type="button" class="yk-sw" style="width:30px;height:30px" title="' + c.n + '" aria-label="Warna ' + c.n + '" data-warna="' + c.n + '"></button>';
      }).join('');
      $$('.yk-sw', wrap).forEach(function (b, i) {
        b.style.background = p.colors[i].hex;
        b.addEventListener('click', function () { pickColor(p.colors[i], true); });
      });
      var countEl = document.createElement('p');
      countEl.className = 'font-body-sm text-body-sm text-outline';
      countEl.textContent = p.colors.length + ' warna tersedia. Kemiripan warna ±90% karena pengaruh pencahayaan dan layar.';
      wrap.parentElement.appendChild(countEl);
    }
    function pickColor(c, push) {
      state.color = c.n;
      if (label) label.textContent = c.n;
      $$('.yk-sw').forEach(function (b) { var on = b.getAttribute('data-warna') === c.n; b.classList.toggle('is-on', on); b.setAttribute('aria-pressed', on); });
      setMain(c.img, p.name + ' warna ' + c.n);
      var ti = $$('#gallery-thumbs img');
      if (ti[0]) ti[0].src = c.img;
      if (adaFlat && ti[1]) { ti[1].src = c.flat || c.img; ti[1].parentElement.style.display = c.flat ? '' : 'none'; }
      markThumb(0);
      if (push) try { history.replaceState(null, '', '?p=' + p.id + '&w=' + Y.slug(c.n)); } catch (e) {}
    }

    // Galeri: foto warna terpilih + foto koleksi/detail + tabel ukuran
    var thumbs = $('#gallery-thumbs');
    // Galeri: foto warna terpilih (+ flat-lay warna itu bila ada) + foto koleksi/detail + tabel ukuran
    var adaFlat = p.colors.some(function (c) { return c.flat; });
    var gal = [col.img].concat(adaFlat ? [col.flat || col.img] : [], p.gallery.map(src), p.sizeChart ? [src(p.sizeChart)] : []);
    if (!adaFlat) gal = gal.filter(function (g, i) { return gal.indexOf(g) === i; }); // buang foto dobel
    if (thumbs) {
      thumbs.innerHTML = gal.map(function (src, i) {
        return '<button type="button" class="thumb-btn w-20 md:w-24 aspect-[4/5] rounded overflow-hidden shadow-sm bg-surface-container transition-all shrink-0" data-i="' + i + '">' +
          '<img class="w-full h-full object-cover" alt="' + esc(p.name) + ' foto ' + (i + 1) + '" src="' + src + '"></button>';
      }).join('');
      $$('.thumb-btn', thumbs).forEach(function (b, i) {
        b.addEventListener('click', function () { setMain(b.querySelector('img').src, p.name); markThumb(i); });
      });
      thumbs.classList.add('md:max-h-[640px]', 'md:overflow-y-auto');
    }
    function markThumb(i) { $$('#gallery-thumbs .thumb-btn').forEach(function (b, j) { b.style.opacity = i === j ? '1' : '.55'; }); }

    // Ukuran
    var so = $('#size-options');
    if (so) {
      var panjang = p.sizes.some(function (s) { return (SIZE_LABEL[s] || s).length > 6; });
      so.className = 'grid gap-2.5 ' + (p.sizes.length >= 6 ? 'grid-cols-3 sm:grid-cols-6' : p.sizes.length >= 4 ? 'grid-cols-5' : panjang ? 'grid-cols-1 sm:grid-cols-' + p.sizes.length : p.sizes.length === 3 ? 'grid-cols-3' : p.sizes.length === 2 ? 'grid-cols-2' : 'grid-cols-1');
      so.innerHTML = p.sizes.map(function (s) {
        return '<button type="button" class="size-btn py-3 rounded text-center font-label-caps-lg text-label-caps-lg font-semibold uppercase transition-colors" data-size="' + s + '">' + (SIZE_LABEL[s] || s) + '</button>';
      }).join('');
      var def = p.sizes.indexOf('M') > -1 ? 'M' : p.sizes[0];
      function pickSize(s) {
        state.size = s;
        $$('.size-btn', so).forEach(function (b) {
          var on = b.getAttribute('data-size') === s;
          ['bg-primary', 'text-on-primary', 'shadow-sm'].forEach(function (k) { b.classList.toggle(k, on); });
          ['bg-surface-container-low', 'text-primary', 'hover:bg-surface-container'].forEach(function (k) { b.classList.toggle(k, !on); });
        });
      }
      $$('.size-btn', so).forEach(function (b) { b.addEventListener('click', function () { pickSize(b.getAttribute('data-size')); }); });
      pickSize(def);
    }

    // Tab deskripsi
    var td = $('#tab-desc');
    if (td) {
      var h3 = $('h3', td); if (h3) h3.textContent = p.tagline;
      var dp = $('p', td); if (dp) dp.textContent = p.desc;
      var ul2 = $('ul', td);
      if (ul2) ul2.innerHTML = p.features.map(function (f) {
        return '<li class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary text-[18px]">check_circle</span><span><strong>' + esc(f[0]) + ':</strong> ' + esc(f[1]) + '</span></li>';
      }).join('');
      var di = $('img', td); if (di) { di.src = src(p.gallery[0]); di.alt = p.name; di.removeAttribute('data-alt'); }
    }
    // Tab detail kain
    var tm = $('#tab-material');
    if (tm && p.id !== 'zen') {
      var cards = $$('.bg-surface', tm);
      var info = [['Material ' + p.bahanLabel, p.material],
        ['Pilihan Ukuran', p.sizes.map(function (s) { return SIZE_LABEL[s] || s; }).join(', ') + '. ' + p.priceNote + '.'],
        [p.colors.length + ' Pilihan Warna', p.colors.map(function (c) { return c.n; }).join(', ') + '.']];
      cards.forEach(function (c, i) {
        if (!info[i]) return;
        var h4 = $('h4', c), pp = $('p', c);
        if (h4) h4.textContent = info[i][0]; if (pp) pp.textContent = info[i][1];
      });
    }
    // Tab perawatan
    $$('#tab-care h4').forEach(function (h) { h.textContent = 'Petunjuk Perawatan ' + p.name; });
    $$('#tab-care div').forEach(function (d) {
      if (d.childNodes.length && /tekstur sandwash/.test(d.textContent) && !d.querySelector('div'))
        d.innerHTML = d.innerHTML.replace('agar tekstur sandwash tetap terjaga', 'agar tekstur kain tetap terjaga');
    });

    // Panduan ukuran: pakai tabel resmi Yarka (gambar)
    var mh = $$('#size-guide-modal h3')[0]; if (mh) mh.textContent = 'Panduan Ukuran ' + p.name;
    var tbl = $('#size-guide-modal .overflow-x-auto');
    if (tbl) {
      if (p.sizeChart) tbl.innerHTML = '<img class="w-full h-auto rounded" alt="Tabel ukuran ' + esc(p.name) + '" src="' + src(p.sizeChart) + '">';
      else if (p.sizeTable) {
        var T = p.sizeTable, th = 'px-3 py-2.5 text-left font-label-caps-sm text-label-caps-sm uppercase tracking-wider text-on-surface-variant whitespace-nowrap';
        tbl.innerHTML = '<table class="w-full border-collapse font-body-sm text-body-sm"><thead><tr class="bg-surface-container-low"><th class="' + th + '">Ukuran</th>' +
          T.cols.map(function (h) { return '<th class="' + th + '">' + esc(h) + '</th>'; }).join('') + '</tr></thead><tbody>' +
          T.rows.map(function (r) {
            return '<tr class="border-b border-outline-variant/40"><td class="px-3 py-2.5 font-semibold text-primary whitespace-nowrap">' + esc(r[0]) + '</td>' +
              r.slice(1).map(function (v) { return '<td class="px-3 py-2.5 text-on-surface-variant">' + v + '</td>'; }).join('') + '</tr>';
          }).join('') + '</tbody></table>';
      }
      var note = tbl.previousElementSibling;
      if (note && note.tagName === 'P') note.textContent = 'Semua ukuran dalam centimeter (cm). Toleransi 2–3 cm karena pemotongan massal.';
      var tips = tbl.nextElementSibling;
      if (tips && p.cat !== 'abaya') tips.style.display = 'none';
    }

    // Toast & pesan WhatsApp
    var toast = $$('#cart-toast span').filter(function (s) { return /kini ada di tas/.test(s.textContent); })[0];
    function syncToast() { if (toast) toast.textContent = p.name + ' (' + state.color + ') kini ada di tas butik Anda.'; }
    syncToast();
    window.orderViaWhatsApp = function () {
      var sz = state.size === 'ALL' ? 'All Size' : (SIZE_LABEL[state.size] || state.size);
      var qty = parseInt(($('#qty-val') || {}).textContent, 10) || 1;
      var msg = 'Halo Yarka, saya ingin memesan ' + p.name + ' warna ' + state.color + ' ukuran ' + sz + ' sejumlah ' + qty + ' pcs.';
      window.open('https://wa.me/6285282437954?text=' + encodeURIComponent(msg), '_blank');
    };
    var oldAdd = window.handleAddToCart;
    window.handleAddToCart = function () { syncToast(); if (oldAdd) oldAdd(); };

    // Kartu "Padukan Dengan Ini" -> halaman produk masing-masing
    $$('section h3').forEach(function (h) {
      var name = h.textContent.trim();
      for (var k in P) if (P[k].name === name) {
        var card = h.closest('.group') || h.parentElement;
        card.style.cursor = 'pointer';
        (function (pk) { card.addEventListener('click', function (e) { if (!e.target.closest('button')) location.href = Y.url('', pk); }); })(P[k]);
      }
    });

    pickColor(col, false);
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
