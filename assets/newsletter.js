// Form "Berlangganan" (footer & beranda): simpan email ke Supabase lewat fungsi daftar_newsletter().
// Form ditandai dengan atribut data-newsletter="<sumber>".
(function () {
  var RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  function kirim(email, sumber) {
    var cfg = window.YARKA_SUPABASE;
    if (!cfg || !cfg.url || !cfg.anonKey) return Promise.resolve(false);
    var headers = { 'Content-Type': 'application/json', apikey: cfg.anonKey };
    if (!/^sb_/.test(cfg.anonKey)) headers.Authorization = 'Bearer ' + cfg.anonKey;
    return fetch(cfg.url.replace(/\/+$/, '') + '/rest/v1/rpc/daftar_newsletter', {
      method: 'POST', headers: headers,
      body: JSON.stringify({ p_email: email, p_sumber: sumber || null })
    }).then(function (r) { return r.ok; }, function () { return false; });
  }

  function pesan(form, teks, gagal) {
    var el = form.nextElementSibling;
    if (!el || !el.hasAttribute('data-nl-status')) {
      el = document.createElement('p');
      el.setAttribute('data-nl-status', '');
      el.setAttribute('role', 'status');
      el.className = 'font-body-sm text-body-sm mt-2';
      form.parentNode.insertBefore(el, form.nextSibling);
    }
    el.textContent = teks;
    el.style.color = gagal ? '#ba1a1a' : '#4f6b4a';
  }

  document.addEventListener('submit', function (e) {
    var form = e.target;
    if (!form || !form.hasAttribute || !form.hasAttribute('data-newsletter')) return;
    e.preventDefault();
    var input = form.querySelector('input[type="email"]'), btn = form.querySelector('button');
    var email = (input && input.value || '').trim().toLowerCase();
    if (!RE.test(email)) { pesan(form, 'Mohon isi alamat email yang valid.', true); if (input) input.focus(); return; }
    var label = btn ? btn.textContent : '';
    if (btn) { btn.disabled = true; btn.textContent = 'Mengirim…'; }
    kirim(email, form.getAttribute('data-newsletter')).then(function (ok) {
      if (btn) { btn.disabled = false; btn.textContent = label; }
      if (ok) { input.value = ''; pesan(form, 'Terima kasih! Anda akan menerima kabar koleksi terbaru Yarka.'); }
      else pesan(form, 'Maaf, pendaftaran belum berhasil. Silakan coba lagi sebentar lagi.', true);
    });
  });
})();
