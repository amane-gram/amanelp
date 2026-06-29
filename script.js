const header=document.querySelector('[data-header]');
const menuButton=document.querySelector('[data-menu-button]');
const navigation=document.querySelector('[data-nav]');
const year=document.querySelector('[data-year]');
const revealItems=document.querySelectorAll('.reveal');
year.textContent=new Date().getFullYear();
const updateHeader=()=>header.classList.toggle('is-scrolled',window.scrollY>16);
updateHeader();window.addEventListener('scroll',updateHeader,{passive:true});
const closeMenu=()=>{menuButton.setAttribute('aria-expanded','false');menuButton.setAttribute('aria-label','メニューを開く');navigation.classList.remove('is-open');document.body.classList.remove('menu-open')};
menuButton.addEventListener('click',()=>{const open=menuButton.getAttribute('aria-expanded')==='true';menuButton.setAttribute('aria-expanded',String(!open));menuButton.setAttribute('aria-label',open?'メニューを開く':'メニューを閉じる');navigation.classList.toggle('is-open',!open);document.body.classList.toggle('menu-open',!open)});
navigation.querySelectorAll('a').forEach(link=>link.addEventListener('click',closeMenu));
window.addEventListener('keydown',event=>{if(event.key==='Escape')closeMenu()});
const reduceMotion=window.matchMedia('(prefers-reduced-motion: reduce)').matches;
if(reduceMotion||!('IntersectionObserver'in window)){revealItems.forEach(item=>item.classList.add('is-visible'))}else{const observer=new IntersectionObserver(entries=>{entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target)}})},{rootMargin:'0px 0px -8% 0px',threshold:.12});revealItems.forEach(item=>observer.observe(item))}

const slider=document.querySelector('[data-slider]');
if(slider){
  const viewport=slider.querySelector('[data-slider-viewport]');
  const slides=[...slider.querySelectorAll('.daily-slide')];
  const dots=[...slider.querySelectorAll('[data-slide-to]')];
  const previous=slider.querySelector('[data-slider-prev]');
  const next=slider.querySelector('[data-slider-next]');
  let current=0;
  let autoplay;
  let scrollFrame;
  const updateDots=()=>dots.forEach((dot,index)=>dot.setAttribute('aria-current',String(index===current)));
  const goTo=index=>{
    current=(index+slides.length)%slides.length;
    viewport.scrollTo({left:slides[current].offsetLeft-slides[0].offsetLeft,behavior:reduceMotion?'auto':'smooth'});
    updateDots();
  };
  const stopAutoplay=()=>window.clearInterval(autoplay);
  const startAutoplay=()=>{
    stopAutoplay();
    if(!reduceMotion)autoplay=window.setInterval(()=>goTo(current+1),3600);
  };
  previous.addEventListener('click',()=>{goTo(current-1);startAutoplay()});
  next.addEventListener('click',()=>{goTo(current+1);startAutoplay()});
  dots.forEach(dot=>dot.addEventListener('click',()=>{goTo(Number(dot.dataset.slideTo));startAutoplay()}));
  viewport.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();goTo(current-1)}
    if(event.key==='ArrowRight'){event.preventDefault();goTo(current+1)}
  });
  viewport.addEventListener('scroll',()=>{
    window.cancelAnimationFrame(scrollFrame);
    scrollFrame=window.requestAnimationFrame(()=>{
      const origin=slides[0].offsetLeft;
      const nearest=slides.reduce((best,slide,index)=>Math.abs((slide.offsetLeft-origin)-viewport.scrollLeft)<Math.abs((slides[best].offsetLeft-origin)-viewport.scrollLeft)?index:best,0);
      if(nearest!==current){current=nearest;updateDots()}
    });
  },{passive:true});
  slider.addEventListener('mouseenter',stopAutoplay);
  slider.addEventListener('mouseleave',startAutoplay);
  slider.addEventListener('focusin',stopAutoplay);
  slider.addEventListener('focusout',startAutoplay);
  startAutoplay();
}

const voiceSlider=document.querySelector('[data-voice-slider]');
if(voiceSlider){
  const voiceViewport=voiceSlider.querySelector('[data-voice-viewport]');
  const voiceSlides=[...voiceSlider.querySelectorAll('.voice-slide')];
  const voiceDots=[...voiceSlider.querySelectorAll('[data-voice-to]')];
  const voicePrevious=voiceSlider.querySelector('[data-voice-prev]');
  const voiceNext=voiceSlider.querySelector('[data-voice-next]');
  let voiceCurrent=0;
  let voiceAutoplay;
  let voiceScrollFrame;
  const updateVoiceDots=()=>voiceDots.forEach((dot,index)=>dot.setAttribute('aria-current',String(index===voiceCurrent)));
  const goToVoice=index=>{
    voiceCurrent=(index+voiceSlides.length)%voiceSlides.length;
    voiceViewport.scrollTo({left:voiceSlides[voiceCurrent].offsetLeft-voiceSlides[0].offsetLeft,behavior:reduceMotion?'auto':'smooth'});
    updateVoiceDots();
  };
  const stopVoiceAutoplay=()=>window.clearInterval(voiceAutoplay);
  const startVoiceAutoplay=()=>{
    stopVoiceAutoplay();
    if(!reduceMotion)voiceAutoplay=window.setInterval(()=>goToVoice(voiceCurrent+1),6500);
  };
  voicePrevious.addEventListener('click',()=>{goToVoice(voiceCurrent-1);startVoiceAutoplay()});
  voiceNext.addEventListener('click',()=>{goToVoice(voiceCurrent+1);startVoiceAutoplay()});
  voiceDots.forEach(dot=>dot.addEventListener('click',()=>{goToVoice(Number(dot.dataset.voiceTo));startVoiceAutoplay()}));
  voiceViewport.addEventListener('keydown',event=>{
    if(event.key==='ArrowLeft'){event.preventDefault();goToVoice(voiceCurrent-1)}
    if(event.key==='ArrowRight'){event.preventDefault();goToVoice(voiceCurrent+1)}
  });
  voiceViewport.addEventListener('scroll',()=>{
    window.cancelAnimationFrame(voiceScrollFrame);
    voiceScrollFrame=window.requestAnimationFrame(()=>{
      const origin=voiceSlides[0].offsetLeft;
      const nearest=voiceSlides.reduce((best,slide,index)=>Math.abs((slide.offsetLeft-origin)-voiceViewport.scrollLeft)<Math.abs((voiceSlides[best].offsetLeft-origin)-voiceViewport.scrollLeft)?index:best,0);
      if(nearest!==voiceCurrent){voiceCurrent=nearest;updateVoiceDots()}
    });
  },{passive:true});
  voiceSlider.addEventListener('mouseenter',stopVoiceAutoplay);
  voiceSlider.addEventListener('mouseleave',startVoiceAutoplay);
  voiceSlider.addEventListener('focusin',stopVoiceAutoplay);
  voiceSlider.addEventListener('focusout',startVoiceAutoplay);
  startVoiceAutoplay();
}