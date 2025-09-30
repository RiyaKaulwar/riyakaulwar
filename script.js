/* small interactive engine for the site */

/* year */
document.getElementById('year').textContent = new Date().getFullYear();

/* typing subtitle lines */
const typedEl = document.getElementById('typed');
const phrases = [
  "building assistive tech for the elderly",
  "research • prototypes • community",
  "designer + researcher"
];
let pi = 0, ci = 0, deleting = false;
const speed = 42, pause = 3000;
function tick(){
  const p = phrases[pi];
  if(!deleting){
    typedEl.textContent = p.slice(0, ++ci);
    if(ci === p.length){ deleting = true; setTimeout(tick, pause); return; }
    setTimeout(tick, speed + Math.random()*20);
  } else {
    typedEl.textContent = p.slice(0, --ci);
    if(ci === 0){ deleting = false; pi = (pi+1)%phrases.length; setTimeout(tick, 200); return; }
    setTimeout(tick, Math.floor(speed/2));
  }
}
tick();

/* smooth nav scrolling for in-page anchors */
document.querySelectorAll('a[href^="#"]').forEach(a=>{
  a.addEventListener('click', e=>{
    const href = a.getAttribute('href');
    if(href.length>1){
      e.preventDefault();
      const el = document.querySelector(href);
      if(el) el.scrollIntoView({behavior:'smooth',block:'start'});
    }
  });
});

/* modal content for orgs */
const orgData = {
  "iisc": {
    title: "iisc — research intern",
    body: "automated analysis pipeline for iv-curves, created dashboards to visualize angle & height dependent solar cell performance, and wrote macros to batch-process 200+ configurations."
  },
  "gov-up": {
    title: "government of up — civic impact fellow",
    body: "worked on rural farmer supply chain proposals and prototyped an iot-based preservation idea; built stakeholder models and pitched to local offices."
  },
  "birmingham": {
    title: "birmingham city council — youth summit",
    body: "presented at the young women in leadership summit; delivered a talk to embassy representatives on civic innovation."
  },
  "nyas": {
    title: "new york academy of sciences — junior academy",
    body: "led a winning team in the spring challenge; collaborated on a research-driven innovation project with global peers."
  },
  "reco": {
    title: "reco — creative media intern",
    body: "led creative direction for social content, designed promotional assets, and supported the inaugural program launch."
  },
  "tks": {
    title: "tks — innovate participant",
    body: "rapid prototyping and building with emerging technologies; hands-on project sprints and demos."
  }
};

/* open modal when clicking + */
document.querySelectorAll('.logo-more').forEach(btn=>{
  btn.addEventListener('click', ()=>{
    const key = btn.dataset.key;
    const data = orgData[key];
    if(!data) return;
    openModal(data.title, data.body);
  });
});

function openModal(title, body){
  const modal = document.getElementById('modal');
  modal.querySelector('#modal-title').textContent = title;
  modal.querySelector('#modal-body').textContent = body;
  modal.classList.add('show');
  modal.setAttribute('aria-hidden','false');
  // trap focus minimally
  document.body.style.overflow = 'hidden';
}

/* close handlers */
document.getElementById('modal-x').addEventListener('click', closeModal);
document.getElementById('modal-close').addEventListener('click', closeModal);
document.getElementById('modal-close-2').addEventListener('click', closeModal);
function closeModal(){
  const modal = document.getElementById('modal');
  modal.classList.remove('show');
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

/* reveal on scroll (simple) */
const revealItems = document.querySelectorAll('.section, .card, .projects-grid, .logo-strip');
const obs = new IntersectionObserver(entries=>{
  entries.forEach(en=>{
    if(en.isIntersecting) en.target.style.opacity = 1;
  });
},{threshold:0.08});
revealItems.forEach(i=>{
  i.style.opacity = 0;
  obs.observe(i);
});

/* allow users to pause the logo scroll while hovering (already in css). also add small manual drag support */
document.querySelectorAll('.logo-strip').forEach(strip=>{
  let pressed = false, startX, scrollLeft;
  const track = strip.querySelector('.logo-track');
  strip.addEventListener('mousedown', (e)=>{
    pressed = true;
    startX = e.pageX - strip.offsetLeft;
    scrollLeft = track.scrollLeft;
    strip.classList.add('dragging');
  });
  window.addEventListener('mouseup', ()=>{ pressed = false; strip.classList.remove('dragging'); });
  strip.addEventListener('mousemove', (e)=>{
    if(!pressed) return;
    e.preventDefault();
    const x = e.pageX - strip.offsetLeft;
    const walk = (x - startX) * 1.2; // drag speed
    track.scrollLeft = scrollLeft - walk;
  });
  // touch support
  strip.addEventListener('touchstart', (e)=>{
    pressed = true;
    startX = e.touches[0].pageX - strip.offsetLeft;
    scrollLeft = track.scrollLeft;
  });
  strip.addEventListener('touchend', ()=> pressed = false);
  strip.addEventListener('touchmove', (e)=>{
    if(!pressed) return;
    const x = e.touches[0].pageX - strip.offsetLeft;
    const walk = (x - startX) * 1.2;
    track.scrollLeft = scrollLeft - walk;
  });
});

const scrollArea = document.querySelector('.awards-scroll');
if (scrollArea) {
  let scrollAmount = 0;
  setInterval(() => {
    scrollAmount += 1;
    if (scrollAmount >= scrollArea.scrollWidth - scrollArea.clientWidth) {
      scrollAmount = 0;
    }
    scrollArea.scrollTo({
      left: scrollAmount,
      behavior: 'smooth'
    });
  }, 50); // adjust speed (lower = faster)
}

