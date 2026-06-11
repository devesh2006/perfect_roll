document.addEventListener('DOMContentLoaded', () => {

  // Lazy-load Google Tag Manager / Google Analytics on first interaction or idle timeout
  let gtmLoaded = false;
  function lazyLoadGTM() {
    if (gtmLoaded) return;
    gtmLoaded = true;
    
    // Inject the external GTM script
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://www.googletagmanager.com/gtag/js?id=G-4HZE75QVSZ';
    document.head.appendChild(script);
    
    // Initialize configuration
    if (typeof gtag === 'function') {
      gtag('config', 'G-4HZE75QVSZ');
    }
  }
  
  // Schedule a 3.5-second idle timeout, or listen for user interaction events
  const idleTimeout = setTimeout(lazyLoadGTM, 3500);
  const interactionEvents = ['scroll', 'touchstart', 'mousemove', 'keydown', 'click'];
  interactionEvents.forEach(evt => {
    window.addEventListener(evt, () => {
      clearTimeout(idleTimeout);
      lazyLoadGTM();
    }, { once: true, passive: true });
  });

  // Sticky Header & Mobile Nav
  const header = document.getElementById('site-header');
  const mobileBtn = document.getElementById('mobile-menu-btn');
  const mobileNav = document.getElementById('mobile-nav-overlay');
  
  if (header) {
    let isScrolling = false;
    window.addEventListener('scroll', () => {
      if (!isScrolling) {
        window.requestAnimationFrame(() => {
          if (window.scrollY > 80) {
            header.classList.add('scrolled');
          } else {
            header.classList.remove('scrolled');
          }
          isScrolling = false;
        });
        isScrolling = true;
      }
    }, { passive: true });
  }

  if (mobileBtn && mobileNav) {
    mobileBtn.setAttribute('aria-expanded', 'false');
    mobileBtn.setAttribute('aria-controls', 'mobile-nav-overlay');
    
    function toggleMenu() {
      const isOpen = mobileBtn.classList.toggle('open');
      mobileNav.classList.toggle('open');
      mobileBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      document.body.style.overflow = isOpen ? 'hidden' : '';
    }
    mobileBtn.addEventListener('click', toggleMenu);
    
    mobileNav.addEventListener('click', (e) => {
      if (e.target === mobileNav) {
        toggleMenu();
      }
    });
    
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
  }

  // Interactive Hero mouse-tracking glow (only on desktop/non-touch devices)
  const heroSection = document.getElementById('hero');
  if (heroSection && !window.matchMedia('(pointer: coarse)').matches) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroSection.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      heroSection.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
    }, { passive: true });
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
  }, { root: null, threshold: 0.05 });

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

  // Helper for keyboard focus trapping
  function getFocusableElements(container) {
    return Array.from(container.querySelectorAll(
      'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, [tabindex="0"], [contenteditable]'
    ));
  }

  function setupFocusTrap(modal, closeBtn, onOpenCallback, onCloseCallback) {
    let previouslyFocused = null;

    function open() {
      previouslyFocused = document.activeElement;
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
      if (onOpenCallback) onOpenCallback();
      setTimeout(() => {
        if (closeBtn) closeBtn.focus();
      }, 100);
    }

    function close() {
      modal.classList.remove('active');
      document.body.style.overflow = '';
      if (onCloseCallback) onCloseCallback();
      if (previouslyFocused) {
        previouslyFocused.focus();
      }
    }

    if (closeBtn) {
      closeBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        close();
      });
    }

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        close();
      }
    });

    modal.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        close();
      } else if (e.key === 'Tab') {
        const focusables = getFocusableElements(modal);
        if (focusables.length === 0) return;
        const firstFocusable = focusables[0];
        const lastFocusable = focusables[focusables.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === firstFocusable) {
            lastFocusable.focus();
            e.preventDefault();
          }
        } else {
          if (document.activeElement === lastFocusable) {
            firstFocusable.focus();
            e.preventDefault();
          }
        }
      }
    });

    return { open, close };
  }

  // Distributor Modal with Input Validation, XSS Sanitization, and Client-side Rate-limiting
  const distBtn = document.getElementById('open-dist-modal');
  const distModal = document.getElementById('distributor-modal');
  const closeDistModal = document.getElementById('close-dist-modal');
  const distForm = document.getElementById('distributor-form');

  if (distBtn && distModal) {
    const distTrap = setupFocusTrap(distModal, closeDistModal, () => {
      // Clear status when opening
      clearFormStatus();
      checkLockoutStatus();
    });

    distBtn.addEventListener('click', () => {
      distTrap.open();
    });

    const statusBanner = document.getElementById('distributor-form-status');
    const submitBtn = distForm ? distForm.querySelector('button[type="submit"]') : null;
    let distTimeout = null;

    function clearFormStatus() {
      if (distTimeout) {
        clearTimeout(distTimeout);
        distTimeout = null;
      }
      if (statusBanner) {
        statusBanner.style.display = 'none';
        statusBanner.textContent = '';
        statusBanner.className = 'form-status-banner';
      }
    }

    function showFormStatus(type, message) {
      if (statusBanner) {
        statusBanner.textContent = message;
        statusBanner.className = `form-status-banner form-status-${type}`;
        statusBanner.style.display = 'block';
        statusBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    }

    // Client-side XSS Sanitization
    function sanitizeInput(str) {
      if (typeof str !== 'string') return '';
      // Strip all HTML elements
      const cleanHtml = str.replace(/<[^>]*>/g, '');
      // Strip unsafe JavaScript patterns
      const cleanScript = cleanHtml.replace(/(javascript:|onload=|onerror=|onclick=|onfocus=|onblur=)/gi, '');
      return cleanScript.trim();
    }

    // LocalStorage Rate Limiter
    function getRecentSubmissions() {
      try {
        const history = localStorage.getItem('dist_submissions');
        return history ? JSON.parse(history) : [];
      } catch (e) {
        return [];
      }
    }

    function recordSubmission() {
      try {
        const submissions = getRecentSubmissions();
        submissions.push(Date.now());
        localStorage.setItem('dist_submissions', JSON.stringify(submissions));
      } catch (e) {
        console.warn("localStorage is disabled or full");
      }
    }

    function checkLockoutStatus() {
      const now = Date.now();
      const timeframe = 15 * 60 * 1000; // 15 minutes
      const submissions = getRecentSubmissions().filter(t => now - t < timeframe);
      
      // Update clean history
      try {
        localStorage.setItem('dist_submissions', JSON.stringify(submissions));
      } catch (e) {}

      if (submissions.length >= 5) {
        // Exceeded 5 submissions in 15 minutes
        const oldestActive = submissions[0];
        const remainingMs = timeframe - (now - oldestActive);
        const remainingMin = Math.ceil(remainingMs / (60 * 1000));
        
        if (submitBtn) {
          submitBtn.disabled = true;
          submitBtn.textContent = `Locked Out (${remainingMin}m remaining)`;
        }
        showFormStatus('error', `429 Too Many Requests: submission rate limit exceeded. Please try again in ${remainingMin} minute(s).`);
        return true;
      }

      if (submitBtn) {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Submit Application';
      }
      return false;
    }

    if (distForm) {
      distForm.addEventListener('submit', (e) => {
        e.preventDefault();
        clearFormStatus();

        if (checkLockoutStatus()) {
          return;
        }

        // Fetch inputs
        const nameVal = document.getElementById('d-name').value;
        const businessVal = document.getElementById('d-business').value;
        const cityVal = document.getElementById('d-city').value;
        const phoneVal = document.getElementById('d-phone').value;
        const emailVal = document.getElementById('d-email').value;

        // Sanitize
        const name = sanitizeInput(nameVal);
        const business = sanitizeInput(businessVal);
        const city = sanitizeInput(cityVal);
        const phone = sanitizeInput(phoneVal);
        const email = sanitizeInput(emailVal);

        // Validation Rules
        const nameRegex = /^[a-zA-Z\s.-]{2,100}$/;
        const businessRegex = /^[a-zA-Z0-9\s.,&'()-]{2,100}$/;
        const cityRegex = /^[a-zA-Z\s.-]{2,100}$/;
        const phoneRegex = /^\+?[0-9\s-]{10,15}$/;
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (!nameRegex.test(name)) {
          showFormStatus('error', 'Validation Error: Full Name must contain only letters and be between 2 and 100 characters.');
          return;
        }
        if (!businessRegex.test(business)) {
          showFormStatus('error', 'Validation Error: Business Name must be between 2 and 100 characters.');
          return;
        }
        if (!cityRegex.test(city)) {
          showFormStatus('error', 'Validation Error: City must contain only letters and be between 2 and 100 characters.');
          return;
        }
        if (!phoneRegex.test(phone)) {
          showFormStatus('error', 'Validation Error: Please enter a valid phone number (10 to 15 digits).');
          return;
        }
        if (!emailRegex.test(email)) {
          showFormStatus('error', 'Validation Error: Please enter a valid email address.');
          return;
        }

        // Log and confirm submission
        recordSubmission();
        if (typeof gtag === 'function') {
          gtag('event', 'form_submission', {
            event_category: 'Form',
            event_label: 'Distributor Application',
            form_id: 'distributor-form'
          });
        }
        showFormStatus('success', 'Application submitted successfully! Our team will contact you soon.');
        
        // Reset inputs and block button
        distForm.reset();
        checkLockoutStatus();

        // Close modal after delay to let user read success message
        if (distTimeout) clearTimeout(distTimeout);
        distTimeout = setTimeout(() => {
          distTrap.close();
          clearFormStatus();
        }, 3000);
      });
    }
  }

  // Initialize Product Galleries
  const productGalleries = document.querySelectorAll('.product-gallery');
  productGalleries.forEach(gallery => {
    const imagesData = gallery.getAttribute('data-images');
    if (!imagesData) return;
    
    let images = [];
    try {
      images = JSON.parse(imagesData);
    } catch(err) {
      console.error("Failed to parse gallery images:", err);
      return;
    }
    
    if (images.length === 0) return;
    
    const galleryImages = gallery.querySelectorAll('.gallery-image');
    const prevBtn = gallery.querySelector('.prev-btn');
    const nextBtn = gallery.querySelector('.next-btn');
    const dots = gallery.querySelectorAll('.gallery-dot');
    
    let currentIndex = 0;
    
    // Helper to preload adjacent images (Current, Next, Previous)
    function preloadAdjacent() {
      const adjacentIndices = [
        currentIndex,
        (currentIndex + 1) % images.length,
        (currentIndex - 1 + images.length) % images.length
      ];
      
      const uniqueIndices = [...new Set(adjacentIndices)];
      uniqueIndices.forEach(idx => {
        const img = galleryImages[idx];
        if (img && img.getAttribute('src') === '') {
          const src = img.getAttribute('data-src');
          const srcset = img.getAttribute('data-srcset');
          if (src) {
            img.decoding = "async";
            img.src = src;
          }
          if (srcset) {
            img.srcset = srcset;
          }
        }
      });
    }
    
    function updateImage() {
      // Toggle active classes on all images
      galleryImages.forEach((img, idx) => {
        img.classList.toggle('active', idx === currentIndex);
        if (idx === currentIndex) {
          img.setAttribute('fetchpriority', 'high');
        } else {
          img.removeAttribute('fetchpriority');
        }
      });
      
      // Update dots immediately
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });

      // Preload new adjacent images
      preloadAdjacent();
    }
    
    // Initial preload of adjacent images on page load
    preloadAdjacent();
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
      });
    }
    
    // Dot clicks
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
        if (targetIdx === currentIndex) return;
        currentIndex = targetIdx;
        updateImage();
      });
    });
    
    // Swipe gestures on mobile devices
    let touchStartX = 0;
    let touchEndX = 0;
    let touchStartY = 0;
    let touchEndY = 0;
    
    gallery.addEventListener('touchstart', (e) => {
      touchStartX = e.changedTouches[0].clientX;
      touchStartY = e.changedTouches[0].clientY;
    }, { passive: true });
    
    gallery.addEventListener('touchend', (e) => {
      touchEndX = e.changedTouches[0].clientX;
      touchEndY = e.changedTouches[0].clientY;
      
      const swipeDistanceX = touchEndX - touchStartX;
      const swipeDistanceY = touchEndY - touchStartY;
      const threshold = 50;
      
      // Prevent scrolling interference by checking X vs Y displacement
      if (Math.abs(swipeDistanceX) > threshold && Math.abs(swipeDistanceX) > Math.abs(swipeDistanceY)) {
        if (swipeDistanceX > 0) {
          currentIndex = (currentIndex - 1 + images.length) % images.length;
          updateImage();
        } else {
          currentIndex = (currentIndex + 1) % images.length;
          updateImage();
        }
      }
    }, { passive: true });

    // Keyboard navigation support for gallery
    gallery.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        if (prevBtn) {
          e.preventDefault();
          prevBtn.click();
        }
      } else if (e.key === 'ArrowRight') {
        if (nextBtn) {
          e.preventDefault();
          nextBtn.click();
        }
      }
    });
  });

  // Product Detail Modal Dynamic Creation & Event Handling
  const productCards = document.querySelectorAll('.product-card');
  
  if (productCards.length > 0) {
    // Create the modal container if it doesn't exist
    let modalOverlay = document.getElementById('product-detail-modal');
    if (!modalOverlay) {
      modalOverlay = document.createElement('div');
      modalOverlay.id = 'product-detail-modal';
      modalOverlay.className = 'product-modal-overlay';
      modalOverlay.innerHTML = `
        <div class="product-modal-card animate-reveal">
          <button class="product-modal-close" aria-label="Close details">&times;</button>
          <div class="product-modal-img-side">
            <!-- Dynamic Image or Placeholder -->
          </div>
          <div class="product-modal-info-side">
            <h2 id="modal-product-title">Product Title</h2>
            
            <p id="modal-product-description" class="modal-description" style="margin-top: 8px; margin-bottom: 8px; font-size: 1rem; line-height: 1.6; color: #ccc;"></p>
            
            <div class="product-modal-features-wrapper" style="margin-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 12px;">
              <h3 class="modal-section-title">FEATURES</h3>
              <ul id="modal-product-features" class="modal-features">
                <!-- Dynamic features -->
              </ul>
            </div>

            <div class="product-modal-specs-wrapper" style="margin-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 12px;">
              <h3 class="modal-section-title">SPECIFICATIONS</h3>
              <ul id="modal-product-specs" class="modal-specs">
                <!-- Dynamic specifications -->
              </ul>
            </div>

            <div class="product-modal-benefits-wrapper" style="margin-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 12px;">
              <h3 class="modal-section-title">WHY CHOOSE IT</h3>
              <ul id="modal-product-benefits" class="modal-benefits">
                <!-- Dynamic benefits -->
              </ul>
            </div>
            <div class="product-modal-footer">
              <a href="#" id="modal-product-wa-btn" target="_blank" rel="noopener noreferrer" class="btn btn-gold btn-full" style="justify-content: center; align-items: center; gap: 8px;">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="vertical-align: middle;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Get Price on WhatsApp
              </a>
              <a href="distributors.html" class="btn btn-outline-light btn-full" style="justify-content: center; align-items: center;">Become a Distributor</a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalOverlay);
    }
    
    const modalClose = modalOverlay.querySelector('.product-modal-close');
    const modalImgSide = modalOverlay.querySelector('.product-modal-img-side');
    const modalTitle = modalOverlay.querySelector('#modal-product-title');
    const modalWaBtn = modalOverlay.querySelector('#modal-product-wa-btn');

    const productDetailTrap = setupFocusTrap(modalOverlay, modalClose);
    
    productCards.forEach(card => {
      card.addEventListener('click', (e) => {
        if (e.target.closest('.btn-gold-outline')) {
          return;
        }

        if (e.target.closest('.prev-btn') || e.target.closest('.next-btn') || e.target.closest('.gallery-dot')) {
          return;
        }
        
        const isWa = e.target.closest('.floating-wa');
        if (isWa) return;
        
        e.preventDefault();
        
        const titleEl = card.querySelector('h3') || card.querySelector('.product-title');
        const titleText = titleEl ? titleEl.innerText : 'Premium Rolling Paper';
        
        const taglineEl = card.querySelector('.tagline') || card.querySelector('p');
        const taglineText = taglineEl ? taglineEl.innerText : '"Premium rolling experience"';
        
        const featuresAttr = card.getAttribute('data-features');
        let features = [];
        if (featuresAttr) {
          try {
            features = JSON.parse(decodeURIComponent(featuresAttr));
          } catch(err) {
            console.error("Failed to parse features:", err);
          }
        }
        
        const altText = card.getAttribute('data-alt') || titleText;
        
        const descriptionAttr = card.getAttribute('data-description');
        const descriptionText = descriptionAttr ? decodeURIComponent(descriptionAttr) : '';
        
        const specsAttr = card.getAttribute('data-specs');
        let specs = {};
        if (specsAttr) {
          try {
            specs = JSON.parse(decodeURIComponent(specsAttr));
          } catch(err) {
            console.error("Failed to parse specs:", err);
          }
        }
        
        const benefitsAttr = card.getAttribute('data-benefits');
        let benefits = [];
        if (benefitsAttr && benefitsAttr !== 'undefined' && benefitsAttr !== '') {
          try {
            benefits = JSON.parse(decodeURIComponent(benefitsAttr));
          } catch(err) {
            console.error("Failed to parse benefits:", err);
          }
        }
        
        const imagesAttr = card.getAttribute('data-images') || (card.querySelector('.product-gallery') ? card.querySelector('.product-gallery').getAttribute('data-images') : null);
        let images = [];
        if (imagesAttr) {
          try {
            images = JSON.parse(imagesAttr);
          } catch(err) {
            console.error("Failed to parse images data:", err);
          }
        }
        
        if (images.length === 0) {
          const singleImg = card.querySelector('img');
          if (singleImg) {
            images = [singleImg.src];
          }
        }

        let activeIndex = 0;

        function updateModalImage() {
          const modalImages = modalImgSide.querySelectorAll('.gallery-image');
          const modalDots = modalImgSide.querySelectorAll('.gallery-dot');
          
          modalImages.forEach((img, idx) => {
            img.classList.toggle('active', idx === activeIndex);
            if (idx === activeIndex) {
              img.setAttribute('fetchpriority', 'high');
            } else {
              img.removeAttribute('fetchpriority');
            }
          });

          modalDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeIndex);
          });
        }

        if (images.length > 1) {
          modalImgSide.innerHTML = `
            <div class="product-gallery">
                <div class="image-container">
                    <button class="prev-btn" aria-label="Previous image">&lsaquo;</button>
                    ${images.map((src, i) => `
                      <img class="gallery-image ${i === 0 ? 'active' : ''}" 
                           src="${src}" 
                           alt="${altText}" 
                           decoding="async" 
                           ${i === 0 ? 'fetchpriority="high"' : ''} />
                    `).join('')}
                    <button class="next-btn" aria-label="Next image">&rsaquo;</button>
                </div>
                <div class="gallery-dots">
                    ${images.map((_, i) => `<span class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
                </div>
            </div>
          `;

          // Proactively preload all images when the modal opens by creating Image objects
          images.forEach(src => {
            const img = new Image();
            img.decoding = "async";
            img.src = src;
          });

          const prevBtn = modalImgSide.querySelector('.prev-btn');
          const nextBtn = modalImgSide.querySelector('.next-btn');
          const modalDots = modalImgSide.querySelectorAll('.gallery-dot');

          prevBtn.onclick = (e) => {
            e.stopPropagation();
            activeIndex = (activeIndex - 1 + images.length) % images.length;
            updateModalImage();
          };

          nextBtn.onclick = (e) => {
            e.stopPropagation();
            activeIndex = (activeIndex + 1) % images.length;
            updateModalImage();
          };

          modalDots.forEach(dot => {
            dot.onclick = (e) => {
              e.stopPropagation();
              const targetIdx = parseInt(dot.getAttribute('data-index'), 10);
              if (targetIdx === activeIndex) return;
              activeIndex = targetIdx;
              updateModalImage();
            };
          });

          const modalGallery = modalImgSide.querySelector('.product-gallery');
          let touchStartX = 0;
          let touchEndX = 0;
          let touchStartY = 0;
          let touchEndY = 0;

          modalGallery.addEventListener('touchstart', (e) => {
            touchStartX = e.changedTouches[0].clientX;
            touchStartY = e.changedTouches[0].clientY;
          }, { passive: true });

          modalGallery.addEventListener('touchend', (e) => {
            touchEndX = e.changedTouches[0].clientX;
            touchEndY = e.changedTouches[0].clientY;
            
            const distanceX = touchEndX - touchStartX;
            const distanceY = touchEndY - touchStartY;
            const threshold = 50;

            if (Math.abs(distanceX) > threshold && Math.abs(distanceX) > Math.abs(distanceY)) {
              if (distanceX > 0) {
                activeIndex = (activeIndex - 1 + images.length) % images.length;
                updateModalImage();
              } else {
                activeIndex = (activeIndex + 1) % images.length;
                updateModalImage();
              }
            }
          }, { passive: true });

        } else {
          modalImgSide.innerHTML = `
            <div class="image-container">
              <img id="mainProductImage" src="${images[0] || ''}" alt="${altText}" decoding="async" fetchpriority="high" class="active">
            </div>
          `;
        }
        
        if (modalTitle) modalTitle.innerText = titleText;

        const modalDescription = modalOverlay.querySelector('#modal-product-description');
        const modalFeaturesList = modalOverlay.querySelector('#modal-product-features');
        const modalSpecsList = modalOverlay.querySelector('#modal-product-specs');
        const modalBenefitsList = modalOverlay.querySelector('#modal-product-benefits');

        if (modalDescription) {
          modalDescription.innerHTML = descriptionText.replace(/\n\n/g, '<br><br>');
        }
        
        if (modalFeaturesList) {
          modalFeaturesList.innerHTML = features.map(f => `<li>${f}</li>`).join('');
          const wrapper = modalFeaturesList.closest('.product-modal-features-wrapper');
          if (wrapper) {
            wrapper.style.display = features.length > 0 ? 'block' : 'none';
          }
        }
        
        if (modalSpecsList) {
          modalSpecsList.innerHTML = Object.entries(specs).map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`).join('');
          const wrapper = modalSpecsList.closest('.product-modal-specs-wrapper');
          if (wrapper) {
            wrapper.style.display = Object.keys(specs).length > 0 ? 'block' : 'none';
          }
        }
        
        if (modalBenefitsList) {
          modalBenefitsList.innerHTML = benefits.map(b => `<li>${b}</li>`).join('');
          const wrapper = modalBenefitsList.closest('.product-modal-benefits-wrapper');
          if (wrapper) {
            wrapper.style.display = benefits.length > 0 ? 'block' : 'none';
          }
        }
        
        const waBaseUrl = 'https://wa.me/+919717990597'; 
        const messageText = encodeURIComponent(`Hello, I'm interested in the ${titleText}. Please share pricing and availability.`);
        modalWaBtn.href = `${waBaseUrl}?text=${messageText}`;
        
        productDetailTrap.open();
      });
    });
  }

  // Documentation & Certifications Page Interactive Modal
  const docModal = document.getElementById('doc-modal');
  if (docModal) {
    const viewButtons = document.querySelectorAll('.btn-view-doc');
    const closeBtn = document.getElementById('close-doc-modal');
    const modalTitle = document.getElementById('modal-info-title');
    const modalDesc = document.getElementById('modal-info-desc');
    const modalGovAuthority = document.getElementById('modal-info-authority');
    const modalInfoStatus = document.getElementById('modal-info-status');
    const modalNumber = document.getElementById('modal-meta-number');
    const modalDate = document.getElementById('modal-meta-date');
    const modalAuthority = document.getElementById('modal-meta-authority');
    const modalStatusFull = document.getElementById('modal-meta-status-full');
    const modalImg = document.getElementById('modal-doc-img');
    const zoomInBtn = document.getElementById('doc-zoom-in');
    const zoomOutBtn = document.getElementById('doc-zoom-out');
    const zoomLevelEl = document.getElementById('doc-zoom-level');
    const zoomContainer = document.getElementById('modal-zoom-container');
    const bodyScroll = document.getElementById('modal-body-scroll');
    const accordion = document.getElementById('doc-details-accordion');
    const modalTrustList = document.getElementById('modal-trust-list');

    let zoomFactor = 1.0;
    const minZoom = 1.0;
    const maxZoom = 3.0;
    const zoomStep = 0.25;

    const docTrap = setupFocusTrap(docModal, closeBtn, () => {
      docModal.style.display = 'flex';
      zoomFactor = 1.0;
      updateZoom();
    }, () => {
      docModal.style.display = 'none';
      zoomFactor = 1.0;
      updateZoom();
      if (modalImg) modalImg.src = '';
    });

    if (bodyScroll) {
      bodyScroll.addEventListener('click', (e) => {
        if (e.target === bodyScroll || e.target === zoomContainer) {
          docTrap.close();
        }
      });
    }

    const docDetails = {
      gst: {
        title: "GST Registration Certificate",
        img: "images/gst_preview.webp",
        desc: "Official Goods and Services Tax compliance registration verifying active taxation compliance under the Government of India.",
        govAuthority: "Government of India",
        statusBadge: "✓ Active & Compliant",
        statusClass: "status-active",
        number: "06FTMPS1974K1ZV",
        date: "May 01, 2026",
        authority: "GST Department, Government of India",
        statusFull: "Active & Fully Compliant",
        trustIndicators: [
          "Government Verified",
          "Active Registration",
          "Business Compliance Confirmed"
        ]
      },
      msme: {
        title: "MSME Registration Certificate",
        img: "images/msme_preview.webp",
        desc: "Government recognized Micro, Small, and Medium Enterprises (MSME) registration certificate issued under the Udyam initiative.",
        govAuthority: "Government of India",
        statusBadge: "✓ Registered Manufacturing Enterprise",
        statusClass: "status-active",
        number: "UDYAM-HR-05-0164997",
        date: "November 13, 2025",
        authority: "Ministry of MSME, Government of India",
        statusFull: "Active / Micro Enterprise",
        trustIndicators: [
          "Government Verified",
          "Udyam Registered",
          "Manufacturing Enterprise"
        ]
      },
      trademark: {
        title: "Trademark Documentation",
        img: "images/trademark_preview.webp",
        desc: "Brand protection records confirming registration and legal ownership of the trademark name 'Prince Perfect Roll'.",
        govAuthority: "Trademark Registry, India",
        statusBadge: "✓ Brand Protection Record",
        statusClass: "status-protected",
        number: "Application No: 7122851 (Class 34)",
        date: "November 8, 2023",
        authority: "Controller General of Patents, Designs and Trade Marks, India",
        statusFull: "Registered / Active",
        trustIndicators: [
          "Brand Protection Active",
          "Trademark Registered",
          "Legal Registry Confirmed"
        ]
      }
    };

    function updateZoom() {
      if (zoomContainer) {
        zoomContainer.style.transform = `scale(${zoomFactor})`;
        if (zoomFactor > 1.0) {
          zoomContainer.style.transformOrigin = 'top center';
          bodyScroll.style.overflow = 'auto';
        } else {
          zoomContainer.style.transformOrigin = 'top center';
          bodyScroll.style.overflow = 'hidden';
          bodyScroll.scrollLeft = 0;
          bodyScroll.scrollTop = 0;
        }
      }
      if (zoomLevelEl) {
        zoomLevelEl.innerText = `${Math.round(zoomFactor * 100)}%`;
      }
    }

    viewButtons.forEach(btn => {
      btn.addEventListener('click', (e) => {
        const docKey = btn.getAttribute('data-doc');
        const details = docDetails[docKey];
        if (details) {
          if (modalTitle) modalTitle.innerText = details.title;
          if (modalImg) {
            modalImg.src = details.img;
            modalImg.alt = details.title + " - Prince Perfect Roll Documentation Certificate";
            // Dynamically set dimensions to prevent layout shifts
            if (docKey === 'trademark') {
              modalImg.width = 800;
              modalImg.height = 1078;
            } else if (docKey === 'msme') {
              modalImg.width = 800;
              modalImg.height = 1131;
            } else { // gst
              modalImg.width = 800;
              modalImg.height = 1132;
            }
            modalImg.decoding = "async";
          }
          if (modalDesc) modalDesc.innerText = details.desc;
          if (modalGovAuthority) modalGovAuthority.innerText = details.govAuthority;
          if (modalInfoStatus) {
            modalInfoStatus.innerText = details.statusBadge;
            modalInfoStatus.className = 'modal-status-badge ' + (details.statusClass || 'status-active');
          }
          if (modalNumber) modalNumber.innerText = details.number;
          if (modalDate) modalDate.innerText = details.date;
          if (modalAuthority) modalAuthority.innerText = details.authority;
          if (modalStatusFull) modalStatusFull.innerText = details.statusFull;
          
          if (modalTrustList && details.trustIndicators) {
            modalTrustList.innerHTML = details.trustIndicators.map(t => `
              <div class="doc-modal-trust-badge">
                <span class="check">✓</span> ${t}
              </div>
            `).join('');
          }
          
          if (accordion) accordion.removeAttribute('open');
          
          docTrap.open();
        }
      });
    });

    if (zoomInBtn) {
      zoomInBtn.addEventListener('click', () => {
        if (zoomFactor < maxZoom) {
          zoomFactor += zoomStep;
          updateZoom();
        }
      });
    }

    if (zoomOutBtn) {
      zoomOutBtn.addEventListener('click', () => {
        if (zoomFactor > minZoom) {
          zoomFactor -= zoomStep;
          updateZoom();
        }
      });
    }

    // Support pinch zoom / gesture zooming on mobile
    let activeTouch = false;
    let initialDist = 0;
    let initialZoom = 1.0;

    if (bodyScroll) {
      bodyScroll.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
          activeTouch = true;
          initialDist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          initialZoom = zoomFactor;
        }
      }, { passive: true });

      bodyScroll.addEventListener('touchmove', (e) => {
        if (activeTouch && e.touches.length === 2) {
          const dist = Math.hypot(
            e.touches[0].clientX - e.touches[1].clientX,
            e.touches[0].clientY - e.touches[1].clientY
          );
          const factor = dist / initialDist;
          let nextZoom = initialZoom * factor;
          nextZoom = Math.min(Math.max(nextZoom, minZoom), maxZoom);
          zoomFactor = Math.round(nextZoom * 20) / 20;
          updateZoom();
        }
      }, { passive: true });

      bodyScroll.addEventListener('touchend', (e) => {
        if (e.touches.length < 2) {
          activeTouch = false;
        }
      }, { passive: true });
    }

    // Double tap to toggle zoom
    let lastTap = 0;
    if (modalImg) {
      modalImg.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        if (tapLength < 300 && tapLength > 0) {
          e.preventDefault();
          if (zoomFactor > 1.0) {
            zoomFactor = 1.0;
          } else {
            zoomFactor = 2.0;
          }
          updateZoom();
        }
        lastTap = currentTime;
      });
    }
  }

  // Google Analytics Event Tracking Helper
  function trackEvent(name, params) {
    if (typeof gtag === 'function') {
      gtag('event', name, params);
    }
  }

  // Track WhatsApp button clicks
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (anchor && anchor.href && anchor.href.includes('wa.me')) {
      trackEvent('whatsapp_click', {
        event_category: 'Engagement',
        event_label: anchor.href,
        link_url: anchor.href
      });
    }
  });

  // Track outbound link clicks (excluding WhatsApp)
  document.addEventListener('click', (e) => {
    const anchor = e.target.closest('a');
    if (anchor && anchor.href && anchor.href.startsWith('http')) {
      try {
        const url = new URL(anchor.href);
        if (url.hostname !== window.location.hostname && !url.hostname.includes('wa.me')) {
          trackEvent('outbound_click', {
            event_category: 'Outbound',
            event_label: anchor.href,
            link_url: anchor.href
          });
        }
      } catch (err) {}
    }
  });

  // Track scroll depth (25%, 50%, 75%, 90%)
  let scrollThresholds = { 25: false, 50: false, 75: false, 90: false };
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    if (docHeight <= 0) return;
    const scrollPercent = Math.round((scrollTop / docHeight) * 100);

    [25, 50, 75, 90].forEach(threshold => {
      if (scrollPercent >= threshold && !scrollThresholds[threshold]) {
        scrollThresholds[threshold] = true;
        trackEvent('scroll_depth', {
          event_category: 'Engagement',
          event_label: `${threshold}%`,
          value: threshold
        });
      }
    });
  }, { passive: true });

  // Mobile Our Story "Read More" button expander
  const btnReadMore = document.getElementById('btn-read-more');
  if (btnReadMore) {
    btnReadMore.addEventListener('click', () => {
      const readMoreContent = document.querySelector('.story-read-more-content');
      if (readMoreContent) {
        readMoreContent.classList.add('expanded');
      }
      btnReadMore.style.display = 'none';
    });
  }
});
