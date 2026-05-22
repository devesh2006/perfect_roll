const fs = require('fs');
let f = fs.readFileSync('generate.js', 'utf8');

let start = f.indexOf('const indexHtml =');
let end = f.indexOf('const productsHtml =');

let newIndexHtml = `const indexHtml = \`<!DOCTYPE html>
<html lang="en">
\${head.replace('<title>Prince Perfect Roll</title>', '<title>Home | Prince Perfect Roll</title>')}
<body>
  \${header}
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
        <div class="hero-visual">
          <div class="visual-card">
            <div class="img-placeholder hero-main-img"></div>
            <div class="floating-badge badge-1">
              <span class="icon">🌿</span>
              <span>100% Natural</span>
            </div>
            <div class="floating-badge badge-2">
              <span class="icon">✨</span>
              <span>Ultra Thin</span>
            </div>
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
          
          <div class="product-card" style="background: var(--white); border-radius: var(--radius-lg); padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease;">
            <div class="product-img-wrapper" style="position: relative; overflow: hidden; border-radius: var(--radius-lg); margin-bottom: 24px;">
              <div class="img-placeholder" style="min-height: 250px; background: #f9f9f9; border: 1px solid #eee;"></div>
              <div class="badge" style="position: absolute; top: 16px; right: 16px; background: var(--white); color: var(--gold); border: 1px solid var(--gold);">Best Seller</div>
            </div>
            <h3 class="product-title" style="font-size: 1.5rem; margin-bottom: 12px; color: var(--black);">Twoday Classic</h3>
            <p style="color: #666; margin-bottom: 24px;">Our original white rolling papers. Pure, tasteless, and exceptionally smooth.</p>
            <a href="products.html" class="btn btn-gold-outline" style="width: 100%; display: block; text-align: center;">Explore Product</a>
          </div>

          <div class="product-card" style="background: var(--white); border-radius: var(--radius-lg); padding: 24px; box-shadow: 0 10px 30px rgba(0,0,0,0.05); transition: transform 0.3s ease;">
            <div class="product-img-wrapper" style="position: relative; overflow: hidden; border-radius: var(--radius-lg); margin-bottom: 24px;">
              <div class="img-placeholder" style="min-height: 250px; background: #f9f9f9; border: 1px solid #eee;"></div>
              <div class="badge" style="position: absolute; top: 16px; right: 16px; background: var(--red); color: var(--white);">New</div>
            </div>
            <h3 class="product-title" style="font-size: 1.5rem; margin-bottom: 12px; color: var(--black);">5 FRIEC Natural</h3>
            <p style="color: #666; margin-bottom: 24px;">Unbleached brown papers for the most authentic and raw smoking experience.</p>
            <a href="products.html" class="btn btn-gold-outline" style="width: 100%; display: block; text-align: center;">Explore Product</a>
          </div>

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
  \${footer}
</body>
</html>\`;

`;

f = f.substring(0, start) + newIndexHtml + f.substring(end);
f = f.replace("fs.writeFileSync('home.html', homeHtml);\n", "");
f = f.replace("fs.writeFileSync('home.html', indexHtml);\n", "");
f = f.replace("fs.writeFileSync('home.html', homeHtml);\r\n", "");
f = f.replace("fs.writeFileSync('home.html', indexHtml);\r\n", "");

fs.writeFileSync('generate.js', f);
