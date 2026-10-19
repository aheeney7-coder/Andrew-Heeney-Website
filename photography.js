const navToggle=document.getElementById('navToggle'),navLinks=document.getElementById('navLinks');
navToggle.addEventListener('click',()=>{const open=navLinks.classList.toggle('open');navToggle.setAttribute('aria-expanded',String(open));navToggle.setAttribute('aria-label',open?'Close menu':'Open menu')});
const photos=JSON.parse(document.getElementById('photoData').textContent);
const filters=[...document.querySelectorAll('[data-filter]')],cards=[...document.querySelectorAll('[data-category]')];
const viewer=document.getElementById('photoViewer'),image=document.getElementById('viewerImage');
const previous=document.getElementById('previousPhoto'),next=document.getElementById('nextPhoto');
let visible=photos.map((_,i)=>i),current=0,opener=null;
function filterPhotos(category){
 const selected=filters.find(b=>b.dataset.filter===category)||filters[0];category=selected.dataset.filter;
 filters.forEach(b=>{const active=b===selected;b.classList.toggle('active',active);b.setAttribute('aria-pressed',String(active))});
 cards.forEach(card=>card.hidden=category!=='all'&&card.dataset.category!==category);
 visible=photos.map((p,i)=>category==='all'||p.category===category?i:-1).filter(i=>i!==-1);
 document.getElementById('photoCount').textContent=visible.length+' photograph'+(visible.length===1?'':'s')+' · '+selected.childNodes[0].textContent.trim();
}
filters.forEach(button=>button.addEventListener('click',()=>{filterPhotos(button.dataset.filter);history.replaceState(null,'','#'+button.dataset.filter)}));
function showPhoto(index){
 current=index;const photo=photos[index];image.src=photo.src;image.alt=photo.alt;
 document.getElementById('viewerCaption').textContent=photo.title;
 const position=visible.indexOf(index);document.getElementById('viewerPosition').textContent=(position+1)+' / '+visible.length;
 previous.disabled=position===0;next.disabled=position===visible.length-1;
}
document.querySelectorAll('[data-photo]').forEach(link=>link.addEventListener('click',event=>{
 if(!viewer.showModal)return;event.preventDefault();opener=link;showPhoto(Number(link.dataset.photo));viewer.showModal();document.body.style.overflow='hidden';document.getElementById('closePhoto').focus();
}));
function movePhoto(delta){const position=visible.indexOf(current)+delta;if(position>=0&&position<visible.length)showPhoto(visible[position])}
previous.addEventListener('click',()=>movePhoto(-1));next.addEventListener('click',()=>movePhoto(1));
document.getElementById('closePhoto').addEventListener('click',()=>viewer.close());
viewer.addEventListener('close',()=>{document.body.style.overflow='';image.removeAttribute('src');opener?.focus()});
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close()}});
viewer.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();movePhoto(1)}if(event.key==='ArrowLeft'){event.preventDefault();movePhoto(-1)}});
addEventListener('hashchange',()=>filterPhotos(location.hash.slice(1)));filterPhotos(location.hash.slice(1));
