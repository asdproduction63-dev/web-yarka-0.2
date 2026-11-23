// Pengganti atribut onclick="..." (dilarang oleh Content-Security-Policy).
// <button data-on="namaFungsi" data-args='["a",1]' data-this> memanggil window.namaFungsi(this?, "a", 1).
// Seperti onclick asli: semua elemen ber-data-on dari target ke atas ikut dipanggil.
(function () {
  document.addEventListener('click', function (e) {
    for (var el = e.target; el && el !== document; el = el.parentNode) {
      if (!el.getAttribute || !el.hasAttribute('data-on')) continue;
      var fn = window[el.getAttribute('data-on')];
      if (typeof fn !== 'function') continue;
      var args = [];
      try { args = JSON.parse(el.getAttribute('data-args') || '[]'); } catch (er) {}
      if (el.hasAttribute('data-this')) args.unshift(el);
      fn.apply(el, args);
    }
  });
})();
