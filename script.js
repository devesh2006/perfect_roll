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
            <p id="modal-product-tagline" class="tagline">Product Tagline</p>
            <ul id="modal-product-features" class="modal-features">
              <!-- Dynamic features -->
            </ul>
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
    const modalTagline = modalOverlay.querySelector('#modal-product-tagline');
    const modalFeatures = modalOverlay.querySelector('#modal-product-features');
    const modalPrice = modalOverlay.querySelector('#modal-product-price');
    const modalWaBtn = modalOverlay.querySelector('#modal-product-wa-btn');
    
    function closeModal() {
      modalOverlay.classList.remove('active');
      document.body.style.overflow = '';
    }
    
    modalClose.addEventListener('click', closeModal);
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
    
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modalOverlay.classList.contains('active')) {
        closeModal();
      }
    });
    
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
        
        const priceEl = card.querySelector('.price-range');
        const priceText = priceEl ? priceEl.innerText : '₹20 - ₹100';
        
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
        
        modalTitle.innerText = titleText;
        modalTagline.innerText = taglineText;
        modalFeatures.innerHTML = featuresHtml;
        modalPrice.innerText = priceText;
        
        const waBaseUrl = 'https://wa.me/91XXXXXXXXXX'; 
        const messageText = encodeURIComponent(`Hi Prince Perfect! I am interested in ordering the "${titleText}" rolling paper (${priceText}). Please provide details on how to proceed.`);
        modalWaBtn.href = `${waBaseUrl}?text=${messageText}`;
        
        modalOverlay.classList.add('active');
        document.body.style.overflow = 'hidden';
      });
    });
  }
});
