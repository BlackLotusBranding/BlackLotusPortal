
document.addEventListener('DOMContentLoaded',()=>{
 const menu=document.querySelector('.mobile-menu'),links=document.querySelector('.links'); if(menu&&links)menu.addEventListener('click',()=>links.classList.toggle('open'));
 document.querySelectorAll('[data-year]').forEach(e=>e.textContent=new Date().getFullYear());
 document.addEventListener('pointermove',e=>{document.body.style.setProperty('--mx',e.clientX+'px');document.body.style.setProperty('--my',e.clientY+'px')});
 const slides=[...document.querySelectorAll('.slide')], dots=[...document.querySelectorAll('.dot')]; let i=0, timer;
 function show(n){ if(!slides.length)return; slides[i].classList.remove('active'); dots[i]?.classList.remove('active'); i=(n+slides.length)%slides.length; slides[i].classList.add('active'); dots[i]?.classList.add('active'); }
 function auto(){clearInterval(timer); timer=setInterval(()=>show(i+1),6500)}
 document.querySelector('.next')?.addEventListener('click',()=>{show(i+1);auto()}); document.querySelector('.prev')?.addEventListener('click',()=>{show(i-1);auto()}); dots.forEach((d,n)=>d.addEventListener('click',()=>{show(n);auto()})); auto();
 const search=document.querySelector('[data-resource-search]'); if(search){ search.addEventListener('input',()=>{ const q=search.value.toLowerCase(); document.querySelectorAll('[data-search-card]').forEach(c=>{c.style.display=c.textContent.toLowerCase().includes(q)?'block':'none'})})}
});
