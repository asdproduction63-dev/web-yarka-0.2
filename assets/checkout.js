// Halaman checkout: ringkasan dari keranjang, ongkir sesuai kurir, validasi data pengiriman,
// lalu simpan pesanan (yarka_order) dan lanjut ke pembayaran.html.
(function () {
  var T = window.YarkaToko, Y = window.YARKA;
  if (!T || !Y) return;
  var KURIR = {
    jne: { label: 'JNE Reguler / YES', eta: '1–2 hari kerja', cost: 22000 },
    sicepat: { label: 'SiCepat BEST', eta: 'Besok sampai sebelum 18.00 WIB', cost: 25000 },
    paxel: { label: 'Paxel Instant', eta: 'Hari ini, 4–6 jam (Jabodetabek)', cost: 35000 }
  };
  var ASURANSI = 2500, KA = 'yarka_alamat', KO = 'yarka_order';
  var FIELDS = ['email', 'wa', 'nama', 'telp2', 'prov', 'kota', 'kec', 'alamat', 'catatan'];
  function $(id) { return document.getElementById(id); }
  function esc(s) { return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/"/g, '&quot;'); }
  function kurir() { var r = document.querySelector('input[name="shipping_service"]:checked'); return r ? r.value : 'jne'; }
  function ongkir(k) { return (KURIR[k] || KURIR.jne).cost; }

  function render() {
    var items = T.cartItems(), sub = T.subtotal(), n = T.cartCount(), k = kurir(), ong = ongkir(k);
    var list = $('co-items'), empty = $('co-empty');
    $('co-count').textContent = n + ' Produk';
    list.style.display = items.length ? '' : 'none';
    empty.style.display = items.length ? 'none' : '';
    list.innerHTML = items.map(function (it) {
      return '<div class="flex items-start gap-3 sm:gap-4 bg-surface-container-low p-3 sm:p-3.5 rounded-lg">' +
        '<a href="' + it.url + '" class="w-[72px] h-24 sm:w-20 rounded-md overflow-hidden bg-surface-container-highest flex-shrink-0"><img class="w-full h-full object-cover" alt="' + esc(it.p.name + ' warna ' + it.col.n) + '" src="' + T.imgSrc(it.col) + '"></a>' +
        '<div class="flex-1 min-w-0">' +
        '<div class="flex items-start justify-between gap-2"><span class="font-label-caps-sm text-label-caps-sm text-secondary uppercase font-semibold">' + esc(it.p.catLabel) + '</span>' +
        '<button type="button" class="w-9 h-9 -mt-2 -mr-2 flex items-center justify-center flex-shrink-0 rounded-full text-outline hover:text-error transition-colors" data-co="del" data-i="' + it.i + '" aria-label="Hapus ' + esc(it.p.name) + '"><span class="material-symbols-outlined text-[18px]">delete</span></button></div>' +
        '<h3 class="font-body-md text-body-md font-semibold text-primary truncate">' + esc(it.p.name) + '</h3>' +
        '<p class="font-body-sm text-body-sm text-on-surface-variant text-[12px]">' + esc(it.col.n) + ' • ' + esc(it.sLabel) + ' • ' + esc(it.p.bahanLabel) + '</p>' +
        '<div class="flex items-center justify-between gap-2 mt-2">' +
        '<div class="flex items-center border border-outline-variant rounded bg-surface-container-lowest">' +
        '<button type="button" class="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary disabled:opacity-30" data-co="min" data-i="' + it.i + '" aria-label="Kurangi jumlah"' + (it.q <= 1 ? ' disabled' : '') + '>−</button>' +
        '<span class="w-8 text-center font-label-text text-label-text text-primary font-semibold">' + it.q + '</span>' +
        '<button type="button" class="w-9 h-9 flex items-center justify-center text-on-surface-variant hover:text-primary disabled:opacity-30" data-co="plus" data-i="' + it.i + '" aria-label="Tambah jumlah"' + (it.q >= 10 ? ' disabled' : '') + '>+</button></div>' +
        '<p class="font-body-md text-body-md font-bold text-primary whitespace-nowrap">' + Y.rp(it.total) + '</p></div></div></div>';
    }).join('');
    $('co-sub-label').textContent = 'Subtotal Produk (' + n + ' Item)';
    $('co-sub').textContent = Y.rp(sub);
    $('co-ship-name').textContent = 'Ongkir ' + KURIR[k].label;
    $('co-ship').innerHTML = !items.length ? '<span class="font-medium text-primary">–</span>' : '<span class="font-medium text-primary">' + Y.rp(ong) + '</span>';
    $('co-ins').textContent = items.length ? Y.rp(ASURANSI) : '–';
    $('co-total').textContent = Y.rp(items.length ? sub + ong + ASURANSI : 0);
    var next = $('co-next');
    next.classList.toggle('opacity-50', !items.length);
    next.classList.toggle('cursor-not-allowed', !items.length);
    next.setAttribute('aria-disabled', items.length ? 'false' : 'true');
  }

  function val(id) { var el = $('co-' + id); return el ? el.value.trim() : ''; }
  function markErr(id, msg) {
    var el = $('co-' + id); if (!el) return;
    el.classList.add('ring-2', 'ring-error/70');
    var holder = el.closest('[data-field]');
    if (holder && !holder.querySelector('.co-err')) {
      var p = document.createElement('p');
      p.className = 'co-err font-body-sm text-body-sm text-error text-[12px] mt-1';
      p.textContent = msg; holder.appendChild(p);
    }
  }
  function clearErr(el) {
    el.classList.remove('ring-2', 'ring-error/70');
    var holder = el.closest('[data-field]'), e = holder && holder.querySelector('.co-err');
    if (e) e.remove();
  }
  function validate() {
    var bad = [];
    function need(id, ok, msg) { if (!ok) { bad.push(id); markErr(id, msg); } }
    need('email', /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(val('email')), 'Masukkan alamat email yang valid.');
    need('wa', /^(\+?62|0)8\d{7,12}$/.test(val('wa').replace(/[\s-]/g, '')), 'Masukkan nomor WhatsApp aktif (contoh 0812xxxxxxx).');
    need('nama', val('nama').length >= 3, 'Nama penerima wajib diisi.');
    need('prov', !!val('prov'), 'Pilih provinsi tujuan.');
    need('kota', val('kota').length >= 3, 'Kota / kabupaten wajib diisi.');
    need('kec', val('kec').length >= 3, 'Kecamatan wajib diisi.');
    need('alamat', val('alamat').length >= 10, 'Tuliskan alamat lengkap (nama jalan, nomor rumah, RT/RW).');
    return bad;
  }
  function err(msg) { var e = $('co-error'); e.textContent = msg; e.classList.remove('hidden'); }

  function submit(e) {
    e.preventDefault();
    $('co-error').classList.add('hidden');
    var items = T.cartItems();
    if (!items.length) { err('Keranjang Anda masih kosong. Tambahkan produk terlebih dahulu.'); return; }
    var bad = validate();
    if (bad.length) {
      err('Mohon lengkapi ' + bad.length + ' data pengiriman yang ditandai.');
      var f = $('co-' + bad[0]); if (f) { f.scrollIntoView({ behavior: 'smooth', block: 'center' }); setTimeout(function () { f.focus({ preventScroll: true }); }, 350); }
      return;
    }
    var data = {}; FIELDS.forEach(function (k) { data[k] = val(k); });
    var k = kurir(), sub = T.subtotal(), ong = ongkir(k, sub), d = new Date();
    var pad = function (x) { return (x < 10 ? '0' : '') + x; };
    var order = {
      ref: 'YRK-' + d.getFullYear() + pad(d.getMonth() + 1) + pad(d.getDate()) + '-' + String(Math.floor(1000 + Math.random() * 9000)),
      dibuat: d.toISOString(),
      items: items.map(function (it) { return { id: it.id, s: it.s, nama: it.p.name, cat: it.p.catLabel, bahan: it.p.bahanLabel, warna: it.col.n, ukuran: it.sLabel, q: it.q, unit: it.unit, total: it.total, img: it.col.img }; }),
      kontak: data,
      kurir: { id: k, label: KURIR[k].label, eta: KURIR[k].eta, biaya: KURIR[k].cost },
      kado: $('gift-box-option') && $('gift-box-option').checked ? (val('kado') || 'Ya') : '',
      subtotal: sub, ongkir: ong, asuransi: ASURANSI, total: sub + ong + ASURANSI,
      jumlah: T.cartCount()
    };
    try {
      localStorage.setItem(KO, JSON.stringify(order));
      if ($('co-simpan') && $('co-simpan').checked) localStorage.setItem(KA, JSON.stringify(data));
    } catch (er) {}
    var P = window.YarkaPelanggan;
    if (!P) { location.href = 'pembayaran.html'; return; }
    var next = $('co-next'); next.setAttribute('aria-disabled', 'true'); next.classList.add('opacity-50');
    P.simpanRepeatOrder(order).then(function () { location.href = 'pembayaran.html'; });
  }

  function init() {
    if (!$('co-items')) return;
    // isi ulang alamat tersimpan
    try { var a = JSON.parse(localStorage.getItem(KA) || 'null'); if (a) FIELDS.forEach(function (k) { if (a[k] && $('co-' + k)) $('co-' + k).value = a[k]; }); } catch (e) {}
    FIELDS.forEach(function (k) {
      var el = $('co-' + k); if (!el) return;
      el.addEventListener('input', function () { clearErr(el); });
      el.addEventListener('change', function () { clearErr(el); });
    });
    $('co-items').addEventListener('click', function (e) {
      var b = e.target.closest('[data-co]'); if (!b) return;
      var i = parseInt(b.getAttribute('data-i'), 10), it = T.cartItems()[i]; if (!it) return;
      var a = b.getAttribute('data-co');
      if (a === 'del') { T.remove(i); T.toast(it.p.name + ' dihapus dari keranjang.'); }
      if (a === 'min') T.setQty(i, it.q - 1);
      if (a === 'plus') T.setQty(i, it.q + 1);
    });
    [].forEach.call(document.querySelectorAll('input[name="shipping_service"]'), function (r) { r.addEventListener('change', render); });
    var gift = $('gift-box-option'), kado = $('co-kado');
    if (gift && kado) { var g = function () { kado.closest('div').style.display = gift.checked ? '' : 'none'; }; gift.addEventListener('change', g); g(); }
    $('co-next').addEventListener('click', submit, true);
    T.onChange(render);
    render();
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
