const fs = require('fs');

const head = `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>Prince Perfect Roll</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
</head>
`;

const header = `
  <header id="site-header">
    <div class="header-container">
      <a href="home.html" class="logo">Prince Perfect</a>
      <nav id="main-nav">
        <ul>
          <li><a href="home.html">Home</a></li>
          <li><a href="products.html">Products</a></li>
          <li><a href="about.html">Our Story</a></li>
          <li><a href="distributors.html">Distributors</a></li>
          <li><a href="contact.html">Contact</a></li>
        </ul>
      </nav>
      <div class="header-actions">
        <a href="contact.html" class="wa-cta">WhatsApp Us</a>
        <button id="mobile-menu-btn" aria-label="Toggle menu">
          <span class="bar"></span>
          <span class="bar"></span>
          <span class="bar"></span>
        </button>
      </div>
    </div>
    <div id="mobile-nav-overlay">
        <ul>
          <li><a href="home.html" class="mobile-link">Home</a></li>
          <li><a href="products.html" class="mobile-link">Products</a></li>
          <li><a href="about.html" class="mobile-link">Our Story</a></li>
          <li><a href="distributors.html" class="mobile-link">Distributors</a></li>
          <li><a href="contact.html" class="mobile-link">Contact</a></li>
        </ul>
    </div>
  </header>
`;

const footer = `
  <footer id="site-footer" style="padding: 40px 0 20px;">
    <div class="container">
      <div class="footer-grid" style="display: flex; flex-wrap: wrap; justify-content: space-between; align-items: center; gap: 24px;">
        <div class="footer-brand">
          <a href="home.html" class="logo" style="font-size: 1.5rem; margin-bottom: 8px; display: block;">Prince Perfect</a>
          <p style="color: #999; font-size: 0.9rem;">Premium rolling papers by Twoday.</p>
        </div>
        <div class="footer-links" style="display: flex; gap: 24px; flex-wrap: wrap;">
          <a href="products.html" style="color: var(--white); font-size: 0.9rem; text-transform: uppercase;">Products</a>
          <a href="about.html" style="color: var(--white); font-size: 0.9rem; text-transform: uppercase;">Our Story</a>
          <a href="distributors.html" style="color: var(--white); font-size: 0.9rem; text-transform: uppercase;">Distributors</a>
        </div>
        <div class="footer-social" style="display: flex; gap: 16px;">
          <a href="#" style="color: var(--gold); font-weight: bold; font-size: 1.2rem;">IG</a>
          <a href="#" style="color: var(--gold); font-weight: bold; font-size: 1.2rem;">FB</a>
        </div>
      </div>
      <div class="footer-bottom" style="margin-top: 32px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 16px; display: flex; flex-wrap: wrap; justify-content: space-between; color: #666; font-size: 0.8rem; gap: 16px;">
        <p>&copy; 2026 Prince Perfect Roll. All rights reserved.</p>
        <p>18+ | Tobacco consumption is injurious to health.</p>
      </div>
    </div>
  </footer>
  <a href="https://wa.me/91XXXXXXXXXX" class="floating-wa" aria-label="Chat with us on WhatsApp" target="_blank" rel="noopener noreferrer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
  <script src="script.js" defer></script>
`;

const indexHtml = `<!DOCTYPE html>
<html lang="en">
${head.replace('<title>Prince Perfect Roll</title>', '<title>Landing | Prince Perfect Roll</title>')}
<style>
    body {
        background-color: var(--black);
        color: var(--white);
        display: flex;
        align-items: center;
        justify-content: center;
        height: 100vh;
        margin: 0;
        overflow: hidden;
        background-image: repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(200, 168, 107, 0.05) 10px, rgba(200, 168, 107, 0.05) 20px);
    }
    .landing-card {
        background: rgba(17, 17, 17, 0.95);
        border: 1px solid var(--gold);
        padding: clamp(2rem, 5vw, 4rem);
        text-align: center;
        border-radius: var(--radius-md);
        max-width: 400px;
        width: 90%;
        animation: fadeIn 1s ease;
    }
    .landing-card h1 {
        font-size: 2rem;
        color: var(--gold);
        margin-bottom: 12px;
    }
    .landing-card p {
        margin-bottom: 32px;
        color: #ccc;
    }
    .btn-group {
        display: flex;
        flex-direction: column;
        gap: 16px;
    }
    .logo-placeholder {
        font-family: var(--font-heading);
        font-size: 24px;
        color: var(--gold);
        border: 1px solid var(--gold);
        padding: 12px;
        display: inline-block;
        margin-bottom: 24px;
        border-radius: var(--radius-sm);
    }
    @keyframes fadeIn {
        from { opacity: 0; transform: scale(0.9); }
        to { opacity: 1; transform: scale(1); }
    }
</style>
<body>
    <div class="landing-card">
        <div class="logo-placeholder">PRINCE PERFECT</div>
        <h1>Are you 18 or older?</h1>
        <p>You must be of legal smoking age to enter this site.</p>
        <div class="btn-group">
            <button id="btn-enter" class="btn btn-red">Yes, I'm 18+</button>
            <button id="btn-exit" class="btn btn-outline">No, exit</button>
        </div>
    </div>
    <script>
        document.getElementById('btn-enter').addEventListener('click', () => {
            localStorage.setItem('ageVerified', 'true');
            window.location.href = 'home.html';
        });
        document.getElementById('btn-exit').addEventListener('click', () => {
            window.location.href = 'https://www.google.com';
        });
        if (localStorage.getItem('ageVerified') === 'true') {
            window.location.href = 'home.html';
        }
    </script>
</body>
</html>`;

const homeHtml = `<!DOCTYPE html>
<html lang="en">
${head.replace('<title>Prince Perfect Roll</title>', '<title>Home | Prince Perfect Roll</title>')}
<body>
  ${header}
  <main>
    <section id="hero" class="hero-section section">
      <div class="hero-content">
        <div>
          <div class="badge hero-badge">100% Natural Arabic Gum</div>
          <h1 class="hero-title">Roll It Perfect.<br>Every Time.</h1>
          <p class="hero-sub">India's premium rolling paper — precision crafted for a smooth, slow burn.</p>
          <div class="hero-ctas">
            <a href="products.html" class="btn btn-red">Shop Now</a>
            <a href="products.html" class="btn btn-gold-outline">See Products</a>
          </div>
        </div>
        <div class="hero-images">
          <div class="img-placeholder" style="min-height: 400px; width: 100%;"></div>
        </div>
      </div>
    </section>

    <section class="trust-bar section">
      <div class="trust-marquee">
        <div class="trust-marquee-inner">
          <div class="trust-item"><span class="icon gold">✦</span> Natural Arabic Gum</div>
          <div class="trust-item"><span class="icon gold">✦</span> Slow Burn</div>
          <div class="trust-item"><span class="icon gold">✦</span> Precision Cut</div>
          <div class="trust-item"><span class="icon gold">✦</span> 18+ Certified</div>
          <div class="trust-item duplicate-item"><span class="icon gold">✦</span> Natural Arabic Gum</div>
          <div class="trust-item duplicate-item"><span class="icon gold">✦</span> Slow Burn</div>
          <div class="trust-item duplicate-item"><span class="icon gold">✦</span> Precision Cut</div>
          <div class="trust-item duplicate-item"><span class="icon gold">✦</span> 18+ Certified</div>
        </div>
      </div>
    </section>

    <section id="stats" class="stats-section section reveal">
      <div class="container stats-grid">
        <div class="stat-item">
          <div class="stat-number" data-target="500" data-suffix="K+">0</div>
          <div class="stat-label">Happy Rollers</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-target="2" data-suffix="">0</div>
          <div class="stat-label">Signature Products</div>
        </div>
        <div class="stat-item">
          <div class="stat-number" data-target="18" data-suffix="+">0</div>
          <div class="stat-label">States Served</div>
        </div>
      </div>
    </section>

    <section class="why-us-section section reveal" style="background: var(--white);">
      <div class="container">
        <h2 class="section-title">Why Choose Us</h2>
        <div class="features-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 40px; margin-top: 40px;">
          <div class="feature-item" style="text-align: center; padding: 32px; background: var(--cream); border-radius: var(--radius-lg); transition: transform 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <div class="feature-icon" style="font-size: 3rem; margin-bottom: 24px;">🌿</div>
            <h4>Natural Gum</h4>
            <p>Sticks first time, every time.</p>
          </div>
          <div class="feature-item" style="text-align: center; padding: 32px; background: var(--cream); border-radius: var(--radius-lg); transition: transform 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <div class="feature-icon" style="font-size: 3rem; margin-bottom: 24px;">⏳</div>
            <h4>Slow Even Burn</h4>
            <p>Engineered consistency for perfect moments.</p>
          </div>
          <div class="feature-item" style="text-align: center; padding: 32px; background: var(--cream); border-radius: var(--radius-lg); transition: transform 0.3s; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <div class="feature-icon" style="font-size: 3rem; margin-bottom: 24px;">✨</div>
            <h4>Ultra-Thin Paper</h4>
            <p>No taste interference, purely tobacco.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  ${footer}
</body>
</html>`;

const productsHtml = `<!DOCTYPE html>
<html lang="en">
${head.replace('<title>Prince Perfect Roll</title>', '<title>Products | Prince Perfect Roll</title>')}
<body>
  ${header}
  <main style="padding-top: var(--nav-height);">
    <section id="products" class="products-section section reveal">
      <div class="container">
        <h2 class="section-title">Our Products</h2>
        <div class="products-grid">
          <article class="product-card card-twoday">
            <div class="card-img-container">
              <div class="img-placeholder" style="min-height: 250px; width: 100%;"></div>
            </div>
            <div class="card-content">
              <h3>TWODAY</h3>
              <p class="tagline">"Your daily two."</p>
              <ul class="features-list">
                <li>2 rolling papers + 1 filter</li>
                <li>White Paper</li>
                <li>Natural Arabic Gum</li>
              </ul>
              <div class="card-footer">
                <span class="price-range">₹20 - ₹50</span>
                <button class="btn btn-red">Order Now</button>
              </div>
            </div>
          </article>
          <article class="product-card card-friec">
            <div class="card-img-container">
              <div class="img-placeholder" style="min-height: 250px; width: 100%;"></div>
            </div>
            <div class="card-content">
              <h3>5 FRIEC</h3>
              <p class="tagline">"5 a day, every day."</p>
              <ul class="features-list">
                <li>5 rolling papers + filters</li>
                <li>Natural/Brown Paper</li>
                <li>Premium positioning</li>
              </ul>
              <div class="card-footer">
                <span class="price-range">₹30 - ₹80</span>
                <button class="btn btn-red">Order Now</button>
              </div>
            </div>
          </article>
          <article class="product-card" style="border-top: 4px solid var(--black);">
            <div class="card-img-container">
              <div class="img-placeholder" style="min-height: 250px; width: 100%;"></div>
            </div>
            <div class="card-content">
              <h3>5 FRIEC Rolling Paper</h3>
              <p class="tagline">"The classic choice."</p>
              <ul class="features-list">
                <li>Standard rolling papers</li>
                <li>Slow burn technology</li>
                <li>Natural Arabic Gum</li>
              </ul>
              <div class="card-footer">
                <span class="price-range">₹40 - ₹90</span>
                <button class="btn btn-red">Order Now</button>
              </div>
            </div>
          </article>
          <article class="product-card" style="border-top: 4px solid var(--gold);">
            <div class="card-img-container">
              <div class="img-placeholder" style="min-height: 250px; width: 100%;"></div>
            </div>
            <div class="card-content">
              <h3>Perfect Roll</h3>
              <p class="tagline">"Precision in every roll."</p>
              <ul class="features-list">
                <li>Ultra-thin paper</li>
                <li>Unbleached, natural</li>
                <li>King Size Slim</li>
              </ul>
              <div class="card-footer">
                <span class="price-range">₹50 - ₹100</span>
                <button class="btn btn-red">Order Now</button>
              </div>
            </div>
          </article>
          <article class="product-card" style="border-top: 4px solid var(--gold);">
            <div class="card-img-container">
              <div class="img-placeholder" style="min-height: 250px; width: 100%;"></div>
            </div>
            <div class="card-content">
              <h3>Perfect Roll Gold</h3>
              <p class="tagline">"The premium experience."</p>
              <ul class="features-list">
                <li>Exclusive Gold Edition</li>
                <li>Includes premium tips</li>
                <li>Luxury packaging</li>
              </ul>
              <div class="card-footer">
                <span class="price-range">₹100 - ₹250</span>
                <button class="btn btn-red">Order Now</button>
              </div>
            </div>
          </article>
        </div>
      </div>
    </section>
  </main>
  ${footer}
</body>
</html>`;

const aboutHtml = `<!DOCTYPE html>
<html lang="en">
${head.replace('<title>Prince Perfect Roll</title>', '<title>Our Story | Prince Perfect Roll</title>')}
<body>
  ${header}
  <main style="padding-top: var(--nav-height);">
    <section id="story" class="story-section section reveal">
      <div class="container story-split">
        <div class="story-text">
          <h2 class="section-title">Crafted for the Discerning Roller</h2>
          <p>Prince Perfect by Twoday was born from a simple desire: to elevate the rolling experience. We noticed that truly premium papers were hard to find or overpriced, so we created our own. With a commitment to natural ingredients and precision engineering, we deliver papers that respect your tobacco.</p>
          <blockquote>"We believe every tobacco moment deserves the perfect paper."</blockquote>
        </div>
        <div class="story-image">
          <div class="img-placeholder" style="min-height: 400px; width: 100%;"></div>
        </div>
      </div>
    </section>

    <section id="why-us" class="why-us-section section reveal">
      <div class="container">
        <h2 class="section-title">Why Choose Us</h2>
        <div class="features-grid">
          <div class="feature-item">
            <div class="feature-icon">🌿</div>
            <h4>Natural Gum</h4>
            <p>Sticks first time, every time.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">⏳</div>
            <h4>Slow Even Burn</h4>
            <p>Engineered consistency for perfect moments.</p>
          </div>
          <div class="feature-item">
            <div class="feature-icon">✨</div>
            <h4>Ultra-Thin Paper</h4>
            <p>No taste interference, purely tobacco.</p>
          </div>
        </div>
      </div>
    </section>
  </main>
  ${footer}
</body>
</html>`;

const distributorsHtml = `<!DOCTYPE html>
<html lang="en">
${head.replace('<title>Prince Perfect Roll</title>', '<title>Distributors | Prince Perfect Roll</title>')}
<body>
  ${header}
  <main style="padding-top: var(--nav-height);">
    <section id="distributors" class="distributor-section section reveal">
      <div class="container">
        <h2 class="section-title gold-text">Partner With Us</h2>
        <div class="distributor-perks">
          <div class="perk"><span class="icon gold">★</span> High Margins</div>
          <div class="perk"><span class="icon gold">★</span> Premium Brand Value</div>
          <div class="perk"><span class="icon gold">★</span> Dedicated Support</div>
        </div>
        <button id="open-dist-modal" class="btn btn-red btn-large">Become a Distributor</button>
      </div>
    </section>
  </main>
  ${footer}

  <!-- DISTRIBUTOR FORM MODAL -->
  <div id="distributor-modal" class="modal-overlay">
    <div class="modal-card">
      <button id="close-dist-modal" class="close-btn" aria-label="Close modal">&times;</button>
      <h2>Become a Distributor</h2>
      <p>Join our growing network of premium partners.</p>
      <form id="distributor-form">
        <div class="form-group">
          <label for="d-name">Full Name</label>
          <input type="text" id="d-name" required>
        </div>
        <div class="form-group">
          <label for="d-business">Business Name</label>
          <input type="text" id="d-business" required>
        </div>
        <div class="form-group">
          <label for="d-city">City</label>
          <input type="text" id="d-city" required>
        </div>
        <div class="form-group">
          <label for="d-phone">Phone Number</label>
          <input type="tel" id="d-phone" required>
        </div>
        <div class="form-group">
          <label for="d-email">Email Address</label>
          <input type="email" id="d-email" required>
        </div>
        <button type="submit" class="btn btn-red btn-full">Submit Application</button>
      </form>
    </div>
  </div>
</body>
</html>`;

const contactHtml = `<!DOCTYPE html>
<html lang="en">
${head.replace('<title>Prince Perfect Roll</title>', '<title>Contact | Prince Perfect Roll</title>')}
<body>
  ${header}
  <main style="padding-top: var(--nav-height);">
    <section id="contact" class="contact-section section reveal">
      <div class="container contact-split">
        <div class="contact-info">
          <h2 class="section-title">Get in Touch</h2>
          <p>Have questions or need assistance? Our team is ready to help you.</p>
          <ul class="contact-details">
            <li><strong>Email:</strong> hello@princeperfectroll.com</li>
            <li><strong>Phone:</strong> +91 XXXXXXXXXX</li>
            <li><strong>Location:</strong> Mumbai, Maharashtra, India</li>
          </ul>
        </div>
        <div class="contact-card">
          <div class="whatsapp-card">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="#25D366" style="margin: 0 auto 24px; display: block;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <h3>Need quick answers?</h3>
            <p>We reply within minutes.</p>
            <a href="https://wa.me/91XXXXXXXXXX" class="btn btn-green">Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
  </main>
  ${footer}
</body>
</html>`;

fs.writeFileSync('index.html', indexHtml);
fs.writeFileSync('home.html', homeHtml);
fs.writeFileSync('products.html', productsHtml);
fs.writeFileSync('about.html', aboutHtml);
fs.writeFileSync('distributors.html', distributorsHtml);
fs.writeFileSync('contact.html', contactHtml);
console.log('Pages generated successfully!');
