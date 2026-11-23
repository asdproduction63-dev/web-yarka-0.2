// Dipindah dari <script> inline (agar lolos Content-Security-Policy). Dipakai di: pembayaran.html
(function () {
    // Rekening resmi Yarka
    var BANKS = {
      bca: { name: 'BCA', full: 'Bank Central Asia (BCA)', code: '014', no: '5475153739', holder: 'Nur’aini' },
      mandiri: { name: 'Mandiri', full: 'Bank Mandiri', code: '008', no: '1310004079044', holder: 'Nur’Aini' },
      bsi: { name: 'BSI', full: 'Bank Syariah Indonesia (BSI)', code: '451', no: '7234935148', holder: 'Nur’Aini' }
    };
    var current = 'bca';
    function $(id) { return document.getElementById(id); }
    function all(sel, fn) { Array.prototype.forEach.call(document.querySelectorAll(sel), fn); }
    function setText(sel, val) { all(sel, function (el) { el.textContent = val; }); }
    // 4 digit terakhir, sisanya per 3 digit: 547 515 3739
    function group(no) {
      var head = no.slice(0, -4), tail = no.slice(-4), out = [];
      for (var i = 0; i < head.length; i += 3) out.push(head.slice(i, i + 3));
      out.push(tail);
      return out.join(' ');
    }

    var toast = $('toast-notification'), toastMessage = $('toast-message'), toastTimer;
    function showToast(msg) {
      if (!toast) return;
      toastMessage.textContent = msg;
      toast.classList.remove('translate-y-24', 'opacity-0');
      clearTimeout(toastTimer);
      toastTimer = setTimeout(function () { toast.classList.add('translate-y-24', 'opacity-0'); }, 3500);
    }

    // Salin ke papan klip (dengan cadangan untuk browser lama / file://)
    function fallbackCopy(text) {
      var ta = document.createElement('textarea');
      ta.value = text; ta.setAttribute('readonly', '');
      ta.style.position = 'fixed'; ta.style.top = '-1000px'; ta.style.opacity = '0';
      document.body.appendChild(ta); ta.select();
      var ok = false; try { ok = document.execCommand('copy'); } catch (e) {}
      document.body.removeChild(ta);
      return ok ? Promise.resolve() : Promise.reject();
    }
    function copy(text) {
      if (navigator.clipboard && window.isSecureContext) {
        return navigator.clipboard.writeText(text).catch(function () { return fallbackCopy(text); });
      }
      return fallbackCopy(text);
    }
    function bindCopy(btnId, statusId, getText, okMsg) {
      var btn = $(btnId), status = $(statusId), t;
      if (!btn) return;
      btn.addEventListener('click', function () {
        var text = getText();
        copy(text).then(function () {
          status.textContent = 'Tersalin ✓';
          showToast(okMsg(text));
        }, function () {
          status.textContent = 'Gagal menyalin, mohon catat manual';
        });
        clearTimeout(t); t = setTimeout(function () { status.textContent = ''; }, 2500);
      });
    }
    function totalText() { var el = $('transfer-amount'); return el ? el.textContent.trim() : ''; }
    bindCopy('copy-acc-btn', 'copy-acc-status', function () { return BANKS[current].no; },
      function (t) { return 'No. rekening ' + BANKS[current].name + ' ' + t + ' disalin.'; });
    bindCopy('copy-amount-btn', 'copy-amount-status', function () { return totalText().replace(/[^\d]/g, ''); },
      function () { return 'Nominal ' + totalText() + ' disalin.'; });

    // Pilihan metode & bank
    var ACTIVE = ['border-secondary', 'bg-surface-container-low', 'shadow-sm'], IDLE = ['border-outline-variant', 'bg-surface-container-lowest'];
    function mark(el, on) {
      ACTIVE.forEach(function (c) { el.classList.toggle(c, on); });
      IDLE.forEach(function (c) { el.classList.toggle(c, !on); });
    }
    function renderBank() {
      var b = BANKS[current];
      setText('.js-bank-name', b.name);
      setText('.js-bank-full', b.full);
      setText('.js-bank-code', b.code);
      setText('.js-acc-raw', b.no);
      setText('.js-acc-holder', b.holder);
      $('acc-number').textContent = group(b.no);
      $('acc-holder').textContent = b.holder;
      $('copy-acc-status').textContent = '';
      all('.bank-option', function (el) {
        var on = el.getAttribute('data-bank') === current;
        el.classList.toggle('border-secondary', on);
        el.classList.toggle('bg-surface-container-lowest', on);
        el.classList.toggle('ring-1', on);
        el.classList.toggle('ring-secondary', on);
        el.classList.toggle('border-outline-variant', !on);
        el.classList.toggle('bg-surface-container', !on);
      });
    }
    function renderMethod() {
      var m = (document.querySelector('input[name="payment_method"]:checked') || {}).value || 'transfer';
      all('.pay-option', function (el) { mark(el, el.getAttribute('data-method') === m); });
      $('bank-choices').classList.toggle('hidden', m !== 'transfer');
      $('panel-transfer').classList.toggle('hidden', m !== 'transfer');
      $('panel-transfer').classList.toggle('flex', m === 'transfer');
      $('panel-qris').classList.toggle('hidden', m !== 'qris');
      $('panel-qris').classList.toggle('flex', m === 'qris');
    }
    all('input[name="payment_method"]', function (r) { r.addEventListener('change', renderMethod); });
    all('input[name="bank"]', function (r) {
      r.addEventListener('change', function () { current = r.value; renderBank(); });
      // fokus keyboard terlihat pada kartu bank
      r.addEventListener('focus', function () { r.parentElement.classList.add('outline', 'outline-2', 'outline-offset-2', 'outline-secondary'); });
      r.addEventListener('blur', function () { r.parentElement.classList.remove('outline', 'outline-2', 'outline-offset-2', 'outline-secondary'); });
    });
    var checkedBank = document.querySelector('input[name="bank"]:checked');
    if (checkedBank) current = checkedBank.value;
    renderBank();
    renderMethod();

    // Tautan WhatsApp: isi nomor pesanan & total saat diklik (setelah data pesanan dimuat)
    all('.js-wa', function (a) {
      a.addEventListener('click', function () {
        var refEl = $('order-ref'), ref = refEl ? refEl.textContent.trim().replace(/^#/, '') : '';
        var msg = (a.getAttribute('data-wa') || 'Halo Yarka, saya ingin konfirmasi pembayaran pesanan {ref}.')
          .replace('{ref}', ref).replace('{total}', totalText());
        if ($('panel-transfer') && !$('panel-transfer').classList.contains('hidden') && /transfer/i.test(msg)) msg += ' (Transfer ke ' + BANKS[current].name + ')';
        a.href = 'https://wa.me/6285282437954?text=' + encodeURIComponent(msg);
      });
    });

    // Ringkasan item: tampil/sembunyikan
    var toggleItemsBtn = $('toggle-items-btn'), orderItemsWrapper = $('order-items-wrapper');
    if (toggleItemsBtn && orderItemsWrapper) {
      toggleItemsBtn.addEventListener('click', function () {
        var hidden = orderItemsWrapper.classList.toggle('hidden');
        toggleItemsBtn.textContent = hidden ? 'Lihat Item' : 'Sembunyikan';
        toggleItemsBtn.setAttribute('aria-expanded', String(!hidden));
      });
    }

    // Tombol konfirmasi (navigasi ke halaman berhasil diatur assets/nav.js)
    var confirmBtn = $('confirm-payment-btn');
    if (confirmBtn) confirmBtn.addEventListener('click', function () {
      showToast('Terima kasih! Admin akan memverifikasi pembayaran Anda.');
    });
  })();
