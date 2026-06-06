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
      <a href="index.html" class="logo">Prince Perfect</a>
      <nav id="main-nav">
        <ul>
          <li><a href="index.html">Home</a></li>
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
          <li><a href="index.html" class="mobile-link">Home</a></li>
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
          <a href="index.html" class="logo" style="font-size: 1.5rem; margin-bottom: 8px; display: block;">Prince Perfect</a>
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

const products = [
  {
    id: 1,
    name: "Perfect Roll White",
    tagline: "Experience the ultimate smooth, even burn.",
    images: [
      "images/2.webp",
      "images/5.webp",
      "images/7.webp"
    ],
    features: [
      "2 Rolling Papers + 1 Filter Tip per pack",
      "Premium bleached white paper",
      "100% natural Arabic gum",
      "Ultra-thin slow burn technology",
      "Fully biodegradable and eco-friendly"
    ],
    priceRange: "₹20 - ₹50",
    color: "#e67e22",
    featured: true,
    badge: "Signature Collection"
  },
  {
    id: 2,
    name: "Perfect Roll Brown",
    tagline: "Experience the organic, raw taste of unbleached paper.",
    images: [
      "images/13.webp",
      "images/12.webp",
      "images/21.webp"
    ],
    features: [
      "2 Rolling Papers + 1 Filter Tip per pack",
      "Premium unbleached organic brown paper",
      "100% natural Arabic gum",
      "Ultra-thin slow burn technology",
      "Fully biodegradable and eco-friendly"
    ],
    priceRange: "₹25 - ₹55",
    color: "#5c4033",
    featured: true,
    badge: "Organic Premium"
  },
  {
    id: 3,
    name: "5 FRIEC WHITE",
    tagline: "Premium bleached white paper for a clean, pure experience.",
    images: [
      "images/22.webp",
      "images/24.webp"
    ],
    features: [
      "Premium bleached white paper",
      "100% natural Arabic gum",
      "Ultra-thin lightweight paper",
      "Slow, clean, even burn",
      "Chemical-free manufacturing"
    ],
    priceRange: "₹25 - ₹55",
    color: "#bdc3c7",
    featured: true,
    badge: "Premium Choice"
  },
  {
    id: 4,
    name: "5 FRIEC BROWN",
    tagline: "Unbleached organic brown paper for a raw, natural experience.",
    images: [
      "images/18.webp",
      "images/15.webp",
      "images/19.webp"
    ],
    features: [
      "Unbleached organic natural brown paper",
      "100% organic natural Arabic gum",
      "Ultra-thin lightweight paper",
      "Slow, clean, even burn",
      "Chemical-free and chlorine-free manufacturing"
    ],
    priceRange: "₹30 - ₹60",
    color: "#8B5A2B",
    featured: true,
    badge: "Organic Choice"
  },
  {
    id: 5,
    name: "TWODAY WHITE",
    tagline: "Standard bleached white paper, clean and pure.",
    images: [
      "images/16.webp",
      "images/1.webp",
      "images/17.webp"
    ],
    features: [
      "2 Rolling Papers + 2 Filter Tips per pack",
      "Premium quality bleached white paper",
      "100% natural Arabic gum",
      "Ultra-thin slow burn technology",
      "Fully biodegradable packaging"
    ],
    priceRange: "₹25 - ₹55",
    color: "#d4af37",
    featured: true,
    badge: "Connoisseur's Choice"
  },
  {
    id: 6,
    name: "TWODAY BROWN",
    tagline: "Premium unbleached brown paper, earthy and smooth.",
    images: [
      "images/10.webp",
      "images/9.webp",
      "images/8.webp"
    ],
    features: [
      "2 Rolling Papers + 2 Filter Tips per pack",
      "Premium quality unbleached brown paper",
      "100% natural Arabic gum",
      "Ultra-thin slow burn technology",
      "Fully biodegradable packaging"
    ],
    priceRange: "₹25 - ₹55",
    color: "#795548",
    featured: true,
    badge: "Earthy Choice"
  }
];

const makeSliderHtml = (p) => {
  return `
    <div class="product-gallery" data-images='${JSON.stringify(p.images)}'>
        <div class="image-container">
            <button class="prev-btn" aria-label="Previous image">&lsaquo;</button>
            <img id="mainProductImage" src="${p.images[0]}" alt="${p.name}" />
            <button class="next-btn" aria-label="Next image">&rsaquo;</button>
        </div>
        <div class="gallery-dots">
            ${p.images.map((_, i) => `<span class="gallery-dot ${i === 0 ? 'active' : ''}" data-index="${i}"></span>`).join('')}
        </div>
    </div>
  `;
};

const featuredHtmlList = products.length === 0
  ? `
          <div style="grid-column: 1 / -1; text-align: center; padding: 60px 24px; color: #666; background: var(--white); border-radius: var(--radius-lg); box-shadow: 0 10px 30px rgba(0,0,0,0.05);">
            <span style="font-size: 3rem; margin-bottom: 20px; display: block;">✨</span>
            <h3 style="font-family: var(--font-heading); color: var(--black); font-size: 1.5rem; margin-bottom: 12px;">Premium Catalog Coming Soon</h3>
            <p style="max-width: 500px; margin: 0 auto; line-height: 1.6;">We are currently updating our signature collection with new premium products. Stay tuned!</p>
          </div>
  `
  : products
      .filter(p => p.featured)
      .map(p => `
          <div class="product-card" data-id="${p.id}" data-images='${JSON.stringify(p.images)}' style="background: var(--white); border-radius: var(--radius-lg); padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease; border-top: 4px solid ${p.color};">
            <div class="product-img-wrapper" style="position: relative; overflow: hidden; border-radius: var(--radius-lg); margin-bottom: 24px;">
              ${makeSliderHtml(p)}
              ${p.badge ? `<div class="badge" style="position: absolute; top: 16px; right: 16px; ${p.badge === 'Best Seller' ? 'background: var(--white); color: var(--gold); border: 1px solid var(--gold);' : 'background: var(--red); color: var(--white);'}">${p.badge}</div>` : ''}
            </div>
            <h3 class="product-title" style="font-size: 1.5rem; margin-bottom: 12px; color: var(--black);">${p.name}</h3>
            <p style="color: #666; margin-bottom: 24px;">${p.tagline}</p>
            <a href="products.html" class="btn btn-gold-outline" style="width: 100%; display: block; text-align: center;">Explore Product</a>
          </div>
      `).join('\n');

const productsHtmlList = products.length === 0
  ? `
          <div style="grid-column: 1 / -1; text-align: center; padding: 80px 24px; color: #666; background: var(--white); border-radius: var(--radius-lg); box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
            <span style="font-size: 3.5rem; margin-bottom: 24px; display: block;">⏳</span>
            <h3 style="font-family: var(--font-heading); color: var(--black); font-size: 1.8rem; margin-bottom: 12px;">Catalog Under Updates</h3>
            <p style="max-width: 500px; margin: 0 auto; line-height: 1.6;">Our new collection of premium rolling papers and accessories is launching soon. For distributor inquiries, please visit our <a href="distributors.html" style="color: var(--gold); font-weight: 600;">Partners page</a>.</p>
          </div>
  `
  : products
      .map(p => `
          <article class="product-card" data-id="${p.id}" data-images='${JSON.stringify(p.images)}' style="border-top: 4px solid ${p.color};">
            <div class="card-img-container">
              ${makeSliderHtml(p)}
            </div>
            <div class="card-content">
              <h3>${p.name}</h3>
              <p class="tagline">"${p.tagline}"</p>
              <ul class="features-list">
                ${p.features.map(f => `<li>${f}</li>`).join('\n')}
              </ul>
              <div class="card-footer">
                <span class="price-range">${p.priceRange}</span>
                <button class="btn btn-red">Order Now</button>
              </div>
            </div>
          </article>
      `).join('\n');

const indexHtml = `<!DOCTYPE html>
<html lang="en">
${head.replace('<title>Prince Perfect Roll</title>', '<title>Home | Prince Perfect Roll</title>')}
<body>
  ${header}
  <main>
    <section id="hero" class="hero-section" style="justify-content: center; text-align: center;">
      <div class="hero-bg-accent" style="left: 50%; transform: translateX(-50%); width: 80%; height: 100%; top: 0;"></div>
      <div class="hero-content" style="justify-content: center;">
        <div class="hero-text-wrapper" style="max-width: 800px; display: flex; flex-direction: column; align-items: center; justify-content: center;">
          <div class="badge hero-badge gold-badge">Premium Collection</div>
          <h1 class="hero-title" style="text-align: center;">The Art of<br><span class="gold-text">The Perfect Roll</span></h1>
          <p class="hero-sub" style="margin: 0 auto 40px; text-align: center;">India's finest rolling papers, crafted for the true connoisseur. Experience a slow, even burn with 100% natural Arabic gum.</p>
          <div class="hero-ctas" style="justify-content: center;">
            <a href="products.html" class="btn btn-red btn-large">Shop Collection</a>
            <a href="#showcase" class="btn btn-outline-light">Discover Range</a>
          </div>
        </div>
      </div>
    </section>

    <section id="showcase" class="products-showcase section reveal" style="background: var(--cream); padding-top: 80px;">
      <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 60px;">
          <h2 class="section-title">Signature Collection</h2>
          <p class="section-subtitle">Discover our meticulously crafted rolling papers.</p>
        </div>
        <div class="products-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 40px;">
          ${featuredHtmlList}
        </div>
        <div style="text-align: center; margin-top: 60px;">
            <a href="products.html" class="btn btn-red btn-large">View All Products</a>
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
          <div class="stat-number" data-target="6" data-suffix="">0</div>
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
          ${productsHtmlList}
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
          <img src="images/3.webp" alt="Prince Perfect Crafting" style="width: 100%; height: 400px; object-fit: cover; display: block;">
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
fs.writeFileSync('products.html', productsHtml);
fs.writeFileSync('about.html', aboutHtml);
fs.writeFileSync('distributors.html', distributorsHtml);
fs.writeFileSync('contact.html', contactHtml);
console.log('Pages generated successfully!');
