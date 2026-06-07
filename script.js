document.addEventListener('DOMContentLoaded', () => {

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
    
    const mobileLinks = document.querySelectorAll('.mobile-link');
    mobileLinks.forEach(link => {
      link.addEventListener('click', toggleMenu);
    });
  }

  // Interactive Hero mouse-tracking glow
  const heroSection = document.getElementById('hero');
  if (heroSection) {
    heroSection.addEventListener('mousemove', (e) => {
      const rect = heroSection.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      heroSection.style.setProperty('--mouse-x', `${(x / rect.width) * 100}%`);
      heroSection.style.setProperty('--mouse-y', `${(y / rect.height) * 100}%`);
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

  // Distributor Modal
  const distBtn = document.getElementById('open-dist-modal');
  const distModal = document.getElementById('distributor-modal');
  const closeDistModal = document.getElementById('close-dist-modal');
  const distForm = document.getElementById('distributor-form');

  if (distBtn && distModal) {
    const distTrap = setupFocusTrap(distModal, closeDistModal);

    distBtn.addEventListener('click', () => {
      distTrap.open();
    });

    if (distForm) {
      distForm.addEventListener('submit', (e) => {
        e.preventDefault();
        alert('Application submitted successfully! We will contact you soon.');
        distTrap.close();
        distForm.reset();
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
    
    const activeImg = gallery.querySelector('#mainProductImage');
    const prevBtn = gallery.querySelector('.prev-btn');
    const nextBtn = gallery.querySelector('.next-btn');
    const dots = gallery.querySelectorAll('.gallery-dot');
    
    let currentIndex = 0;
    let isTransitioning = false;
    
    function updateImage() {
      if (!activeImg || isTransitioning) return;
      isTransitioning = true;
      
      // Add fade-out transition class
      activeImg.classList.add('fade-out');
      
      // Update dots immediately
      dots.forEach((dot, idx) => {
        dot.classList.toggle('active', idx === currentIndex);
      });
      
      // Wait 150ms to swap src, then fade back in
      setTimeout(() => {
        activeImg.src = images[currentIndex];
        activeImg.onload = () => {
          activeImg.classList.remove('fade-out');
          isTransitioning = false;
        };
        // Fallback in case loading takes too long or fails
        setTimeout(() => {
          if (isTransitioning) {
            activeImg.classList.remove('fade-out');
            isTransitioning = false;
          }
        }, 150);
      }, 150);
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isTransitioning) return;
        currentIndex = (currentIndex + 1) % images.length;
        updateImage();
      });
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isTransitioning) return;
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        updateImage();
      });
    }
    
    // Dot clicks
    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isTransitioning) return;
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
        if (isTransitioning) return;
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
            
            <div class="product-modal-specs-wrapper" style="margin-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 12px;">
              <h4 class="modal-section-title">SPECIFICATIONS</h4>
              <ul id="modal-product-specs" class="modal-specs">
                <!-- Dynamic specifications -->
              </ul>
            </div>

            <div class="product-modal-benefits-wrapper" style="margin-top: 12px; border-top: 1px solid rgba(255, 255, 255, 0.05); padding-top: 12px;">
              <h4 class="modal-section-title">WHY CHOOSE IT</h4>
              <ul id="modal-product-benefits" class="modal-benefits">
                <!-- Dynamic benefits -->
              </ul>
            </div>
            <div class="product-modal-footer">
              <div class="product-modal-price">
                <span class="price-label">Estimated Price</span>
                <span id="modal-product-price" class="price-val">₹20 - ₹50</span>
              </div>
              <a href="#" id="modal-product-wa-btn" target="_blank" rel="noopener noreferrer" class="product-modal-cta">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="20" height="20" fill="currentColor" style="margin-right: 4px; vertical-align: middle;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
                Order via WhatsApp
              </a>
            </div>
          </div>
        </div>
      `;
      document.body.appendChild(modalOverlay);
    }
    
    const modalClose = modalOverlay.querySelector('.product-modal-close');
    const modalImgSide = modalOverlay.querySelector('.product-modal-img-side');
    const modalTitle = modalOverlay.querySelector('#modal-product-title');
    const modalPrice = modalOverlay.querySelector('#modal-product-price');
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
        
        const featuresEl = card.querySelector('.features-list');
        let featuresHtml = '';
        if (featuresEl) {
          featuresHtml = featuresEl.innerHTML;
        } else {
          featuresHtml = `
            <li>Natural Arabic Gum</li>
            <li>Ultra-Thin slow burn paper</li>
            <li>Premium quality materials</li>
          `;
        }
        
        const altText = card.getAttribute('data-alt') || titleText;
        
        const priceText = card.getAttribute('data-price') || '₹20 - ₹100';
        
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
        let modalTransitioning = false;

        function updateModalImage() {
          const activeImg = modalImgSide.querySelector('#mainProductImage');
          const modalDots = modalImgSide.querySelectorAll('.gallery-dot');
          if (!activeImg || modalTransitioning) return;
          modalTransitioning = true;

          activeImg.classList.add('fade-out');

          modalDots.forEach((dot, idx) => {
            dot.classList.toggle('active', idx === activeIndex);
          });

          setTimeout(() => {
            activeImg.src = images[activeIndex];
            activeImg.onload = () => {
              activeImg.classList.remove('fade-out');
              modalTransitioning = false;
            };
            setTimeout(() => {
              if (modalTransitioning) {
                activeImg.classList.remove('fade-out');
                modalTransitioning = false;
              }
            }, 150);
          }, 150);
        }

        if (images.length > 1) {
          modalImgSide.innerHTML = `
            <div class="product-gallery">
                <div class="image-container">
                    <button class="prev-btn" aria-label="Previous image">&lsaquo;</button>
                    <img id="mainProductImage" src="${images[0]}" alt="${altText}" />
                    <button class="next-btn" aria-label="Next image">&rsaquo;</button>
                </div>
                <div class="gallery-dots">
                    ${images.map((_, i) => `<span class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
                </div>
            </div>
          `;

          const prevBtn = modalImgSide.querySelector('.prev-btn');
          const nextBtn = modalImgSide.querySelector('.next-btn');
          const modalDots = modalImgSide.querySelectorAll('.gallery-dot');

          prevBtn.onclick = (e) => {
            e.stopPropagation();
            if (modalTransitioning) return;
            activeIndex = (activeIndex - 1 + images.length) % images.length;
            updateModalImage();
          };

          nextBtn.onclick = (e) => {
            e.stopPropagation();
            if (modalTransitioning) return;
            activeIndex = (activeIndex + 1) % images.length;
            updateModalImage();
          };

          modalDots.forEach(dot => {
            dot.onclick = (e) => {
              e.stopPropagation();
              if (modalTransitioning) return;
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
              if (modalTransitioning) return;
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
              <img id="mainProductImage" src="${images[0] || ''}" alt="${altText}">
            </div>
          `;
        }
        
        if (modalTitle) modalTitle.innerText = titleText;
        if (modalPrice) modalPrice.innerText = priceText;

        const modalDescription = modalOverlay.querySelector('#modal-product-description');
        const modalSpecsList = modalOverlay.querySelector('#modal-product-specs');
        const modalBenefitsList = modalOverlay.querySelector('#modal-product-benefits');

        if (modalDescription) {
          modalDescription.innerHTML = descriptionText.replace(/\n\n/g, '<br><br>');
        }
        
        if (modalSpecsList) {
          modalSpecsList.innerHTML = Object.entries(specs).map(([key, val]) => `<li><strong>${key}:</strong> ${val}</li>`).join('');
        }
        
        if (modalBenefitsList) {
          modalBenefitsList.innerHTML = benefits.map(b => `<li>${b}</li>`).join('');
        }
        
        const waBaseUrl = 'https://wa.me/+919717990597'; 
        const messageText = encodeURIComponent(`Hi Prince Perfect! I am interested in ordering the "${titleText}" rolling paper (${priceText}). Please provide details on how to proceed.`);
        modalWaBtn.href = `${waBaseUrl}?text=${messageText}`;
        
        productDetailTrap.open();
      });
    });
  }
});
