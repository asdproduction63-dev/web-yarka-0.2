// Pilihan "Bayar Otomatis" di pembayaran.html: Virtual Account / QRIS lewat payment gateway
// Komerce (RajaOngkir). Server: api/metode.js, api/bayar.js, api/cek-bayar.js.
(function () {
  function $(id) { return document.getElementById(id); }
  if (!$('panel-otomatis') || !window.fetch) return;

  var o; try { o = JSON.parse(localStorage.getItem('yarka_order') || 'null'); } catch (e) { o = null; }
  var Y = window.YARKA;
  var opt = $('opt-otomatis'), list = $('auto-channels');
  var pilihan = null;      // { tipe: 'va'|'qris', kode, nama }
  var pollTimer = null, expTimer = null, aktif = null;

  function rp(n) { return Y ? Y.rp(n) : 'Rp' + Number(n).toLocaleString('id-ID'); }
  function esc(s) { return String(s == null ? '' : s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;'); }
  function show(el, on, disp) { if (!el) return; el.classList.toggle('hidden', !on); if (disp) el.classList.toggle(disp, on); }
  function err(msg) { var e = $('auto-error'); e.textContent = msg || ''; show(e, !!msg); }
  function nonaktif(msg) {
    list.innerHTML = '<p class="col-span-3 font-body-sm text-body-sm text-on-surface-variant">' + esc(msg) + '</p>';
    $('auto-create').disabled = true;
  }

  // Tanpa data pesanan (mis. halaman dibuka langsung), pembayaran otomatis tidak bisa dibuat.
  if (!o || !o.ref || !o.total) { nonaktif('Data pesanan tidak ditemukan. Silakan checkout ulang atau pilih transfer manual.'); return; }

  // ---------- daftar bank / QRIS ----------
  function renderPilihan() {
    [].forEach.call(list.querySelectorAll('.auto-option'), function (el) {
      var on = pilihan && el.getAttribute('data-kode') === pilihan.kode && el.getAttribute('data-tipe') === pilihan.tipe;
      el.classList.toggle('border-secondary', on);
      el.classList.toggle('bg-surface-container-lowest', on);
      el.classList.toggle('ring-1', on);
      el.classList.toggle('ring-secondary', on);
      el.classList.toggle('border-outline-variant', !on);
      el.classList.toggle('bg-surface-container', !on);
    });
    $('auto-title').textContent = pilihan ? (pilihan.tipe === 'qris' ? 'QRIS' : 'Virtual Account ' + pilihan.nama) : 'Pilih bank atau QRIS';
    $('auto-create').disabled = !pilihan;
  }
  fetch('/api/metode').then(function (r) { return r.json(); }).then(function (d) {
    var m = (d && d.metode) || [];
    m = m.filter(function (x) { return o.total >= x.min && (!x.max || o.total <= x.max); });
    if (!m.length) { nonaktif((d && d.error) || 'Pembayaran otomatis belum tersedia. Silakan pilih transfer manual.'); return; }
    m.sort(function (a, b) { return (a.tipe === 'qris' ? -1 : 0) - (b.tipe === 'qris' ? -1 : 0); });
    list.innerHTML = m.map(function (x, i) {
      var nama = x.tipe === 'qris' ? 'QRIS' : x.kode;
      return '<label class="auto-option relative flex flex-col items-center justify-center text-center min-h-[64px] px-2 py-2.5 rounded-lg border cursor-pointer transition-colors" data-tipe="' + x.tipe + '" data-kode="' + esc(x.kode) + '">' +
        '<input class="sr-only" name="auto_channel" type="radio" value="' + i + '">' +
        '<span class="font-body-md text-body-md font-bold text-primary tracking-wide">' + esc(nama) + '</span>' +
        '<span class="font-label-caps-sm text-label-caps-sm text-on-surface-variant uppercase">' + (x.tipe === 'qris' ? 'E-Wallet' : 'Virtual Acc.') + '</span></label>';
    }).join('');
    [].forEach.call(list.querySelectorAll('input[name="auto_channel"]'), function (r) {
      r.addEventListener('change', function () {
        var x = m[+r.value]; pilihan = { tipe: x.tipe, kode: x.kode, nama: x.tipe === 'qris' ? 'QRIS' : x.kode };
        renderPilihan();
        // Pilihan diganti setelah kode dibuat: tampilkan lagi tombol "Buat Kode"
        if (aktif && (aktif.metode !== pilihan.tipe || (aktif.bank || '') !== (pilihan.tipe === 'va' ? pilihan.kode : ''))) {
          show($('auto-start'), true, 'flex'); $('auto-create-label').textContent = 'Buat Kode Pembayaran';
        }
      });
      r.addEventListener('focus', function () { r.parentElement.classList.add('outline', 'outline-2', 'outline-offset-2', 'outline-secondary'); });
      r.addEventListener('blur', function () { r.parentElement.classList.remove('outline', 'outline-2', 'outline-offset-2', 'outline-secondary'); });
    });
    renderPilihan();
  }).catch(function () { nonaktif('Pembayaran otomatis belum tersedia. Silakan pilih transfer manual.'); });

  // ---------- buat kode pembayaran ----------
  function tampilkan(b) {
    aktif = b;
    show($('auto-start'), false, 'flex');
    show($('auto-result'), true, 'flex');
    var isVa = b.metode === 'va' && b.va;
    show($('auto-va'), !!isVa, 'flex');
    show($('auto-va-steps'), !!isVa);
    if (isVa) { $('auto-va-bank').textContent = b.bank || ''; $('auto-va-no').textContent = String(b.va); $('auto-copy-status').textContent = ''; }
    var qrBox = $('auto-qr-img');
    show($('auto-qr'), !!(b.qr || b.qr_img), 'flex');
    if (b.qr && window.qrcode) {
      var qr = window.qrcode(0, 'M'); qr.addData(String(b.qr)); qr.make();
      qrBox.innerHTML = qr.createSvgTag({ cellSize: 6, margin: 2, scalable: true, alt: 'Kode QRIS pesanan ' + o.ref });
    } else if (b.qr_img) {
      qrBox.innerHTML = ''; var img = new Image(); img.alt = 'Kode QRIS pesanan ' + o.ref; img.src = b.qr_img; img.className = 'w-full h-full object-contain'; qrBox.appendChild(img);
    }
    var link = $('auto-url');
    show(link, !!(b.url && !isVa && !b.qr), 'flex'); if (b.url) link.href = b.url;
    $('auto-amount').textContent = rp(b.total || o.total);
    $('auto-create-label').textContent = 'Buat Kode Baru';
    hitungMundur(b.kedaluwarsa);
    mulaiCek();
  }
  function hitungMundur(iso) {
    clearInterval(expTimer);
    var t = Date.parse(iso), el = $('auto-exp');
    if (!t) { el.textContent = ''; return; }
    var batas = new Date(t).toLocaleString('id-ID', { day: 'numeric', month: 'long', hour: '2-digit', minute: '2-digit' });
    function tick() {
      var s = Math.max(0, Math.round((t - Date.now()) / 1000));
      if (!s) {
        clearInterval(expTimer); el.textContent = 'Kode pembayaran sudah kedaluwarsa. Silakan buat kode baru.';
        show($('auto-start'), true, 'flex'); stopCek(); return;
      }
      var h = Math.floor(s / 3600), mnt = Math.floor(s % 3600 / 60), d = s % 60;
      el.textContent = 'Bayar sebelum ' + batas + ' WIB (sisa ' + (h ? h + ' jam ' : '') + mnt + ' menit' + (h ? '' : ' ' + d + ' detik') + ').';
    }
    tick(); expTimer = setInterval(tick, 1000);
  }
  $('auto-create').addEventListener('click', function () {
    if (!pilihan) return;
    var btn = $('auto-create'); btn.disabled = true; err('');
    $('auto-create-label').textContent = 'Membuat kode…';
    fetch('/api/bayar', {
      method: 'POST', headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ref: o.ref, metode: pilihan.tipe, bank: pilihan.tipe === 'va' ? pilihan.kode : null })
    }).then(function (r) { return r.json().catch(function () { return {}; }); }).then(function (d) {
      if (d.status === 'lunas') return lunas();
      if (!d.bayar) throw new Error(d.error || 'Kode pembayaran gagal dibuat. Silakan coba lagi.');
      tampilkan(d.bayar);
    }).catch(function (e) {
      err(e.message || 'Koneksi bermasalah. Silakan coba lagi.');
      $('auto-create-label').textContent = 'Buat Kode Pembayaran';
    }).then(function () { btn.disabled = !pilihan; });
  });

  // ---------- salin nomor VA ----------
  $('auto-copy-va').addEventListener('click', function () {
    var no = $('auto-va-no').textContent.replace(/\s/g, ''), st = $('auto-copy-status');
    var p = navigator.clipboard && window.isSecureContext ? navigator.clipboard.writeText(no) : Promise.reject();
    p.then(function () { st.textContent = 'Tersalin ✓'; }, function () { st.textContent = 'Mohon catat manual'; });
    setTimeout(function () { st.textContent = ''; }, 2500);
  });

  // ---------- cek status berkala ----------
  function stopCek() { clearTimeout(pollTimer); pollTimer = null; }
  function mulaiCek() { stopCek(); pollTimer = setTimeout(cek, 5000); }
  function cek(manual) {
    return fetch('/api/cek-bayar?ref=' + encodeURIComponent(o.ref)).then(function (r) { return r.json(); }).then(function (d) {
      if (d.status === 'lunas') return lunas();
      if (d.status === 'kedaluwarsa' || d.status === 'batal') {
        $('auto-status').textContent = 'Kode pembayaran sudah tidak berlaku. Silakan buat kode baru.';
        show($('auto-start'), true, 'flex'); stopCek(); return;
      }
      if (manual) $('auto-status').textContent = 'Pembayaran belum kami terima. Bila sudah membayar, tunggu 1–2 menit lalu cek lagi.';
      if (!document.hidden && aktif) pollTimer = setTimeout(cek, 6000);
    }).catch(function () { if (aktif) pollTimer = setTimeout(cek, 10000); });
  }
  $('auto-check').addEventListener('click', function () { stopCek(); cek(true); });
  document.addEventListener('visibilitychange', function () { if (!document.hidden && aktif && !pollTimer) cek(); });

  function lunas() {
    stopCek(); clearInterval(expTimer);
    show($('auto-start'), false, 'flex');
    $('auto-status-icon').textContent = 'check_circle';
    $('auto-status').textContent = 'Pembayaran diterima. Terima kasih! Mengalihkan…';
    try { o.lunas = true; o.metodeBayar = aktif ? (aktif.metode === 'qris' ? 'QRIS' : 'VA ' + aktif.bank) : 'Otomatis'; localStorage.setItem('yarka_order', JSON.stringify(o)); } catch (e) {}
    setTimeout(function () { location.href = 'pesanan-berhasil.html'; }, 1500);
  }

  if (opt) opt.addEventListener('change', function () { if (!aktif) err(''); });
})();
