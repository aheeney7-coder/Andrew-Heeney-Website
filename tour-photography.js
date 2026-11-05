(()=>{
const photos=JSON.parse(document.getElementById('tourPhotoData').textContent);
const viewer=document.getElementById('photoViewer'),image=document.getElementById('viewerImage');
const previous=document.getElementById('previousPhoto'),next=document.getElementById('nextPhoto');
let visible=photos.map((_,i)=>i),current=0,opener=null;
function showPhoto(index){
 current=index;const photo=photos[index];image.src=photo.src;image.alt=photo.alt;
 document.getElementById('viewerCaption').textContent=photo.title;
 const position=visible.indexOf(index);document.getElementById('viewerPosition').textContent=(position+1)+' / '+visible.length;
 previous.disabled=position===0;next.disabled=position===visible.length-1;
}
document.querySelectorAll('[data-tour-photo]').forEach(link=>link.addEventListener('click',event=>{
 if(!viewer.showModal)return;
 event.preventDefault();
 opener=link;
 const collection = link.closest('.artist-folder');
 visible = Array.from(collection.querySelectorAll('[data-tour-photo]'), photoLink => Number(photoLink.dataset.tourPhoto));
 showPhoto(Number(link.dataset.tourPhoto));viewer.showModal();document.body.style.overflow='hidden';document.getElementById('closePhoto').focus();
}));
function movePhoto(delta){const position=visible.indexOf(current)+delta;if(position>=0&&position<visible.length)showPhoto(visible[position])}
previous.addEventListener('click',()=>movePhoto(-1));next.addEventListener('click',()=>movePhoto(1));
document.getElementById('closePhoto').addEventListener('click',()=>viewer.close());
viewer.addEventListener('close',()=>{document.body.style.overflow='';image.removeAttribute('src');opener?.focus()});
viewer.addEventListener('click',event=>{if(event.target===viewer){const r=viewer.getBoundingClientRect();if(event.clientX<r.left||event.clientX>r.right||event.clientY<r.top||event.clientY>r.bottom)viewer.close()}});
viewer.addEventListener('keydown',event=>{if(event.key==='ArrowRight'){event.preventDefault();movePhoto(1)}if(event.key==='ArrowLeft'){event.preventDefault();movePhoto(-1)}});

})();
