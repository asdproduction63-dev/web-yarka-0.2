// Dipindah dari <script> inline (agar lolos Content-Security-Policy). Dipakai di: index.html
(function(){var g=document.getElementById('yw-grid'),more=document.getElementById('yw-more'),box=document.getElementById('yw-box'),im=document.getElementById('yw-img'),cap=document.getElementById('yw-cap');if(!g)return;
var items=[].slice.call(g.querySelectorAll('.yw-item')),cur=0;
more.addEventListener('click',function(){var h=g.querySelectorAll('[data-more]');var buka=h.length&&h[0].hidden;[].forEach.call(h,function(e){e.hidden=!buka});more.lastElementChild.textContent=buka?'Tampilkan Lebih Sedikit':'Lihat '+h.length+' Foto Lainnya';if(!buka)g.scrollIntoView({behavior:'smooth',block:'start'});});
function show(i){cur=(i+items.length)%items.length;var img=items[cur].querySelector('img');im.src=img.src;im.alt=img.alt;cap.textContent=img.alt;}
function open(i){show(i);box.classList.remove('hidden');box.classList.add('flex');document.body.style.overflow='hidden';}
function close(){box.classList.add('hidden');box.classList.remove('flex');document.body.style.overflow='';}
items.forEach(function(b,i){b.addEventListener('click',function(){open(i)})});
box.addEventListener('click',function(e){var a=e.target.closest('[data-yw]');if(a){var t=a.getAttribute('data-yw');if(t==='close')close();else show(cur+(t==='next'?1:-1));}else if(e.target===box)close();});
document.addEventListener('keydown',function(e){if(box.classList.contains('hidden'))return;if(e.key==='Escape')close();if(e.key==='ArrowRight')show(cur+1);if(e.key==='ArrowLeft')show(cur-1);});
})();
