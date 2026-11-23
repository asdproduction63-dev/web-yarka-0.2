// Halaman Akun / Pesanan Saya: riwayat pesanan dari perangkat ini (localStorage "yarka_orders", diisi pesanan.js).
// Ini hanya catatan di browser pembeli; status resmi dikonfirmasi admin lewat WhatsApp.
// Pembatalan tidak diubah di browser, melainkan dikirim sebagai permintaan ke WhatsApp admin.
(function () {
  var Y = window.YARKA, P = window.YARKA_PRODUCTS || {}, T = window.YarkaToko;
  var KL = 'yarka_orders', WA_ADMIN = '6285282437954';
  try { localStorage.removeItem('yarka_order_status'); } catch (e) {} // sisa versi lama (pembatalan lokal)
  function get(k, d) { try { var v = JSON.parse(localStorage.getItem(k) || 'null'); return v == null ? d : v; } catch (e) { return d; } }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;'); }
  var $ = function (id) { return document.getElementById(id); };

  var STATUS = {
    menunggu: { label: 'Menunggu Pembayaran', icon: 'schedule', step: 1, cancel: true },
    diproses: { label: 'Diproses', icon: 'inventory_2', step: 2, cancel: true },
    dikirim: { label: 'Sedang Dikirim', icon: 'local_shipping', step: 3 },
    selesai: { label: 'Selesai', icon: 'check_circle', step: 4 },
    dibatalkan: { label: 'Dibatalkan', icon: 'cancel', step: 0 }
  };
  var STEPS = ['Dipesan', 'Dibayar', 'Dikirim', 'Diterima'];

  function semua() {
    var list = get(KL, []);
    if (!Array.isArray(list)) list = [];
    return list.filter(function (o) { return o && o.ref && Array.isArray(o.items); })
      .map(function (o) { if (!STATUS[o.status] || o.status === 'dibatalkan') o.status = 'diproses'; return o; })
      .sort(function (x, y) { return new Date(y.dibuat) - new Date(x.dibuat); });
  }

  var BLN = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
  function tgl(s) { var d = new Date(s); var p = function (x) { return (x < 10 ? '0' : '') + x; }; return d.getDate() + ' ' + BLN[d.getMonth()] + ' ' + d.getFullYear() + ' • ' + p(d.getHours()) + ':' + p(d.getMinutes()) + ' WIB'; }

  var filter = 'all', orders = [];

  function badge(st) {
    var S = STATUS[st] || STATUS.diproses;
    return '<span class="yo-badge yo-' + st + '"><span class="material-symbols-outlined text-[14px]">' + S.icon + '</span>' + S.label + '</span>';
  }
  function progress(st) {
    var n = (STATUS[st] || {}).step || 0;
    if (st === 'dibatalkan') return '';
    return '<ol class="yo-steps">' + STEPS.map(function (s, i) {
      return '<li class="' + (i < n ? 'is-done' : '') + (i === n - 1 ? ' is-now' : '') + '"><span></span>' + s + '</li>';
    }).join('') + '</ol>';
  }
  function card(o) {
    var S = STATUS[o.status] || STATUS.diproses, n = o.items.reduce(function (a, b) { return a + b.q; }, 0);
    var acts = ['<button type="button" class="yo-btn-soft" data-invoice="' + esc(o.ref) + '"><span class="material-symbols-outlined text-[15px]">receipt_long</span>E-Invoice (PDF)</button>'];
    if (S.cancel) acts.push('<button type="button" class="yo-btn-ghost" data-batal="' + esc(o.ref) + '">' + (o.status === 'menunggu' ? 'Tidak Jadi Beli' : 'Batalkan Pesanan') + '</button>');
    if (o.status === 'menunggu') acts.push('<a class="yo-btn" href="pembayaran.html">Bayar Sekarang</a>');
    if (o.status === 'selesai') acts.push('<a class="yo-btn-soft" href="ulasan-terkirim.html"><span class="material-symbols-outlined text-[15px]">star</span>Beri Ulasan</a>');
    if (o.status === 'selesai' || o.status === 'dibatalkan') acts.push('<button type="button" class="yo-btn" data-lagi="' + esc(o.ref) + '">Beli Lagi</button>');
    var note = '';
    if (o.status === 'dibatalkan') note = '<p class="yo-note"><span class="material-symbols-outlined text-[16px]">info</span>' +
      (o.alasan ? 'Alasan: ' + esc(o.alasan) + '. ' : '') + (o.wasPaid === false ? 'Tidak ada dana yang ditagihkan.' : 'Dana dikembalikan ke metode pembayaran Anda dalam 1–3 hari kerja.') + '</p>';
    return '<article class="yo-card" data-status="' + o.status + '">' +
      '<header class="flex flex-wrap items-start justify-between gap-3">' +
        '<div><p class="font-label-caps-lg text-label-caps-lg text-primary">#' + esc(o.ref) + '</p>' +
        '<p class="font-body-sm text-body-sm text-on-surface-variant mt-1">' + tgl(o.dibuat) + (o.kurir && o.kurir.label ? ' • ' + esc(o.kurir.label) : '') + '</p></div>' + badge(o.status) +
      '</header>' + progress(o.status) +
      '<div class="yo-items">' + o.items.map(function (it) {
        return '<div class="flex items-center gap-4"><img class="w-16 h-20 rounded-lg object-cover bg-surface-container shrink-0" src="' + esc(it.img) + '" alt="' + esc(it.nama + ' warna ' + it.warna) + '" loading="lazy">' +
          '<div class="min-w-0 flex-1"><p class="font-label-caps-sm text-label-caps-sm uppercase tracking-wider text-secondary font-semibold">' + esc(it.cat || '') + '</p>' +
          '<h4 class="font-body-md text-body-md font-medium text-primary truncate">' + esc(it.nama) + '</h4>' +
          '<p class="font-body-sm text-body-sm text-on-surface-variant">' + esc(it.warna) + ' • <span class="whitespace-nowrap">' + esc(it.ukuran) + '</span></p></div>' +
          '<div class="text-right shrink-0"><p class="font-body-sm text-body-sm text-on-surface-variant">' + it.q + ' ×</p><p class="font-body-md text-body-md font-semibold text-primary">' + Y.rp(it.total) + '</p></div></div>';
      }).join('') + '</div>' + note +
      '<footer class="flex flex-wrap items-center justify-between gap-4 pt-5 mt-1 border-t border-outline-variant/40">' +
        '<div><p class="font-body-sm text-body-sm text-on-surface-variant">Total Belanja (' + n + ' busana)</p><p class="font-body-lg text-body-lg font-semibold text-primary mt-0.5">' + Y.rp(o.total) + '</p></div>' +
        '<div class="flex flex-wrap items-center gap-2">' + acts.join('') + '</div>' +
      '</footer></article>';
  }

  function render() {
    orders = semua();
    var counts = { all: orders.length };
    orders.forEach(function (o) { counts[o.status] = (counts[o.status] || 0) + 1; });
    [].forEach.call(document.querySelectorAll('[data-filter]'), function (b) {
      var f = b.getAttribute('data-filter'), c = b.querySelector('.yo-count');
      b.classList.toggle('is-on', f === filter); b.setAttribute('aria-selected', f === filter);
      if (c) c.textContent = counts[f] || 0;
    });
    var list = orders.filter(function (o) { return filter === 'all' || o.status === filter; });
    $('yo-list').innerHTML = list.length ? list.map(card).join('') :
      '<div class="yo-empty"><span class="material-symbols-outlined text-[40px] text-secondary">receipt_long</span>' +
      '<p class="font-headline-sm text-headline-sm text-primary mt-3">Belum ada pesanan di sini</p>' +
      '<p class="font-body-md text-body-md text-on-surface-variant mt-1">Pesanan dengan status ini akan tampil di halaman ini.</p>' +
      '<a class="yo-btn mt-6" href="katalog.html">Jelajahi Koleksi</a></div>';
    var aktif = (counts.menunggu || 0) + (counts.diproses || 0) + (counts.dikirim || 0);
    if ($('yo-stat-aktif')) $('yo-stat-aktif').textContent = aktif;
    if ($('yo-stat-selesai')) $('yo-stat-selesai').textContent = counts.selesai || 0;
    if ($('yo-stat-wish') && T) $('yo-stat-wish').textContent = T.wishList().length;
  }
  function find(ref) { for (var i = 0; i < orders.length; i++) if (orders[i].ref === ref) return orders[i]; return null; }

  // ---------- modal pembatalan ----------
  var modal, current, lastFocus;
  function openModal(o) {
    current = o; lastFocus = document.activeElement; modal = $('yo-modal');
    $('yo-m-ref').textContent = '#' + o.ref;
    $('yo-m-title').textContent = o.status === 'menunggu' ? 'Tidak jadi beli?' : 'Batalkan pesanan ini?';
    $('yo-m-info').textContent = 'Pembatalan diproses oleh admin Yarka. Setelah memilih alasan, WhatsApp akan terbuka dengan pesan pembatalan yang sudah terisi, tinggal tekan kirim.';
    [].forEach.call(modal.querySelectorAll('input[name="yo-alasan"]'), function (r) { r.checked = false; });
    $('yo-m-lain').value = ''; $('yo-m-lain-wrap').classList.add('hidden'); $('yo-m-err').classList.add('hidden');
    modal.classList.remove('hidden'); document.body.style.overflow = 'hidden';
    requestAnimationFrame(function () { modal.classList.add('is-open'); });
    setTimeout(function () { var f = modal.querySelector('input[name="yo-alasan"]'); if (f) f.focus(); }, 60);
  }
  function closeModal() {
    if (!modal) return; modal.classList.remove('is-open'); document.body.style.overflow = '';
    setTimeout(function () { modal.classList.add('hidden'); }, 250);
    if (lastFocus) lastFocus.focus();
  }
  function confirmCancel() {
    var r = modal.querySelector('input[name="yo-alasan"]:checked');
    if (!r) { $('yo-m-err').classList.remove('hidden'); return; }
    var alasan = r.value === 'Lainnya' ? ($('yo-m-lain').value.trim() || 'Lainnya') : r.value;
    var msg = 'Halo Yarka, saya ingin membatalkan pesanan #' + current.ref + '. Alasan: ' + alasan + '.';
    var url = 'https://wa.me/' + WA_ADMIN + '?text=' + encodeURIComponent(msg);
    closeModal();
    var w = window.open(url, '_blank', 'noopener'); if (!w) location.href = url;
    if (T) T.toast('Permintaan pembatalan dikirim lewat WhatsApp. Admin akan mengonfirmasi.');
  }

  function beliLagi(o) {
    if (!T) { location.href = 'katalog.html'; return; }
    var n = 0;
    o.items.forEach(function (it) {
      var p = P[it.id]; if (!p) return;
      var s = it.s || (p.sizes && p.sizes[0]);
      if (T.add(it.id, it.warna, s, it.q)) n++;
    });
    if (n) { T.toast(n + ' busana dari pesanan #' + o.ref + ' masuk keranjang.'); T.openCart(); }
    else location.href = 'katalog.html';
  }

  function init() {
    if (!Y || !$('yo-list')) return;
    render();
    document.addEventListener('click', function (e) {
      var f = e.target.closest('[data-filter]');
      if (f) { filter = f.getAttribute('data-filter'); render(); return; }
      var b = e.target.closest('[data-batal]'); if (b) { var o = find(b.getAttribute('data-batal')); if (o) openModal(o); return; }
      var iv = e.target.closest('[data-invoice]');
      if (iv) {
        var oi = find(iv.getAttribute('data-invoice'));
        if (!oi || !window.YarkaInvoice || iv.disabled) return;
        var label = iv.innerHTML;
        iv.disabled = true; iv.textContent = 'Membuat PDF…';
        window.YarkaInvoice.unduh(oi).then(function () {
          if (T) T.toast('E-Invoice #' + oi.ref + ' berhasil diunduh.');
        }, function () {
          if (T) T.toast('Maaf, e-invoice gagal dibuat. Periksa koneksi lalu coba lagi.');
        }).then(function () { iv.disabled = false; iv.innerHTML = label; });
        return;
      }
      var l = e.target.closest('[data-lagi]'); if (l) { var o2 = find(l.getAttribute('data-lagi')); if (o2) beliLagi(o2); return; }
      if (e.target.closest('[data-modal-close]')) closeModal();
    });
    $('yo-m-ok').addEventListener('click', confirmCancel);
    [].forEach.call(document.querySelectorAll('input[name="yo-alasan"]'), function (r) {
      r.addEventListener('change', function () {
        $('yo-m-err').classList.add('hidden');
        $('yo-m-lain-wrap').classList.toggle('hidden', r.value !== 'Lainnya' || !r.checked);
      });
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && modal && !modal.classList.contains('hidden')) closeModal(); });
    var lo = $('yo-logout'); if (lo) lo.addEventListener('click', function () { if (confirm('Apakah Ukhti yakin ingin keluar dari akun?')) location.href = 'index.html'; });
    if (T) T.onChange(function () { if ($('yo-stat-wish')) $('yo-stat-wish').textContent = T.wishList().length; });
  }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
})();
