// Dipindah dari <script> inline (agar lolos Content-Security-Policy). Dipakai di: index.html
(function(){var box=document.getElementById('spot-swatches');if(!box)return;var img=document.getElementById('spot-img'),lbl=document.getElementById('spot-warna'),cta=document.getElementById('spot-cta');
[].forEach.call(box.querySelectorAll('.yk-sw'),function(b){b.addEventListener('click',function(){
[].forEach.call(box.querySelectorAll('.yk-sw'),function(x){x.classList.toggle('is-on',x===b);});
img.style.opacity='.4';img.onload=function(){img.style.opacity='1';};img.src=b.getAttribute('data-img');img.alt='Hawa Abaya warna '+b.getAttribute('data-warna');setTimeout(function(){img.style.opacity='1';},600);
lbl.textContent=b.getAttribute('data-warna');cta.href='produk.html?p=hawa&w='+b.getAttribute('data-warna').toLowerCase().replace(/[^a-z0-9]+/g,'-');});});})();
