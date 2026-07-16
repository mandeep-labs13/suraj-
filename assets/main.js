// Scroll reveal
if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  const io = new IntersectionObserver((entries)=>{
    entries.forEach((e,i)=>{
      if(e.isIntersecting){
        setTimeout(()=> e.target.classList.add('in'), i*70);
        io.unobserve(e.target);
      }
    });
  }, {threshold:.15, rootMargin:'0px 0px -60px 0px'});
  document.querySelectorAll('.reveal').forEach(el=> io.observe(el));
} else {
  document.querySelectorAll('.reveal').forEach(el=> el.classList.add('in'));
}

// Gallery lightbox (Portfolio page)
(function(){
  const lb = document.getElementById('lightbox');
  if(!lb) return;
  const lbImg = document.getElementById('lightboxImg');
  document.querySelectorAll('.g-item img').forEach(img=>{
    img.addEventListener('click', ()=>{
      lbImg.src = img.src.replace('w=800','w=1600');
      lbImg.alt = img.alt;
      lb.classList.add('open');
    });
  });
  function closeLb(){ lb.classList.remove('open'); lbImg.src=''; }
  const closeBtn = document.getElementById('lightboxClose');
  if(closeBtn) closeBtn.addEventListener('click', closeLb);
  lb.addEventListener('click', (e)=>{ if(e.target === lb) closeLb(); });
  document.addEventListener('keydown', (e)=>{ if(e.key === 'Escape') closeLb(); });
})();

// Gallery category filter (Portfolio page)
(function(){
  const row = document.getElementById('filterRow');
  if(!row) return;
  const items = document.querySelectorAll('.g-item');
  row.querySelectorAll('button').forEach(btn=>{
    btn.addEventListener('click', ()=>{
      row.querySelectorAll('button').forEach(b=> b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.dataset.filter;
      items.forEach(item=>{
        item.classList.toggle('hidden', cat !== 'all' && item.dataset.cat !== cat);
      });
    });
  });
})();

// Showreel play-on-click (Portfolio / Home)
document.querySelectorAll('.showreel').forEach(reel=>{
  const video = reel.querySelector('video');
  if(!video) return;
  reel.addEventListener('click', ()=>{
    if(video.paused){ video.muted = false; video.play(); reel.classList.add('playing'); }
    else { video.pause(); reel.classList.remove('playing'); }
  });
});

// Hero background video sound toggle (Home)
(function(){
  const btn = document.getElementById('soundToggle');
  const vid = document.getElementById('heroVideo');
  if(!btn || !vid) return;
  btn.addEventListener('click', ()=>{
    vid.muted = !vid.muted;
    btn.textContent = vid.muted ? '🔇' : '🔊';
  });
})();

// Mobile nav
(function(){
  const toggle = document.getElementById('navToggle');
  const panel = document.getElementById('mobileNav');
  const close = document.getElementById('mobileNavClose');
  if(!toggle || !panel) return;
  toggle.addEventListener('click', ()=> panel.classList.add('open'));
  if(close) close.addEventListener('click', ()=> panel.classList.remove('open'));
  panel.querySelectorAll('a').forEach(a=> a.addEventListener('click', ()=> panel.classList.remove('open')));
})();

// Theme toggle (persisted)
const themeToggle = document.getElementById('themeToggle');
if(themeToggle){
  themeToggle.setAttribute('aria-pressed', String(document.documentElement.classList.contains('light')));
  themeToggle.textContent = document.documentElement.classList.contains('light') ? '◑' : '◐';
  themeToggle.addEventListener('click', ()=>{
    const isLight = document.documentElement.classList.toggle('light');
    themeToggle.setAttribute('aria-pressed', String(isLight));
    themeToggle.textContent = isLight ? '◑' : '◐';
    try{ localStorage.setItem('theme', isLight ? 'light' : 'dark'); }catch(e){}
  });
}
