// Native swipe scrolling stays available without JavaScript.
document.querySelectorAll('.film-shelf').forEach(shelf=>{
  const track=shelf.querySelector('.film-track');
  const arrows=[...shelf.querySelectorAll('.shelf-arrow')];
  const update=()=>{
    const end=track.scrollWidth-track.clientWidth;
    arrows.forEach(button=>{button.hidden=end<2;button.disabled=Number(button.dataset.direction)<0?track.scrollLeft<2:track.scrollLeft>=end-2});
  };
  arrows.forEach(button=>button.addEventListener('click',()=>{
    track.scrollBy({left:Number(button.dataset.direction)*track.clientWidth*.85,behavior:matchMedia('(prefers-reduced-motion: reduce)').matches?'instant':'smooth'});
  }));
  track.addEventListener('scroll',update,{passive:true});
  new ResizeObserver(update).observe(track);
  update();
});
// Keep keyboard navigation within the active player; Escape is handled by the page.
document.getElementById('reelModal').addEventListener('keydown',event=>{
  if(event.key!=='Tab')return;
  const focusable=[...event.currentTarget.querySelectorAll('button, iframe, video[controls], a[href]')];
  const first=focusable[0],last=focusable[focusable.length-1];
  if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus()}
  else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus()}
});
