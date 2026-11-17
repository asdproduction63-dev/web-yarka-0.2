// Keranjang & Wishlist Yarka (tersimpan di browser pengunjung via localStorage).
// - Badge header (wishlist & keranjang) selalu sesuai isi.
// - Laci keranjang: ubah jumlah, hapus, progres bebas ongkir, lanjut ke checkout.
// - Kartu produk: tombol hati = simpan ke wishlist, "Tambah Cepat" = masuk keranjang.
// - Halaman produk: "Tambah ke Keranjang" & tombol hati memakai warna/ukuran/jumlah yang dipilih.
// - Halaman wishlist.html dirender dari data wishlist.
(function () {
  var P = window.YARKA_PRODUCTS, Y = window.YARKA;
  if (!P || !Y) return;
  var root = /\/mobile\//.test(location.pathname.replace(/\\/g, '/')) ? '../' : '';
  var page = (location.pathname.split('/').pop() || 'index.html').toLowerCase();
  var KC = 'yarka_cart', KW = 'yarka_wish', ONGKIR_GRATIS = 500000, MAX_QTY = 10;
  var SIZE_LABEL = { ALL: 'All Size', KECIL: 'Kecil (Shoulder)', BESAR: 'Besar (Berlin)' };
  var mem = {}, subs = [];

  // ---------- penyimpanan ----------
  function load(k) {
    var v;
    try { v = JSON.parse(localStorage.getItem(k) || 'null'); } catch (e) { v = mem[k]; }
    if (!Array.isArray(v)) v = mem[k] || [];
    return v.filter(function (x) { return x && P[x.id]; });
  }
  function save(k, v) {
    mem[k] = v;
    try { localStorage.setItem(k, JSON.stringify(v)); } catch (e) {}
    subs.forEach(function (fn) { try { fn(); } catch (e) {} });
  }
  // sinkron antar-tab
  window.addEventListener('storage', function (e) { if (e.key === KC || e.key === KW) subs.forEach(function (fn) { fn(); }); });

  // ---------- harga & label ----------
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function sizeLabel(p, s) {
    if (p.id === 'zhaa') return s === 'S' ? 'Mini (S)' : 'Medium (M)';
    if (p.sizeLabels && p.sizeLabels[s]) return p.sizeLabels[s];
    return SIZE_LABEL[s] || s;
  }
  function defaultSize(p) { return p.sizes.indexOf('M') > -1 ? 'M' : p.sizes[0]; }
  function harga(p, warna, s) {
    if (p.id === 'zela') { var cr = /crinkle/i.test(warna || ''); return s === 'M' ? (cr ? 139000 : 199000) : (cr ? 119000 : 179000); }
    if (p.id === 'binar') return /^black/i.test(warna || '') ? 219000 : 189000;
    if (p.sizePrice) return p.sizePrice[s] || p.price;
    if (!p.priceMax) return p.price;
    if (s === 'L' || s === 'XL' || s === 'BESAR') return p.priceMax;
    if (p.sizes.length === 2 && p.sizes[0] === 'S' && s === 'M') return p.priceMax;
    return p.price;
  }
  function imgSrc(col) { return root + col.img; }

  // ---------- keranjang ----------
  function cartItems() {
    return load(KC).map(function (x, i) {
      var p = P[x.id], col = Y.color(p, x.w), s = p.sizes.indexOf(x.s) > -1 ? x.s : defaultSize(p);
      var q = Math.max(1, Math.min(MAX_QTY, parseInt(x.q, 10) || 1)), unit = harga(p, col.n, s);
      return { i: i, id: p.id, p: p, col: col, s: s, sLabel: sizeLabel(p, s), q: q, unit: unit, total: unit * q, url: Y.url(root, p, col) };
    });
  }
  function cartCount() { return cartItems().reduce(function (a, b) { return a + b.q; }, 0); }
  function subtotal() { return cartItems().reduce(function (a, b) { return a + b.total; }, 0); }
  function add(id, warna, s, q) {
    var p = P[id]; if (!p) return;
    var col = Y.color(p, warna); s = p.sizes.indexOf(s) > -1 ? s : defaultSize(p); q = Math.max(1, parseInt(q, 10) || 1);
    var c = load(KC), hit = null;
    c.forEach(function (x) { if (x.id === id && Y.color(p, x.w).n === col.n && x.s === s) hit = x; });
    if (hit) hit.q = Math.min(MAX_QTY, (parseInt(hit.q, 10) || 1) + q); else c.push({ id: id, w: col.n, s: s, q: Math.min(MAX_QTY, q) });
    save(KC, c);
    return { p: p, col: col, s: s };
  }
  function setQty(i, q) {
    var c = load(KC); if (!c[i]) return;
    c[i].q = Math.max(1, Math.min(MAX_QTY, q)); save(KC, c);
  }
  function remove(i) { var c = load(KC); c.splice(i, 1); save(KC, c); }
  function clearCart() { save(KC, []); }

  // ---------- wishlist ----------
  function wishList() { return load(KW); }
  function inWish(id) { return wishList().some(function (x) { return x.id === id; }); }
  function toggleWish(id, warna) {
    var w = wishList(), on;
    if (inWish(id)) { w = w.filter(function (x) { return x.id !== id; }); on = false; }
    else { w.unshift({ id: id, w: Y.color(P[id], warna).n }); on = true; }
    save(KW, w);
    toast(on ? P[id].name + ' disimpan ke wishlist.' : P[id].name + ' dihapus dari wishlist.', on ? { text: 'Lihat Wishlist', href: root + 'wishlist.html' } : null);
    return on;
  }
  function removeWish(id) { save(KW, wishList().filter(function (x) { return x.id !== id; })); }

  // ---------- toast ----------
  var toastEl, toastTimer;
  function toast(msg, action) {
    if (!toastEl) {
      toastEl = document.createElement('div');
      toastEl.setAttribute('role', 'status');
      toastEl.className = 'fixed left-1/2 bottom-6 z-[70] w-[calc(100%-32px)] max-w-md -translate-x-1/2 translate-y-4 opacity-0 pointer-events-none transition-all duration-300 bg-primary text-on-primary rounded-lg shadow-xl px-4 py-3 flex items-center gap-3';
      document.body.appendChild(toastEl);
    }
    toastEl.innerHTML = '<span class="material-symbols-outlined text-[20px] text-secondary-fixed shrink-0">check_circle</span>' +
      '<span class="flex-1 font-body-sm text-body-sm">' + esc(msg) + '</span>' +
      (action ? '<a class="shrink-0 font-label-caps-sm text-label-caps-sm uppercase tracking-wider underline underline-offset-4" href="' + action.href + '">' + esc(action.text) + '</a>' : '');
    toastEl.classList.remove('translate-y-4', 'opacity-0', 'pointer-events-none');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.add('translate-y-4', 'opacity-0', 'pointer-events-none'); }, 3200);
  }

  // ---------- badge header ----------
  function setBadge(span, n) {
    if (!span) return;
    span.textContent = n > 9 ? '9+' : String(n);
    span.style.display = n > 0 ? '' : 'none';
  }
  function renderBadges() {
    var wl = document.querySelectorAll('a[data-path="wishlist"]');
    [].forEach.call(wl, function (a) { a.setAttribute('href', root + 'wishlist.html'); setBadge(a.querySelector('span.absolute'), wishList().length); });
    var ct = document.getElementById('cart-drawer-toggle');
    if (ct) setBadge(ct.querySelector('span.absolute'), cartCount());
  }

  // ---------- laci keranjang ----------
  var drawer, overlay;
  function openCart() {
    if (!drawer) return;
    renderDrawer();
    drawer.classList.remove('translate-x-full');
    if (overlay) overlay.classList.remove('hidden');
    document.documentElement.style.overflow = 'hidden';
  }
  function closeCart() {
    if (!drawer) return;
    drawer.classList.add('translate-x-full');
    if (overlay) overlay.classList.add('hidden');
    document.documentElement.style.overflow = '';
  }
  function qtyBox(it, cls) {
    return '<div class="flex items-center border border-outline-variant rounded ' + (cls || '') + '">' +
      '<button type="button" class="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed" data-act="min" data-i="' + it.i + '" aria-label="Kurangi jumlah"' + (it.q <= 1 ? ' disabled' : '') + '>−</button>' +
      '<span class="w-7 text-center font-label-text text-label-text text-primary font-semibold">' + it.q + '</span>' +
      '<button type="button" class="w-8 h-8 flex items-center justify-center text-on-surface-variant hover:text-primary disabled:opacity-30 disabled:cursor-not-allowed" data-act="plus" data-i="' + it.i + '" aria-label="Tambah jumlah"' + (it.q >= MAX_QTY ? ' disabled' : '') + '>+</button></div>';
  }
  function itemRow(it) {
    return '<div class="flex gap-4 pb-4 border-b border-outline-variant/30 last:border-0">' +
      '<a href="' + it.url + '" class="w-20 h-24 rounded overflow-hidden bg-surface-container shrink-0"><img class="w-full h-full object-cover" alt="' + esc(it.p.name + ' warna ' + it.col.n) + '" src="' + imgSrc(it.col) + '"></a>' +
      '<div class="flex-1 min-w-0 flex flex-col justify-between">' +
      '<div><div class="flex justify-between items-start gap-2">' +
      '<a href="' + it.url + '" class="font-body-md text-body-md text-primary font-medium line-clamp-1 hover:underline underline-offset-4">' + esc(it.p.name) + '</a>' +
      '<button type="button" class="text-outline hover:text-error transition-colors -mt-0.5" data-act="del" data-i="' + it.i + '" aria-label="Hapus ' + esc(it.p.name) + '"><span class="material-symbols-outlined text-[18px]">delete</span></button></div>' +
      '<p class="font-label-caps-sm text-label-caps-sm text-on-surface-variant uppercase mt-1">' + esc(it.col.n) + ' • ' + esc(it.sLabel) + '</p>' +
      '<p class="font-body-sm text-body-sm text-outline mt-0.5">' + Y.rp(it.unit) + ' / pcs</p></div>' +
      '<div class="flex items-center justify-between mt-2">' + qtyBox(it) +
      '<span class="font-body-md text-body-md text-primary font-semibold">' + Y.rp(it.total) + '</span></div></div></div>';
  }
  function ongkirBar(sub) {
    var sisa = ONGKIR_GRATIS - sub, pct = Math.min(100, Math.round(sub / ONGKIR_GRATIS * 100));
    var txt = sisa > 0 ? 'Tambah <strong>' + Y.rp(sisa) + '</strong> lagi untuk Bebas Ongkir JNE' : '<strong>Selamat!</strong> Pesanan Anda dapat Bebas Ongkir JNE';
    return '<div class="flex items-center gap-2"><span class="material-symbols-outlined text-secondary text-[20px]">local_shipping</span>' +
      '<p class="font-label-text text-label-text text-on-secondary-container">' + txt + '</p></div>' +
      '<div class="mt-2 h-1.5 rounded-full bg-surface-container-lowest/70 overflow-hidden"><div class="h-full rounded-full bg-secondary transition-all duration-500" style="width:' + pct + '%"></div></div>';
  }
  function buildDrawer() {
    drawer = document.getElementById('cart-drawer');
    overlay = document.getElementById('cart-overlay');
    if (!drawer) return;
    drawer.setAttribute('role', 'dialog'); drawer.setAttribute('aria-label', 'Keranjang belanja');
    drawer.innerHTML =
      '<div class="h-20 px-6 flex items-center justify-between border-b border-outline-variant/40 shrink-0">' +
      '<div class="flex items-center gap-2.5"><span class="material-symbols-outlined text-primary text-[24px]">shopping_bag</span>' +
      '<h2 class="font-headline-sm text-headline-sm text-primary">Keranjang Belanja</h2>' +
      '<span class="bg-surface-container px-2 py-0.5 rounded text-on-surface-variant font-label-caps-sm text-label-caps-sm" data-yk="count">0 Item</span></div>' +
      '<button type="button" class="text-on-surface-variant hover:text-primary transition-colors p-1.5" data-act="close" aria-label="Tutup keranjang"><span class="material-symbols-outlined text-[22px]">close</span></button></div>' +
      '<div class="bg-secondary-container/60 px-6 py-3 border-b border-secondary-container shrink-0" data-yk="ongkir"></div>' +
      '<div class="flex-1 overflow-y-auto px-6 py-5 space-y-4" data-yk="list"></div>' +
      '<div class="p-6 bg-surface border-t border-outline-variant/40 space-y-3 shrink-0" data-yk="foot"></div>';
    drawer.addEventListener('click', function (e) {
      var b = e.target.closest('[data-act]'); if (!b) return;
      var a = b.getAttribute('data-act'), i = parseInt(b.getAttribute('data-i'), 10);
      var it = cartItems()[i];
      if (a === 'close') return closeCart();
      if (a === 'del' && it) { remove(i); toast(it.p.name + ' dihapus dari keranjang.'); }
      if (a === 'min' && it) setQty(i, it.q - 1);
      if (a === 'plus' && it) setQty(i, it.q + 1);
    });
    if (overlay) overlay.addEventListener('click', closeCart);
    var tg = document.getElementById('cart-drawer-toggle');
    if (tg) tg.addEventListener('click', function (e) { e.preventDefault(); openCart(); });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeCart(); });
  }
  function renderDrawer() {
    if (!drawer) return;
    var items = cartItems(), sub = subtotal(), n = cartCount();
    drawer.querySelector('[data-yk="count"]').textContent = n + ' Item';
    var ong = drawer.querySelector('[data-yk="ongkir"]'), list = drawer.querySelector('[data-yk="list"]'), foot = drawer.querySelector('[data-yk="foot"]');
    if (!items.length) {
      ong.style.display = 'none'; foot.style.display = 'none';
      list.innerHTML = '<div class="h-full flex flex-col items-center justify-center text-center gap-4 py-10">' +
        '<div class="w-20 h-20 rounded-full bg-surface-container flex items-center justify-center"><span class="material-symbols-outlined text-outline text-[36px]">shopping_bag</span></div>' +
        '<div><h3 class="font-headline-sm text-headline-sm text-primary">Keranjang masih kosong</h3>' +
        '<p class="font-body-sm text-body-sm text-on-surface-variant mt-1 max-w-xs">Temukan abaya, bergo, dan khimar favorit Anda di koleksi Yarka.</p></div>' +
        '<a href="' + root + 'katalog.html" class="inline-flex items-center px-6 h-11 bg-primary text-on-primary rounded font-label-caps-lg text-label-caps-lg uppercase tracking-wider hover:bg-primary-container transition-colors">Mulai Belanja</a>' +
        (wishList().length ? '<a href="' + root + 'wishlist.html" class="font-label-caps-sm text-label-caps-sm uppercase tracking-wider text-secondary underline underline-offset-4">Lihat Wishlist (' + wishList().length + ')</a>' : '') + '</div>';
      return;
    }
    ong.style.display = ''; foot.style.display = '';
    ong.innerHTML = ongkirBar(sub);
    list.innerHTML = items.map(itemRow).join('');
    foot.innerHTML =
      '<div class="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm"><span>Subtotal (' + n + ' item)</span><span class="text-primary font-medium">' + Y.rp(sub) + '</span></div>' +
      '<div class="flex items-center justify-between text-on-surface-variant font-body-sm text-body-sm"><span>Ongkos Kirim</span><span class="text-secondary font-medium">Dihitung saat checkout</span></div>' +
      '<div class="flex items-center justify-between pt-3 border-t border-outline-variant/30 font-headline-sm text-headline-sm text-primary"><span>Total</span><span>' + Y.rp(sub) + '</span></div>' +
      '<a class="flex items-center justify-center gap-2 w-full bg-primary text-on-primary h-12 rounded font-label-caps-lg text-label-caps-lg uppercase tracking-wider hover:bg-primary-container transition-colors" href="' + root + 'checkout.html"><span class="material-symbols-outlined text-[18px]">lock</span>Checkout Sekarang</a>' +
      '<button type="button" data-act="close" class="w-full h-11 rounded border border-outline-variant text-primary font-label-caps-lg text-label-caps-lg uppercase tracking-wider hover:bg-surface-container transition-colors">Lanjut Belanja</button>';
  }

  // ---------- tombol hati ----------
  function paintHeart(btn, on) {
    btn.setAttribute('aria-pressed', on ? 'true' : 'false');
    btn.setAttribute('aria-label', on ? 'Hapus dari Wishlist' : 'Simpan ke Wishlist');
    ['bg-primary', 'text-on-primary'].forEach(function (k) { btn.classList.toggle(k, on); });
    ['bg-surface-container-lowest/80', 'text-primary'].forEach(function (k) { btn.classList.toggle(k, !on); });
    var ic = btn.querySelector('.material-symbols-outlined');
    if (ic) ic.style.fontVariationSettings = on ? "'FILL' 1" : "'FILL' 0";
  }
  function renderHearts() {
    [].forEach.call(document.querySelectorAll('[data-produk] .wishlist-btn'), function (b) {
      paintHeart(b, inWish(b.closest('[data-produk]').getAttribute('data-produk')));
    });
    var pi = document.getElementById('wishlist-icon'), pr = window.YarkaProduk;
    if (pi && pr) {
      var on = inWish(pr.p.id);
      pi.textContent = 'favorite';
      pi.style.fontVariationSettings = on ? "'FILL' 1" : "'FILL' 0";
      pi.classList.toggle('text-error', on);
      var btn = pi.closest('button'); if (btn) btn.setAttribute('aria-label', on ? 'Hapus dari Wishlist' : 'Simpan ke Wishlist');
    }
  }
  function bindCards() {
    [].forEach.call(document.querySelectorAll('[data-produk]'), function (card) {
      var id = card.getAttribute('data-produk');
      var wb = card.querySelector('.wishlist-btn'), qb = card.querySelector('.quick-add-btn');
      if (wb) wb.addEventListener('click', function (e) { e.preventDefault(); e.stopPropagation(); toggleWish(id, card.getAttribute('data-warna')); });
      if (qb) {
        qb.setAttribute('type', 'button');
        qb.addEventListener('click', function (e) {
          e.preventDefault(); e.stopPropagation();
          var r = add(id, card.getAttribute('data-warna'), null, 1);
          if (r) { toast(r.p.name + ' (' + r.col.n + ', ' + sizeLabel(r.p, r.s) + ') masuk keranjang. Ukuran bisa diubah di halaman produk.'); openCart(); }
        });
      }
    });
  }
  function bindProduk() {
    var pr = window.YarkaProduk; if (!pr) return;
    window.handleAddToCart = function () {
      var q = parseInt((document.getElementById('qty-val') || {}).textContent, 10) || 1;
      var r = add(pr.p.id, pr.state.color, pr.state.size, q);
      if (r) { toast(q + ' × ' + r.p.name + ' (' + r.col.n + ', ' + sizeLabel(r.p, r.s) + ') masuk keranjang.'); openCart(); }
    };
    window.toggleWishlist = function () { toggleWish(pr.p.id, pr.state.color); };
  }

  // ---------- halaman wishlist ----------
  function renderWishlistPage() {
    var grid = document.getElementById('wishlist-grid'); if (!grid) return;
    var list = wishList(), empty = document.getElementById('wishlist-empty'), cnt = document.getElementById('wishlist-count'), all = document.getElementById('wishlist-all');
    if (cnt) cnt.textContent = list.length + ' produk tersimpan';
    if (all) all.style.display = list.length ? '' : 'none';
    if (empty) empty.style.display = list.length ? 'none' : '';
    grid.style.display = list.length ? '' : 'none';
    grid.innerHTML = list.map(function (x) {
      var p = P[x.id], col = Y.color(p, x.w), url = Y.url(root, p, col), ds = defaultSize(p);
      var opts = p.sizes.map(function (s) { return '<option value="' + s + '"' + (s === ds ? ' selected' : '') + '>' + esc(sizeLabel(p, s)) + '</option>'; }).join('');
      var sw = p.colors.map(function (c) {
        return '<button type="button" class="yk-sw' + (c.n === col.n ? ' is-on' : '') + '" style="background:' + c.hex + '" title="' + esc(c.n) + '" aria-label="Warna ' + esc(c.n) + '" data-wl-warna="' + esc(c.n) + '"></button>';
      }).join('');
      return '<article class="group flex flex-col bg-surface-container-lowest rounded-lg overflow-hidden shadow-sm hover:shadow-md transition-all" data-wl="' + p.id + '">' +
        '<div class="relative aspect-[4/5] bg-surface-container overflow-hidden">' +
        '<a href="' + url + '" data-wl-link><img class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" data-wl-img alt="' + esc(p.name + ' warna ' + col.n) + '" src="' + imgSrc(col) + '"></a>' +
        (p.baru ? '<span class="absolute bottom-2.5 left-2.5 bg-secondary text-on-secondary px-2 py-0.5 rounded font-label-caps-sm text-label-caps-sm uppercase tracking-wider">Rilis Baru</span>' : '') +
        '<button type="button" class="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-surface-container-lowest/90 backdrop-blur-sm text-primary flex items-center justify-center hover:bg-error hover:text-on-error transition-colors" data-wl-del aria-label="Hapus ' + esc(p.name) + ' dari wishlist"><span class="material-symbols-outlined text-[18px]">close</span></button></div>' +
        '<div class="p-3.5 flex flex-col flex-1 gap-2.5">' +
        '<div><p class="font-label-caps-sm text-label-caps-sm uppercase text-secondary font-semibold">' + esc(p.catLabel) + '</p>' +
        '<h3 class="font-body-md text-body-md text-primary font-medium line-clamp-1 mt-0.5"><a href="' + url + '" data-wl-link class="hover:underline underline-offset-4">' + esc(p.name) + '</a></h3>' +
        '<p class="font-headline-sm text-headline-sm text-primary mt-1" data-wl-price>' + Y.rp(harga(p, col.n, ds)) + '</p></div>' +
        '<div><div class="flex flex-wrap items-center gap-2 py-1">' + sw + '</div>' +
        '<span class="font-label-caps-sm text-label-caps-sm text-on-surface-variant" data-wl-nama>' + esc(col.n) + '</span></div>' +
        '<div class="mt-auto flex flex-col gap-2">' +
        '<label class="sr-only" for="wl-size-' + p.id + '">Ukuran</label>' +
        '<select id="wl-size-' + p.id + '" data-wl-size class="w-full h-10 px-3 bg-surface-container-low rounded font-body-sm text-body-sm text-primary focus:outline-none focus:ring-1 focus:ring-secondary cursor-pointer">' + opts + '</select>' +
        '<button type="button" data-wl-add class="w-full h-10 bg-primary text-on-primary rounded font-label-caps-sm text-label-caps-sm uppercase tracking-wider flex items-center justify-center gap-1.5 hover:bg-primary-container transition-colors"><span class="material-symbols-outlined text-[16px]">shopping_bag</span><span class="hidden sm:inline">Tambah ke<span class="material-symbols-outlined text-[16px]">shopping_bag</span>Tambah ke Keranjang</button>nbsp;</span>Keranjang</button>' +
        '</div></div></article>';
    }).join('');
  }
  function bindWishlistPage() {
    var grid = document.getElementById('wishlist-grid'); if (!grid) return;
    function state(card) {
      var p = P[card.getAttribute('data-wl')], on = card.querySelector('.yk-sw.is-on');
      return { p: p, w: on ? on.getAttribute('data-wl-warna') : p.colors[0].n, s: card.querySelector('[data-wl-size]').value };
    }
    function refreshPrice(card) { var st = state(card); card.querySelector('[data-wl-price]').textContent = Y.rp(harga(st.p, st.w, st.s)); }
    grid.addEventListener('click', function (e) {
      var card = e.target.closest('[data-wl]'); if (!card) return;
      var st = state(card), sw = e.target.closest('[data-wl-warna]');
      if (sw) {
        var col = Y.color(st.p, sw.getAttribute('data-wl-warna'));
        [].forEach.call(card.querySelectorAll('.yk-sw'), function (b) { b.classList.toggle('is-on', b === sw); });
        var im = card.querySelector('[data-wl-img]'); im.src = imgSrc(col); im.alt = st.p.name + ' warna ' + col.n;
        card.querySelector('[data-wl-nama]').textContent = col.n;
        [].forEach.call(card.querySelectorAll('[data-wl-link]'), function (a) { a.href = Y.url(root, st.p, col); });
        refreshPrice(card);
        // simpan warna pilihan terakhir tanpa merender ulang
        var w = wishList(); w.forEach(function (x) { if (x.id === st.p.id) x.w = col.n; });
        try { localStorage.setItem(KW, JSON.stringify(w)); } catch (er) { mem[KW] = w; }
      } else if (e.target.closest('[data-wl-del]')) {
        removeWish(st.p.id); toast(st.p.name + ' dihapus dari wishlist.');
      } else if (e.target.closest('[data-wl-add]')) {
        var r = add(st.p.id, st.w, st.s, 1);
        if (r) { toast(r.p.name + ' (' + r.col.n + ', ' + sizeLabel(r.p, r.s) + ') masuk keranjang.'); openCart(); }
      }
    });
    grid.addEventListener('change', function (e) { if (e.target.matches('[data-wl-size]')) refreshPrice(e.target.closest('[data-wl]')); });
    var all = document.getElementById('wishlist-all');
    if (all) all.addEventListener('click', function () {
      var n = 0;
      [].forEach.call(grid.querySelectorAll('[data-wl]'), function (card) { var st = state(card); add(st.p.id, st.w, st.s, 1); n++; });
      if (n) { toast(n + ' produk dari wishlist masuk keranjang.'); openCart(); }
    });
  }

  function renderAll() {
    renderBadges(); renderHearts();
    if (drawer && !drawer.classList.contains('translate-x-full')) renderDrawer();
    renderWishlistPage();
  }

  window.YarkaToko = {
    cartItems: cartItems, cartCount: cartCount, subtotal: subtotal, add: add, setQty: setQty, remove: remove, clearCart: clearCart,
    wishList: wishList, inWish: inWish, toggleWish: toggleWish, harga: harga, sizeLabel: sizeLabel, imgSrc: imgSrc,
    openCart: openCart, closeCart: closeCart, toast: toast, onChange: function (fn) { subs.push(fn); }, ONGKIR_GRATIS: ONGKIR_GRATIS
  };

  function init() {
    buildDrawer(); renderDrawer();
    bindCards(); bindProduk(); bindWishlistPage();
    subs.push(renderAll);
    renderAll();
    if (/[?&]keranjang=1/.test(location.search)) openCart();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
