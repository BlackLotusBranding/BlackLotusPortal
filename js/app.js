document.addEventListener('DOMContentLoaded',()=>{
  const menuButton=document.querySelector('.mobile-menu');
  const links=document.querySelector('.links');
  if(menuButton&&links){menuButton.addEventListener('click',()=>links.classList.toggle('open'));}

  document.querySelectorAll('[data-year]').forEach(el=>el.textContent=new Date().getFullYear());

  const current=location.pathname.split('/').pop()||'index.html';
  document.querySelectorAll('.links a').forEach(a=>{
    const href=a.getAttribute('href')||'';
    if(href.endsWith(current)||(current==='index.html'&&href.endsWith('../index.html'))) a.classList.add('active');
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
    const play=()=>{timer=setInterval(()=>show(index+1),5600);};
    const stop=()=>clearInterval(timer);
    shell.addEventListener('mouseenter',stop);
    shell.addEventListener('mouseleave',play);
    shell.addEventListener('focusin',stop);
    shell.addEventListener('focusout',play);
    show(0);
    play();
  }
});
