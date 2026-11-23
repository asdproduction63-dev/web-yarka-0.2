// Dipindah dari <script> inline (agar lolos Content-Security-Policy). Dipakai di: ulasan-terkirim.html
(function () {
  var DEF = { rating: 5, suka: ['Proses Checkout Cepat', 'Desain Butik Elegan', 'Kualitas Bahan Terpercaya'], catatan: '' };
  var LABEL = { 1: 'Perlu Peningkatan', 2: 'Cukup Baik', 3: 'Baik', 4: 'Memuaskan', 5: 'Sangat Memuaskan' };
  var u = null, o = null;
  try { u = JSON.parse(localStorage.getItem('yarka_ulasan') || 'null'); } catch (e) {}
  try { o = JSON.parse(localStorage.getItem('yarka_order') || 'null'); } catch (e) {}
  u = u || DEF;
  var r = Math.min(5, Math.max(1, parseInt(u.rating, 10) || 5));
  var ref = (u.ref || (o && o.ref ? '#' + o.ref : '')).trim();
  if (ref) document.getElementById('ulasan-ref').textContent = ref.charAt(0) === '#' ? ref : '#' + ref;

  var stars = document.getElementById('ulasan-stars');
  stars.setAttribute('aria-label', r + ' dari 5 bintang');
  for (var i = 1; i <= 5; i++) {
    var s = document.createElement('span');
    s.className = 'material-symbols-outlined text-[22px] ' + (i <= r ? 'text-secondary' : 'text-outline-variant');
    s.style.fontVariationSettings = "'FILL' " + (i <= r ? 1 : 0);
    s.setAttribute('aria-hidden', 'true');
    s.textContent = 'star';
    stars.appendChild(s);
  }
  document.getElementById('ulasan-label').textContent = LABEL[r] + ' (' + r + '/5)';

  var suka = Array.isArray(u.suka) ? u.suka : [];
  var ul = document.getElementById('ulasan-suka');
  if (!suka.length) document.getElementById('ulasan-suka-wrap').classList.add('hidden');
  suka.forEach(function (t) {
    var li = document.createElement('li');
    li.className = 'px-3 py-1.5 rounded-full bg-surface-container-lowest border border-outline-variant/70 font-label-caps-sm text-label-caps-sm uppercase tracking-wide text-on-surface-variant';
    li.textContent = t;
    ul.appendChild(li);
  });

  if (u.catatan) {
    var q = document.getElementById('ulasan-catatan');
    q.textContent = '“' + u.catatan + '”';
    q.classList.remove('hidden');
  }
})();
