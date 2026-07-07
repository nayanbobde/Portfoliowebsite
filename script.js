(function(){
  "use strict";

  // ---------- Theme toggle ----------
  const root = document.documentElement;
  const themeToggle = document.getElementById('themeToggle');
  const savedTheme = localStorage.getItem('nb-theme');
  if (savedTheme) root.setAttribute('data-theme', savedTheme);
  else root.setAttribute('data-theme', 'dark');

  themeToggle.addEventListener('click', function(){
    const current = root.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    localStorage.setItem('nb-theme', next);
  });

  // ---------- Mobile nav ----------
  const burger = document.getElementById('navBurger');
  const mobileNav = document.getElementById('navMobile');
  burger.addEventListener('click', function(){
    const open = mobileNav.classList.toggle('open');
    burger.setAttribute('aria-expanded', open ? 'true' : 'false');
  });
  mobileNav.querySelectorAll('a').forEach(function(a){
    a.addEventListener('click', function(){
      mobileNav.classList.remove('open');
      burger.setAttribute('aria-expanded', 'false');
    });
  });

  // ---------- Scroll progress bar ----------
  const progressBar = document.getElementById('progressBar');
  function updateProgress(){
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const pct = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;
    progressBar.style.width = pct + '%';
  }
  window.addEventListener('scroll', updateProgress, { passive: true });
  updateProgress();

  // ---------- Back to top ----------
  document.getElementById('backToTop').addEventListener('click', function(){
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ---------- Typing animation ----------
  const typingEl = document.getElementById('typingText');
  const phrases = [
    'Data Analyst — Retail & Supply Chain Analytics',
    'SQL · Power BI · Python',
    'Turning inventory data into fewer stockouts'
  ];
  let phraseIndex = 0, charIndex = 0, deleting = false;

  function typeLoop(){
    const current = phrases[phraseIndex];
    if (!deleting){
      charIndex++;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === current.length){
        deleting = true;
        setTimeout(typeLoop, 1600);
        return;
      }
    } else {
      charIndex--;
      typingEl.textContent = current.slice(0, charIndex);
      if (charIndex === 0){
        deleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
      }
    }
    setTimeout(typeLoop, deleting ? 35 : 55);
  }
  typeLoop();

  // ---------- Scroll reveal ----------
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        entry.target.classList.add('is-visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
  revealEls.forEach(function(el){ revealObserver.observe(el); });

  // ---------- KPI count-up ----------
  const kpiEls = document.querySelectorAll('.kpi__value');
  function animateCount(el){
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const duration = 1400;
    const start = performance.now();
    function step(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(target * eased);
      el.textContent = value + suffix;
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }
  const kpiObserver = new IntersectionObserver(function(entries){
    entries.forEach(function(entry){
      if (entry.isIntersecting){
        animateCount(entry.target);
        kpiObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.4 });
  kpiEls.forEach(function(el){ kpiObserver.observe(el); });

  // ---------- Footer year ----------
  document.getElementById('year').textContent = new Date().getFullYear();

})();
