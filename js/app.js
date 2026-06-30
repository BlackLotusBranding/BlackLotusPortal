document.addEventListener('DOMContentLoaded',()=>{
  const menuButton=document.querySelector('.mobile-menu');
  const links=document.querySelector('.links');
  if(menuButton&&links){menuButton.addEventListener('click',()=>links.classList.toggle('open'));}

  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

  const path=location.pathname;
  const current=path.split('/').pop()||'index.html';
  document.querySelectorAll('.links a').forEach(a=>{
    const href=a.getAttribute('href')||'';
    if(href.endsWith(current)||(current==='index.html'&&/index\.html$/.test(href))) a.classList.add('active');
  });

  if(matchMedia('(pointer:fine)').matches){
    document.addEventListener('pointermove',event=>{
      document.documentElement.style.setProperty('--x',event.clientX+'px');
      document.documentElement.style.setProperty('--y',event.clientY+'px');
    },{passive:true});

    document.querySelectorAll('.spotlight-card').forEach(card=>{
      card.addEventListener('pointermove',event=>{
        const rect=card.getBoundingClientRect();
        card.style.setProperty('--local-x',(event.clientX-rect.left)+'px');
        card.style.setProperty('--local-y',(event.clientY-rect.top)+'px');
      },{passive:true});
    });
  }

  const revealItems=document.querySelectorAll('.reveal');
  if('IntersectionObserver' in window){
    const obs=new IntersectionObserver(entries=>{
      entries.forEach(entry=>{ if(entry.isIntersecting){ entry.target.classList.add('in'); obs.unobserve(entry.target); } });
    },{threshold:.12});
    revealItems.forEach(item=>obs.observe(item));
  }else{ revealItems.forEach(item=>item.classList.add('in')); }

  const shell=document.querySelector('.carousel-shell');
  if(shell){
    const track=shell.querySelector('.carousel-track');
    const slides=[...shell.querySelectorAll('.slide')];
    const dots=[...shell.querySelectorAll('.dot')];
    let index=0;
    let timer;
    const show=n=>{
      index=(n+slides.length)%slides.length;
      track.style.transform=`translateX(${-index*100}%)`;
      dots.forEach((dot,k)=>dot.classList.toggle('active',k===index));
    };
    shell.querySelector('.next')?.addEventListener('click',()=>show(index+1));
    shell.querySelector('.prev')?.addEventListener('click',()=>show(index-1));
    dots.forEach((dot,k)=>dot.addEventListener('click',()=>show(k)));
    const play=()=>{ timer=setInterval(()=>show(index+1),5600); };
    const stop=()=>clearInterval(timer);
    shell.addEventListener('mouseenter',stop);
    shell.addEventListener('mouseleave',play);
    shell.addEventListener('focusin',stop);
    shell.addEventListener('focusout',play);
    let startX=0;
    shell.addEventListener('touchstart',e=>{ startX=e.touches[0].clientX; },{passive:true});
    shell.addEventListener('touchend',e=>{
      const dx=e.changedTouches[0].clientX-startX;
      if(Math.abs(dx)>45) show(index+(dx<0?1:-1));
    },{passive:true});
    show(0); play();
  }
});
