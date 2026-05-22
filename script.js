document.addEventListener('DOMContentLoaded', () => {
  // Redirect to age gate if not verified
  if (window.location.pathname !== '/' && !window.location.pathname.endsWith('index.html')) {
    if (localStorage.getItem('ageVerified') !== 'true') {
      window.location.href = 'index.html';
    }
  }

  // Sticky Header & Mobile Nav
  const header = document.getElementById('site-header');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav-overlay');
  
  if (header) {
    window.addEventListener('scroll', () => {
      if (window.scrollY > 80) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    });
  }

  if (mobileBtn && mobileNav) {
    function toggleMenu() {
      mobileBtn.classList.toggle('open');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    }
    mobileBtn.addEventListener('click', toggleMenu);
    
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
  }

  // Scroll-Triggered Fade-In
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { root: null, threshold: 0.2 });

  revealElements.forEach(el => revealObserver.observe(el));

  // Counter Animation
  const statsSection = document.getElementById('stats');
  if (statsSection) {
    const statNumbers = document.querySelectorAll('.stat-number');
    let hasCounted = false;

    function animateCounters() {
      statNumbers.forEach(stat => {
        const target = +stat.getAttribute('data-target');
        const suffix = stat.getAttribute('data-suffix');
        const duration = 1500;
        const startTime = performance.now();

        function updateCounter(currentTime) {
          const elapsedTime = currentTime - startTime;
          const progress = Math.min(elapsedTime / duration, 1);
          const easeProgress = 1 - Math.pow(1 - progress, 4);
          const currentCount = Math.floor(easeProgress * target);
          stat.innerText = currentCount + suffix;
          if (progress < 1) requestAnimationFrame(updateCounter);
          else stat.innerText = target + suffix;
        }
        requestAnimationFrame(updateCounter);
      });
    }

    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !hasCounted) {
        hasCounted = true;
        animateCounters();
      }
    }, { threshold: 0.5 });
    statsObserver.observe(statsSection);
  }

  // Floating WhatsApp Button
  const waBtn = document.querySelector('.floating-wa');
  if (waBtn) {
    setTimeout(() => { waBtn.classList.add('visible'); }, 800);
  }

  // Distributor Modal
  const distBtn = document.getElementById('open-dist-modal');
  const distModal = document.getElementById('distributor-modal');
  const closeDistModal = document.getElementById('close-dist-modal');
  const distForm = document.getElementById('distributor-form');

  if (distBtn && distModal) {
    distBtn.addEventListener('click', () => {
      distModal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
    closeDistModal.addEventListener('click', () => {
      distModal.classList.remove('active');
      document.body.style.overflow = '';
    });
    distModal.addEventListener('click', (e) => {
      if (e.target === distModal) {
        distModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    });
    if (distForm) {
      distForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Application submitted successfully! We will contact you soon.');
        distModal.classList.remove('active');
        document.body.style.overflow = '';
        distForm.reset();
      });
    }
  }
});
