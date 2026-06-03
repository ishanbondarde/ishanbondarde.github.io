
// ─── NAVBAR SCROLL EFFECT ──────────────────────────
const nav = document.querySelector('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 40);
});
 
// ─── CURSOR GLOW ──────────────────────────────────
const glow = document.createElement('div');
glow.className = 'cursor-glow';
document.body.appendChild(glow);
document.addEventListener('mousemove', e => {
  glow.style.left = e.clientX + 'px';
  glow.style.top  = e.clientY + 'px';
});
 
// ─── SCROLL REVEAL ────────────────────────────────
const revealEls = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add('visible');
      revealObserver.unobserve(el.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => revealObserver.observe(el));
 
// ─── TYPING TITLE EFFECT ──────────────────────────
const texts = ["Frontend Developer", "UI Crafter", "Creative Coder", "Ishan Bondarde"];
let tIdx = 0, cIdx = 0, deleting = false;
 
function typeTitle() {
  const current = texts[tIdx];
  if (!deleting) {
    document.title = current.substring(0, cIdx + 1);
    cIdx++;
    if (cIdx === current.length) {
      deleting = true;
      setTimeout(typeTitle, 1800);
      return;
    }
  } else {
    document.title = current.substring(0, cIdx - 1);
    cIdx--;
    if (cIdx === 0) {
      deleting = false;
      tIdx = (tIdx + 1) % texts.length;
    }
  }
  setTimeout(typeTitle, deleting ? 80 : 130);
}
typeTitle();
 
// ─── ANIMATED COUNTER ─────────────────────────────
function animateCount(el, target, suffix = '') {
  let start = 0;
  const step = Math.ceil(target / 40);
  const timer = setInterval(() => {
    start = Math.min(start + step, target);
    el.textContent = start + suffix;
    if (start >= target) clearInterval(timer);
  }, 40);
}
 
const statObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.stat-number').forEach(el => {
        const val = parseInt(el.dataset.val);
        const suf = el.dataset.suffix || '';
        animateCount(el, val, suf);
      });
      statObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.3 });
 
const statsSection = document.querySelector('.about-stats');
if (statsSection) statObserver.observe(statsSection);
 
