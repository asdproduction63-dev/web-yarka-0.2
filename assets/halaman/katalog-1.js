// Dipindah dari <script> inline (agar lolos Content-Security-Policy). Dipakai di: katalog.html
(function(){
  var grid=document.querySelector('[data-category]')&&document.querySelector('[data-category]').parentElement;
  var cards=[].slice.call(document.querySelectorAll('[data-category]'));
  cards.forEach(function(c,i){c.dataset.idx=i;});
  var tabs=[].slice.call(document.querySelectorAll('[data-filter]'));
  var fams=[].slice.call(document.querySelectorAll('[data-family]'));
  var sizes=[].slice.call(document.querySelectorAll('[data-size]'));
  var bahan=[].slice.call(document.querySelectorAll('[data-bahan-filter]'));
  var slider=document.getElementById('price-slider'), priceLbl=document.getElementById('price-max-display');
  var sort=document.getElementById('sort-select');
  var names={"abaya":"Abaya","set":"Set","bergo-tali":"Bergo Tali","pashmina-instan":"Pashmina Instan","khimar":"Khimar","french-khimar":"French Khimar","khimar-segi-empat":"Khimar Segi Empat","niqab-cadar":"Niqab & Cadar"}, famNames={"hitam":"Hitam","abu":"Abu-abu","krem":"Krem & Sand","cokelat":"Cokelat","oranye":"Terracotta","pink":"Pink","ungu":"Ungu","biru":"Biru & Navy","hijau":"Hijau & Sage"};
  var MAXP=Math.max.apply(null,[].map.call(document.querySelectorAll('[data-price]'),function(c){return +c.dataset.price||0}).concat([700000]));
  var S={cat:'semua',fam:null,size:null,bahan:[],max:MAXP,sort:'newest'};
  var empty=null;
  function rp(n){return 'Rp'+n.toLocaleString('id-ID');}
  function setOn(el,on){['bg-primary','text-on-primary','shadow-sm'].forEach(function(k){el.classList.toggle(k,on)});['bg-surface-container','bg-surface-container-low','text-on-surface-variant'].forEach(function(k){el.classList.toggle(k,!on)});}
  function apply(){
    var shown=0;
    cards.forEach(function(c){
      var ok=(S.cat==='semua'||c.dataset.category===S.cat||(S.cat==='khimar'&&/khimar/.test(c.dataset.category)))
        &&(!S.fam||(' '+c.dataset.colors+' ').indexOf(' '+S.fam+' ')>-1)
        &&(!S.size||(' '+c.dataset.sizes+' ').indexOf(' '+S.size+' ')>-1)
        &&(!S.bahan.length||S.bahan.indexOf(c.dataset.bahan)>-1)
        &&(+c.dataset.price<=S.max);
      c.style.display=ok?'':'none'; if(ok)shown++;
      if(window.YarkaKartu&&c.dataset.famShown!==String(S.fam)){c.dataset.famShown=String(S.fam);window.YarkaKartu.pilihKeluarga(c,S.fam);}
    });
    var arr=cards.slice().sort(function(a,b){
      if(S.sort==='price-asc')return a.dataset.price-b.dataset.price||a.dataset.idx-b.dataset.idx;
      if(S.sort==='price-desc')return b.dataset.price-a.dataset.price||a.dataset.idx-b.dataset.idx;
      if(S.sort==='name')return a.querySelector('h3').textContent.localeCompare(b.querySelector('h3').textContent);
      return a.dataset.urut-b.dataset.urut||a.dataset.idx-b.dataset.idx;
    });
    arr.forEach(function(c){grid.appendChild(c);});
    tabs.forEach(function(t){setOn(t,t.dataset.filter===S.cat);});
    sizes.forEach(function(b){setOn(b,b.dataset.size===S.size);});
    fams.forEach(function(b){b.classList.toggle('ring-1',b.dataset.family===S.fam);b.classList.toggle('ring-secondary',b.dataset.family===S.fam);});
    var parts=[S.cat==='semua'?'Semua Koleksi':names[S.cat]];
    if(S.fam)parts.push(famNames[S.fam]);
    if(S.size)parts.push('Ukuran '+(S.size==='ALL'?'All Size':S.size.length>2?S.size.charAt(0)+S.size.slice(1).toLowerCase():S.size));
    if(S.bahan.length)parts.push(S.bahan.length+' bahan');
    if(S.max<MAXP)parts.push('≤ '+rp(S.max));
    var lbl=document.getElementById('active-filter-label');if(lbl)lbl.textContent=parts.join(' • ');
    var rc=document.getElementById('result-count');if(rc)rc.textContent='Menampilkan '+shown+' produk';
    var rt=document.getElementById('result-total');if(rt)rt.textContent=shown;
    if(!empty){empty=document.createElement('div');empty.className='col-span-full py-16 text-center font-body-md text-body-md text-on-surface-variant';}
    grid.appendChild(empty);
    empty.style.display=shown?'none':'';
    empty.innerHTML=(S.cat!=='semua'&&!cards.some(function(c){return c.dataset.category===S.cat||(S.cat==='khimar'&&/khimar/.test(c.dataset.category))}))
      ?'Produk kategori ini segera hadir di website.<br>Lihat koleksi lengkapnya di <a class="text-secondary underline" href="https://t.me/yarkaindonesia" target="_blank" rel="noopener">Telegram Yarka</a>.'
      :'Tidak ada produk yang cocok dengan filter ini. <button type="button" class="text-secondary underline" id="empty-reset">Reset filter</button>';
    var er=document.getElementById('empty-reset');if(er)er.onclick=reset;
  }
  function reset(){S={cat:'semua',fam:null,size:null,bahan:[],max:MAXP,sort:S.sort};bahan.forEach(function(b){b.checked=false});if(slider){slider.value=MAXP;priceLbl.textContent='s/d '+rp(MAXP);}apply();}
  tabs.forEach(function(t){t.addEventListener('click',function(){S.cat=t.dataset.filter;apply();});});
  fams.forEach(function(b){b.addEventListener('click',function(){S.fam=S.fam===b.dataset.family?null:b.dataset.family;apply();});});
  sizes.forEach(function(b){b.addEventListener('click',function(){S.size=S.size===b.dataset.size?null:b.dataset.size;apply();});});
  bahan.forEach(function(b){b.addEventListener('change',function(){S.bahan=bahan.filter(function(x){return x.checked}).map(function(x){return x.value});apply();});});
  if(slider)slider.addEventListener('input',function(){S.max=+slider.value;priceLbl.textContent='s/d '+rp(S.max);apply();});
  if(sort)sort.addEventListener('change',function(){S.sort=sort.value;apply();});
  var r=document.getElementById('reset-all-filters');if(r)r.addEventListener('click',reset);
  var k=new URLSearchParams(location.search).get('k');if(k&&names[k])S.cat=k;
  apply();
})();
