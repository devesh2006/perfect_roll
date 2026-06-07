const fs = require('fs');

const products = [
  {
    id: 1,
    name: "PERFECT ROLL WHITE",
    tagline: "Experience the ultimate smooth, even burn.",
    imageAlt: "Perfect Roll White premium rolling papers with natural Arabic gum",
    images: [
      "images/2.webp",
      "images/5.webp",
      "images/7.webp"
    ],
    features: [
      "50 + 5 pre-rolled cones per pack",
      "Premium bleached white paper",
      "100% natural Arabic gum",
      "Ultra-thin slow burn technology",
      "Fully biodegradable and eco-friendly"
    ],
    priceRange: "₹825",
    color: "#e67e22",
    featured: true,
    badge: "Signature Collection",
    description: "Premium king-size pre-rolled cones crafted from high-quality bleached paper and natural Arabic gum. Designed for a smooth, slow, and consistent burn, delivering convenience and reliable performance in every pack.",
    specs: {
      "Size": "King Size",
      "Contents": "50+5 Cones",
      "Paper Type": "Premium Bleached Paper",
      "Gum Type": "Natural Arabic Gum",
      "Burn Profile": "Slow & Even Burn"
    },
    benefits: [
      "Ready-to-Fill Design",
      "Smooth Rolling Experience",
      "Consistent Performance",
      "Premium Paper Quality"
    ]
  },
  {
    id: 2,
    name: "PERFECT ROLL NATURAL",
    tagline: "Experience the organic, raw taste of unbleached paper.",
    imageAlt: "Perfect Roll Natural organic unbleached rolling papers with natural Arabic gum",
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
    priceRange: "₹825",
    color: "#5c4033",
    featured: true,
    badge: "Organic Premium",
    description: "Premium unbleached rolling papers crafted from natural fibers and organic Arabic gum. Designed for a smooth, slow, and clean burn, delivering a pure, chemical-free experience for rolling enthusiasts in every pack.",
    specs: {
      "Size": "Standard Size",
      "Contents": "2 Papers + 1 Filter Tip",
      "Paper Type": "Unbleached Natural Paper",
      "Gum Type": "Natural Arabic Gum",
      "Burn Profile": "Slow & Even Burn"
    },
    benefits: [
      "Raw & Unbleached",
      "Natural Gum Line",
      "Smooth Rolling Experience",
      "Slow & Consistent Burn"
    ]
  },
  {
    id: 3,
    name: "5 FRIEC WHITE",
    tagline: "Premium bleached white paper for a clean, pure experience.",
    imageAlt: "5 Friec White premium rolling papers with slow burn technology",
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
    priceRange: "₹450",
    color: "#bdc3c7",
    featured: false,
    badge: "Premium Choice",
    description: "Premium bleached white rolling papers crafted for a clean, pure smoking experience. Engineered with ultra-thin lightweight paper and natural Arabic gum, these papers ensure a slow, even, and consistent burn every time.",
    specs: {
      "Size": "Standard Size",
      "Contents": "50 Pcs Per Pack",
      "Paper Type": "Premium Bleached Paper",
      "Gum Type": "Natural Arabic Gum",
      "Burn Profile": "Slow & Even Burn"
    },
    benefits: [
      "Clean & Pure Experience",
      "Natural Arabic Gum",
      "Ultra-Thin Lightweight",
      "Consistent Slow Burn"
    ]
  },
  {
    id: 4,
    name: "5 FRIEC NATURAL",
    tagline: "Unbleached organic brown paper for a raw, natural experience.",
    imageAlt: "5 Friec Natural organic natural unbleached rolling papers with slow burn technology",
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
    priceRange: "₹450",
    color: "#8B5A2B",
    featured: true,
    badge: "Organic Choice",
    description: "Premium unbleached organic rolling papers crafted for a raw, natural smoking experience. Made from chemical-free organic fibers and 100% natural Arabic gum to ensure a slow, clean, and consistent burn.",
    specs: {
      "Size": "Standard Size",
      "Contents": "50 Pcs Per Pack",
      "Paper Type": "Unbleached Organic Paper",
      "Gum Type": "Natural Arabic Gum",
      "Burn Profile": "Slow & Even Burn"
    },
    benefits: [
      "Organic & Unbleached",
      "Chemical-Free Quality",
      "Clean & Slow Burn",
      "Consistent Performance"
    ]
  },
  {
    id: 5,
    name: "TWODAY WHITE",
    tagline: "Standard bleached white paper, clean and pure.",
    imageAlt: "Twoday White premium rolling papers with natural Arabic gum and filter tips",
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
    priceRange: "₹500",
    color: "#d4af37",
    featured: false,
    badge: "Connoisseur's Choice",
    description: "Premium bleached rolling papers with pre-rolled filter tips, crafted with natural Arabic gum. Designed for convenience and a smooth rolling experience, delivering a clean, slow, and consistent burn in every pack.",
    specs: {
      "Size": "Standard Size",
      "Contents": "50 Pcs Per Pack",
      "Paper Type": "Premium Bleached Paper",
      "Gum Type": "Natural Arabic Gum",
      "Burn Profile": "Slow & Even Burn"
    },
    benefits: [
      "Integrated Filter Tips",
      "Smooth Rolling Experience",
      "Premium Paper Quality",
      "Slow & Even Burn"
    ]
  },
  {
    id: 6,
    name: "TWODAY NATURAL",
    tagline: "Premium unbleached brown paper, earthy and smooth.",
    imageAlt: "Twoday Natural premium unbleached rolling papers with natural Arabic gum and filter tips",
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
    priceRange: "₹500",
    color: "#795548",
    featured: false,
    badge: "Earthy Choice",
    description: "Premium unbleached rolling papers with pre-rolled filter tips, crafted with natural Arabic gum. Designed for organic enthusiasts who value convenience, raw materials, and a smooth, slow, consistent burn.",
    specs: {
      "Size": "Standard Size",
      "Contents": "50 Pcs Per Pack",
      "Paper Type": "Unbleached Organic Paper",
      "Gum Type": "Natural Arabic Gum",
      "Burn Profile": "Slow & Even Burn"
    },
    benefits: [
      "Integrated Filter Tips",
      "Organic & Unbleached",
      "Smooth Rolling Experience",
      "Consistent Performance"
    ]
  }
];

const getProductSchemaJson = (productsList) => {
  return productsList.map(p => {
    let lowPrice = 0;
    let highPrice = 0;
    const rangeMatch = p.priceRange.match(/₹?(\d+)\s*-\s*₹?(\d+)/);
    if (rangeMatch) {
      lowPrice = parseInt(rangeMatch[1], 10);
      highPrice = parseInt(rangeMatch[2], 10);
    } else {
      const singleMatch = p.priceRange.match(/₹?(\d+)/);
      if (singleMatch) {
        lowPrice = parseInt(singleMatch[1], 10);
        highPrice = parseInt(singleMatch[1], 10);
      }
    }

    return {
      "@context": "https://schema.org",
      "@type": "Product",
      "name": p.name,
      "image": p.images.map(img => `https://www.princeperfectroll.com/${img}`),
      "description": p.description,
      "brand": {
        "@type": "Brand",
        "name": "Prince Perfect"
      },
      "offers": {
        "@type": "AggregateOffer",
        "priceCurrency": "INR",
        "lowPrice": lowPrice,
        "highPrice": highPrice,
        "offerCount": p.images.length,
        "availability": "https://schema.org/InStock"
      }
    };
  });
};

const productSchema = getProductSchemaJson(products);

const orgSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "name": "Prince Perfect Roll",
  "alternateName": "Prince Perfect",
  "url": "https://www.princeperfectroll.com",
  "logo": "https://www.princeperfectroll.com/images/2.webp",
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+91-9717990597",
    "contactType": "customer service",
    "areaServed": "IN",
    "availableLanguage": ["en", "hi"]
  },
  "sameAs": [
    "https://www.instagram.com/princeperfectroll",
    "https://www.facebook.com/princeperfectroll"
  ]
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "name": "Prince Perfect Roll",
  "url": "https://www.princeperfectroll.com",
  "potentialAction": {
    "@type": "SearchAction",
    "target": "https://www.princeperfectroll.com/products.html?q={search_term_string}",
    "query-input": "required name=search_term_string"
  }
};

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Prince Perfect Roll",
  "image": "https://www.princeperfectroll.com/images/2.webp",
  "telephone": "+919717990597",
  "email": "hello@princeperfectroll.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Gurgaon",
    "addressLocality": "Gurgaon",
    "addressRegion": "Delhi NCR",
    "addressCountry": "IN"
  },
  "priceRange": "₹"
};

const getBreadcrumbSchema = (crumbs) => {
  const itemListElement = crumbs.map((crumb, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": crumb.name,
    "item": crumb.url ? `https://www.princeperfectroll.com/${crumb.url}` : undefined
  }));

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": itemListElement
  };
};

const getHeadHtml = (title, description, pageUrl, pageSchemaType = 'WebPage', extraSchemas = []) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": pageSchemaType,
    "name": title,
    "description": description,
    "url": `https://www.princeperfectroll.com/${pageUrl}`,
    "publisher": {
      "@type": "Organization",
      "name": "Prince Perfect Roll",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.princeperfectroll.com/images/2.webp"
      }
    }
  };

  const combinedSchemas = [baseSchema];
  if (extraSchemas && extraSchemas.length > 0) {
    extraSchemas.forEach(schema => {
      if (schema) {
        combinedSchemas.push(schema);
      }
    });
  }

  const ageVerifyScript = pageUrl === 'index.html' ? '' : `
  <script>
    if (localStorage.getItem('age_verified') !== 'true') {
      window.location.href = 'index.html';
    }
  </script>`;

  return `
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title}</title>
  <meta name="description" content="${description}">
  <meta name="keywords" content="premium rolling papers, king size rolling papers, rolling paper cones, natural Arabic gum, flavored cones, smoking accessories, premium paper products, rolling papers India">
  <meta property="og:title" content="${title}">
  <meta property="og:description" content="${description}">
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://www.princeperfectroll.com/${pageUrl}">
  <meta property="og:image" content="https://www.princeperfectroll.com/images/2.webp">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${title}">
  <meta name="twitter:description" content="${description}">
  ${ageVerifyScript}
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="style.css?v=1.0.3">
  <script type="application/ld+json">
${JSON.stringify(combinedSchemas, null, 2)}
  </script>
</head>
`;
};

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
  <footer id="site-footer">
    <div class="container">
      <div class="footer-grid">
        <div class="footer-column brand-column">
          <h4 class="brand-title"><a href="home.html" class="logo">PRINCE PERFECT</a></h4>
          <p class="brand-description">Prince Perfect Roll manufactures premium rolling papers, king-size cones, flavored cones, and smoking accessories crafted with natural Arabic gum for a smooth, slow, and consistent burn experience across India.</p>
          <div class="footer-contact-info">
            <p><strong>WhatsApp:</strong> <a href="https://wa.me/+919717990597" target="_blank" rel="noopener noreferrer" aria-label="Chat with Prince Perfect Roll on WhatsApp" class="footer-contact-link">+91 9717990597</a></p>
            <p><strong>Email:</strong> <a href="mailto:hello@princeperfectroll.com" aria-label="Email Prince Perfect Roll" class="footer-contact-link">hello@princeperfectroll.com</a></p>
          </div>
        </div>
        <div class="footer-column links-column">
          <h4>QUICK LINKS</h4>
          <ul class="footer-links-list">
            <li><a href="home.html">Home</a></li>
            <li><a href="products.html">Products</a></li>
            <li><a href="about.html">Our Story</a></li>
            <li><a href="distributors.html">Distributors</a></li>
            <li><a href="contact.html">Contact</a></li>
          </ul>
        </div>
        <div class="footer-column social-column">
          <h4>FOLLOW US</h4>
          <div class="social-icons-wrapper">
            <a href="#" aria-label="Instagram" class="social-icon-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.051.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z"/></svg>
            </a>
            <a href="#" aria-label="Facebook" class="social-icon-link">
              <svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
            </a>
          </div>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2025–2026 Prince Perfect Roll. All Rights Reserved.</p>
        <p>18+ | Tobacco consumption is injurious to health.</p>
      </div>
    </div>
  </footer>
  <a href="https://wa.me/+919717990597" class="floating-wa" aria-label="Chat with us on WhatsApp" target="_blank" rel="noopener noreferrer">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="32" height="32" fill="white"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
  </a>
  <script src="script.js" defer></script>
`;

const makeSliderHtml = (p) => {
  return `
    <div class="product-gallery" data-images='${JSON.stringify(p.images)}'>
        <div class="image-container">
            <button class="prev-btn" aria-label="Previous image">&lsaquo;</button>
            <img id="mainProductImage" src="${p.images[0]}" alt="${p.imageAlt}" width="360" height="240" loading="lazy" />
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
          <div class="product-card" data-id="${p.id}" data-images='${JSON.stringify(p.images)}' data-alt="${p.imageAlt}" data-description="${encodeURIComponent(p.description)}" data-specs="${encodeURIComponent(JSON.stringify(p.specs))}" data-benefits="${encodeURIComponent(JSON.stringify(p.benefits))}" data-price="${p.priceRange}" style="background: var(--white); border-radius: var(--radius-lg); padding: 0 0 24px 0; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease; border-top: 4px solid ${p.color}; display: flex; flex-direction: column; justify-content: space-between;">
            <div style="display: flex; flex-direction: column; flex-grow: 1;">
              <div class="product-img-wrapper" style="position: relative; overflow: hidden; border-top-left-radius: var(--radius-lg); border-top-right-radius: var(--radius-lg); border-bottom-left-radius: 0; border-bottom-right-radius: 0; margin-bottom: 20px;">
                ${makeSliderHtml(p)}
                ${p.badge ? `<div class="badge" style="position: absolute; top: 16px; right: 16px; ${p.badge === 'Best Seller' ? 'background: var(--white); color: var(--gold); border: 1px solid var(--gold);' : 'background: var(--red); color: var(--white);'}">${p.badge}</div>` : ''}
              </div>
              <div style="padding: 0 24px; flex-grow: 1;">
                <h3 class="product-title" style="font-size: 1.5rem; margin-bottom: 8px; color: var(--black);">${p.name}</h3>
                <p style="color: #666; margin-bottom: 20px; font-size: 0.95rem; line-height: 1.5;">${p.tagline}</p>
              </div>
            </div>
            <div style="padding: 0 24px; margin-top: auto;">
              <a href="products.html" class="btn btn-gold-outline" style="width: 100%; display: block; text-align: center;">Explore Product</a>
            </div>
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
          <article class="product-card" data-id="${p.id}" data-images='${JSON.stringify(p.images)}' data-alt="${p.imageAlt}" data-description="${encodeURIComponent(p.description)}" data-specs="${encodeURIComponent(JSON.stringify(p.specs))}" data-benefits="${encodeURIComponent(JSON.stringify(p.benefits))}" data-price="${p.priceRange}" style="border-top: 4px solid ${p.color};">
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

const marqueeProductsHtml = [...products, ...products]
  .map(p => `
          <a href="products.html" class="product-item">
            <img src="${p.images[0]}" alt="${p.imageAlt}" width="80" height="80" loading="lazy" />
            <h4>${p.name}</h4>
          </a>
  `).join('\n');

const indexHtml = `<!DOCTYPE html>
<html lang="en">
${getHeadHtml('Age Verification | Prince Perfect Roll', 'Please verify that you are 18 years of age or older to access Prince Perfect Roll\'s premium rolling papers, pre-rolled cones, and smoking accessories.', 'index.html')}
<body class="age-gate-body">
  <div class="age-gate-wrapper">
    <div class="age-gate-content">
      <div class="age-gate-logo">Prince Perfect</div>
      <div class="age-gate-divider"></div>
      <h2>Age Verification</h2>
      <p id="age-gate-message">You must be 18 years of age or older to enter this website. Please verify your age to continue.</p>
      
      <div class="age-gate-actions" id="age-gate-buttons">
        <button class="btn btn-red btn-large" id="btn-verify-yes">Yes, I am 18+</button>
        <button class="btn btn-outline-light btn-large" id="btn-verify-no">No, I am under 18</button>
      </div>
    </div>
  </div>

  <script>
    if (localStorage.getItem('age_verified') === 'true') {
      window.location.href = 'home.html';
    }

    const btnYes = document.getElementById('btn-verify-yes');
    const btnNo = document.getElementById('btn-verify-no');
    const message = document.getElementById('age-gate-message');
    const buttonsContainer = document.getElementById('age-gate-buttons');

    btnYes.addEventListener('click', () => {
      localStorage.setItem('age_verified', 'true');
      window.location.href = 'home.html';
    });

    btnNo.addEventListener('click', () => {
      buttonsContainer.style.display = 'none';
      message.innerHTML = '<span class="denied-text">You are not old enough to view this website. Access Denied.</span>';
      message.style.color = '#B51F2E';
      message.style.fontSize = '1.3rem';
      message.style.fontWeight = '600';
    });
  </script>
</body>
</html>`;

const homeHtml = `<!DOCTYPE html>
<html lang="en">
${getHeadHtml('Home | Prince Perfect Roll', 'Prince Perfect Roll offers premium rolling papers, pre-rolled cones, and smoking accessories crafted with natural Arabic gum in India.', 'home.html', 'WebPage', [orgSchema, websiteSchema, localBusinessSchema])}
<body class="page-home">
  ${header}
  <main>
    <section id="hero" class="hero-section">
      <div class="hero-bg-accent"></div>
      <div class="hero-content">
        <div class="hero-text-wrapper">
          <div class="badge hero-badge gold-badge">Premium Collection</div>
          <h1 class="hero-title">The Art of<br><span class="gold-text">The Perfect Roll</span></h1>
          <p class="hero-sub">India's finest rolling papers, crafted for the true connoisseur. Experience a slow, even burn with 100% natural Arabic gum.</p>
          <div class="hero-ctas">
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

    <section class="product-marquee section reveal">
      <div class="container" style="text-align: center; margin-bottom: 40px;">
        <h2 class="section-title">Our Signature Range</h2>
        <p style="color: #666; font-size: 1.1rem; line-height: 1.6; max-width: 700px; margin: 20px auto 0;">Explore our premium rolling papers, king-size cones, ultra-thin rolling papers, and natural Arabic gum products designed for a smooth and consistent smoking experience.</p>
      </div>
      <div class="marquee-track-container" style="overflow: hidden; width: 100%; display: flex; position: relative; mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent); -webkit-mask-image: linear-gradient(to right, transparent, white 20%, white 80%, transparent);">
        <div class="marquee-track">
          ${marqueeProductsHtml}
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
${getHeadHtml('Products | Prince Perfect Roll', 'Explore Prince Perfect Roll\'s premium collection of rolling papers, king-size cones, and organic unbleached papers with natural Arabic gum.', 'products.html', 'WebPage', [orgSchema, websiteSchema, localBusinessSchema, ...productSchema, getBreadcrumbSchema([{name: 'Home', url: 'home.html'}, {name: 'Products', url: 'products.html'}])])}
<body class="page-products">
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
${getHeadHtml('Our Story | Prince Perfect Roll', 'Discover the craftsmanship behind Prince Perfect Roll. We make premium rolling papers and king-size pre-rolled cones for a clean, slow, and consistent burn.', 'about.html', 'WebPage', [orgSchema, websiteSchema, localBusinessSchema, getBreadcrumbSchema([{name: 'Home', url: 'home.html'}, {name: 'Our Story', url: 'about.html'}])])}
<body class="page-about">
  ${header}
  <main style="padding-top: var(--nav-height);">
    <section id="story" class="story-section section">
      <div class="container">
        <div style="text-align: center; margin-bottom: 56px;">
          <h2 class="section-title about-heading">Premium Rolling Papers Designed for a Superior Smoking Experience</h2>
          <p class="about-subtitle">Natural Arabic Gum • Slow Burn Technology • Premium Rolling Papers • King Size Cones</p>
        </div>
        <div class="story-split">
          <div class="story-text">
            <p>Prince Perfect Roll is dedicated to creating premium rolling papers that deliver consistency, smoothness, and reliability with every roll. Crafted using carefully selected materials and natural Arabic gum, our papers are designed for smokers who appreciate quality, precision, and an even burn.</p>
            <p>Whether you're looking for classic white rolling papers, natural brown papers, king-size cones, or innovative flavored options, every Prince Perfect Roll product is engineered to provide a cleaner, smoother, and slower-burning experience.</p>
            <p>Our commitment goes beyond manufacturing. We focus on delivering premium rolling accessories that combine quality craftsmanship, modern design, and dependable performance for rolling enthusiasts across India.</p>
            <div style="margin-top: 28px;">
              <a href="products.html" style="color: var(--gold); font-weight: 600; font-size: 1.1rem; display: inline-flex; align-items: center; gap: 8px; transition: color 0.3s; text-decoration: none;" onmouseover="this.style.color='var(--red)'" onmouseout="this.style.color='var(--gold)'">
                Explore Our Full Product Collection &rarr;
              </a>
            </div>
          </div>
          <div class="story-image">
            <img src="26.webp" alt="Prince Perfect Crafting" width="600" height="500" loading="lazy" style="width: 100%; height: auto; max-height: 500px; object-fit: contain; display: block; border-radius: var(--radius-lg); box-shadow: 0 20px 40px rgba(0,0,0,0.15);">
          </div>
        </div>
      </div>
    </section>

    <section id="why-us" class="why-us-section section">
      <div class="container">
        <h2 class="section-title">Why Choose Prince Perfect Roll?</h2>
        <div class="why-choose-list" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 24px; margin-top: 40px;">
          <div class="why-item" style="display: flex; align-items: center; gap: 16px; background: var(--white); padding: 20px 24px; border-radius: var(--radius-md); box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-left: 4px solid var(--gold);">
            <span style="color: var(--gold); font-size: 1.5rem; font-weight: bold;">✓</span>
            <span style="font-weight: 600; font-size: 1.1rem; color: var(--black);">Premium Quality Rolling Papers</span>
          </div>
          <div class="why-item" style="display: flex; align-items: center; gap: 16px; background: var(--white); padding: 20px 24px; border-radius: var(--radius-md); box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-left: 4px solid var(--gold);">
            <span style="color: var(--gold); font-size: 1.5rem; font-weight: bold;">✓</span>
            <span style="font-weight: 600; font-size: 1.1rem; color: var(--black);">Natural Arabic Gum for Secure Rolling</span>
          </div>
          <div class="why-item" style="display: flex; align-items: center; gap: 16px; background: var(--white); padding: 20px 24px; border-radius: var(--radius-md); box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-left: 4px solid var(--gold);">
            <span style="color: var(--gold); font-size: 1.5rem; font-weight: bold;">✓</span>
            <span style="font-weight: 600; font-size: 1.1rem; color: var(--black);">Slow & Even Burn Technology</span>
          </div>
          <div class="why-item" style="display: flex; align-items: center; gap: 16px; background: var(--white); padding: 20px 24px; border-radius: var(--radius-md); box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-left: 4px solid var(--gold);">
            <span style="color: var(--gold); font-size: 1.5rem; font-weight: bold;">✓</span>
            <span style="font-weight: 600; font-size: 1.1rem; color: var(--black);">King Size and Specialty Variants</span>
          </div>
          <div class="why-item" style="display: flex; align-items: center; gap: 16px; background: var(--white); padding: 20px 24px; border-radius: var(--radius-md); box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-left: 4px solid var(--gold);">
            <span style="color: var(--gold); font-size: 1.5rem; font-weight: bold;">✓</span>
            <span style="font-weight: 600; font-size: 1.1rem; color: var(--black);">Trusted by Thousands of Rolling Enthusiasts</span>
          </div>
          <div class="why-item" style="display: flex; align-items: center; gap: 16px; background: var(--white); padding: 20px 24px; border-radius: var(--radius-md); box-shadow: 0 4px 15px rgba(0,0,0,0.03); border-left: 4px solid var(--gold);">
            <span style="color: var(--gold); font-size: 1.5rem; font-weight: bold;">✓</span>
            <span style="font-weight: 600; font-size: 1.1rem; color: var(--black);">Designed for Consistent Performance</span>
          </div>
        </div>
      </div>
    </section>

    <section class="story-quote-section section">
      <div class="container">
        <blockquote class="story-quote-block">
          "Every great roll begins with exceptional paper. At Prince Perfect Roll, quality is not an option—it's our standard."
        </blockquote>
        <div class="story-quote-divider"></div>
        <div style="margin-top: 40px; text-align: center;">
          <a href="products.html" class="btn btn-red" style="display: inline-flex; align-items: center; gap: 8px;">Explore Our Full Product Collection &rarr;</a>
        </div>
      </div>
    </section>
  </main>
  ${footer}
</body>
</html>`;

const distributorsHtml = `<!DOCTYPE html>
<html lang="en">
${getHeadHtml('Distributors | Prince Perfect Roll', 'Partner with Prince Perfect Roll\'s distribution network in India. Wholesale orders and premium partnership opportunities for rolling papers and smoking accessories.', 'distributors.html', 'WebPage', [orgSchema, websiteSchema, localBusinessSchema, getBreadcrumbSchema([{name: 'Home', url: 'home.html'}, {name: 'Distributors', url: 'distributors.html'}])])}
<body class="page-distributors">
  ${header}
  <main style="padding-top: var(--nav-height);">
    <section id="distributors" class="distributor-section section reveal">
      <div class="container">
        <h2 class="section-title gold-text">Partner With Us</h2>
        <p style="color: #ccc; font-size: 1.15rem; max-width: 700px; margin: -10px auto 36px; line-height: 1.6;">Join the Prince Perfect Roll distribution network and bring premium rolling papers, king-size cones, and smoking accessories to customers across India.</p>
        <div class="distributor-perks">
          <div class="perk"><span class="icon gold">★</span> High Margins</div>
          <div class="perk"><span class="icon gold">★</span> Premium Brand Value</div>
          <div class="perk"><span class="icon gold">★</span> Dedicated Support</div>
        </div>
        <a href="https://wa.me/+919717990597" target="_blank" rel="noopener noreferrer" class="btn btn-red btn-large">Become a Distributor</a>
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

const faqSchemaObj = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How can I become a Prince Perfect Roll distributor?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "To become a distributor, contact our team via WhatsApp or email. We will provide product details, pricing, territory information, and onboarding support."
      }
    },
    {
      "@type": "Question",
      "name": "Do you offer wholesale orders?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes. We supply wholesale orders for retailers, distributors, and business partners across India. Contact us for pricing and minimum order quantities."
      }
    },
    {
      "@type": "Question",
      "name": "Which states do you serve?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Prince Perfect Roll products are available across multiple states in India, and our network continues to expand. Contact us to check availability in your region."
      }
    },
    {
      "@type": "Question",
      "name": "How quickly do you respond to inquiries?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Most WhatsApp inquiries receive a response within a few minutes during business hours."
      }
    },
    {
      "@type": "Question",
      "name": "How can I get product information or pricing?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Our team can provide product catalogs, specifications, and pricing details. Contact us through WhatsApp or email for assistance."
      }
    }
  ]
};

const contactHtml = `<!DOCTYPE html>
<html lang="en">
${getHeadHtml('Contact | Prince Perfect Roll', 'Get in touch with Prince Perfect Roll for customer support, wholesale orders, and distributor inquiries across India. We reply within minutes on WhatsApp.', 'contact.html', 'WebPage', [orgSchema, websiteSchema, localBusinessSchema, getBreadcrumbSchema([{name: 'Home', url: 'home.html'}, {name: 'Contact', url: 'contact.html'}]), faqSchemaObj])}
<body class="page-contact">
  ${header}
  <main style="padding-top: var(--nav-height);">
    <section id="contact" class="contact-section section reveal">
      <div class="container contact-split">
        <div class="contact-info">
          <h2 class="section-title">Get in Touch</h2>
          <p>Have questions or need assistance? Our team is ready to help you.</p>
          <p class="contact-seo-text">Contact Prince Perfect Roll for premium rolling papers, king-size cones, flavored cones, <a href="distributors.html" style="color: var(--gold); text-decoration: underline;">distribution inquiries</a>, wholesale orders, and customer support across India.</p>
          <ul class="contact-details">
            <li><strong>Email:</strong> <a href="mailto:hello@princeperfectroll.com" aria-label="Email Prince Perfect Roll" class="contact-link">hello@princeperfectroll.com</a></li>
            <li><strong>Phone:</strong> <a href="tel:+919717990597" aria-label="Call Prince Perfect Roll" class="contact-link">+91 9717990597</a></li>
            <li><strong>Location:</strong> Gurgaon, Delhi NCR, India</li>
          </ul>
          <div class="contact-help-container">
            <h3>How We Can Help</h3>
            <ul class="contact-help-list">
              <li><span class="checkmark">✓</span> Distributor Inquiries</li>
              <li><span class="checkmark">✓</span> Wholesale Orders</li>
              <li><span class="checkmark">✓</span> Product Support</li>
              <li><span class="checkmark">✓</span> Customer Assistance</li>
            </ul>
            <p class="contact-trust-line">Supporting customers, retailers, and distributors across India.</p>
          </div>
        </div>
        <div class="contact-card">
          <div class="whatsapp-card">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="#25D366" style="margin: 0 auto 24px; display: block;"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>
            <h3>Need quick answers?</h3>
            <p>We reply within minutes.</p>
            <a href="https://wa.me/+919717990597" class="btn btn-green" target="_blank" rel="noopener noreferrer">Chat on WhatsApp</a>
          </div>
        </div>
      </div>
    </section>
    
    <section id="faq" class="faq-section section reveal">
      <div class="container">
        <div class="section-header" style="text-align: center; margin-bottom: 48px;">
          <h2 class="section-title">Frequently Asked Questions</h2>
          <p class="section-subtitle">Got questions? We've got answers.</p>
        </div>
        <div class="faq-accordion">
          <details class="faq-item">
            <summary class="faq-question">How can I become a Prince Perfect Roll distributor? <span class="faq-icon"></span></summary>
            <div class="faq-answer">
              <p>To become a distributor, contact our team via WhatsApp or email. We will provide product details, pricing, territory information, and onboarding support.</p>
            </div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">Do you offer wholesale orders? <span class="faq-icon"></span></summary>
            <div class="faq-answer">
              <p>Yes. We supply wholesale orders for retailers, distributors, and business partners across India. Contact us for pricing and minimum order quantities.</p>
            </div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">Which states do you serve? <span class="faq-icon"></span></summary>
            <div class="faq-answer">
              <p>Prince Perfect Roll products are available across multiple states in India, and our network continues to expand. Contact us to check availability in your region.</p>
            </div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">How quickly do you respond to inquiries? <span class="faq-icon"></span></summary>
            <div class="faq-answer">
              <p>Most WhatsApp inquiries receive a response within a few minutes during business hours.</p>
            </div>
          </details>
          <details class="faq-item">
            <summary class="faq-question">How can I get product information or pricing? <span class="faq-icon"></span></summary>
            <div class="faq-answer">
              <p>Our team can provide product catalogs, specifications, and pricing details. Contact us through WhatsApp or email for assistance.</p>
            </div>
          </details>
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
