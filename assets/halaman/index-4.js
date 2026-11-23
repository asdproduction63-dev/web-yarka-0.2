// Dipindah dari <script> inline (agar lolos Content-Security-Policy). Dipakai di: index.html
(function(){var b=[].slice.call(document.querySelectorAll('[data-home-filter]')),c=[].slice.call(document.querySelectorAll('[data-category]'));
var on="px-4 py-1.5 rounded-full bg-primary text-on-primary font-label-caps-sm text-label-caps-sm uppercase tracking-wider".split(' '),off="px-4 py-1.5 rounded-full bg-surface-container text-on-surface-variant hover:text-primary font-label-caps-sm text-label-caps-sm uppercase tracking-wider transition-colors".split(' ');
b.forEach(function(x){x.addEventListener('click',function(){var k=x.dataset.homeFilter;
c.forEach(function(d){d.style.display=(k==='semua'||d.dataset.category===k)?'':'none'});
b.forEach(function(y){var a=y===x;(a?off:on).forEach(function(z){y.classList.remove(z)});(a?on:off).forEach(function(z){y.classList.add(z)})});});});})();
