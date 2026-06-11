const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching Puppeteer browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  const consoleErrors = [];
  const failedRequests = [];
  const networkRequests = [];

  page.on('console', msg => {
    // Only care about console errors, excluding the meta frame-ancestors warning (as we fixed it!)
    if (msg.type() === 'error') {
      consoleErrors.push(msg.text());
    }
  });

  page.on('request', request => {
    networkRequests.push(request.url());
  });

  page.on('requestfailed', request => {
    if (request.url().includes('127.0.0.1:8081')) {
      failedRequests.push(`${request.url()} failed: ${request.failure().errorText}`);
    }
  });

  try {
    console.log('Visiting page to set age verification...');
    await page.goto('http://127.0.0.1:8081/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.setItem('age_verified', 'true');
    });

    console.log('Testing Home Page...');
    await page.goto('http://127.0.0.1:8081/', { waitUntil: 'networkidle2' });
    
    // Check favicon request status in Puppeteer
    const hasFaviconInNetwork = networkRequests.some(url => url.includes('favicon.ico'));
    console.log(`Favicon in network requests list: ${hasFaviconInNetwork}`);
    
    // Verify CSS/JS paths
    const assets = await page.evaluate(() => {
      const styles = Array.from(document.querySelectorAll('link[rel="stylesheet"], link[rel="preload"][as="style"]'))
        .map(l => l.getAttribute('href'));
      const scripts = Array.from(document.querySelectorAll('script'))
        .map(s => s.getAttribute('src'))
        .filter(src => src);
      return { styles, scripts };
    });
    console.log('Stylesheets detected:', assets.styles);
    console.log('Scripts detected:', assets.scripts);

    // Verify critical inlined CSS exists
    const hasInlineStyles = await page.evaluate(() => {
      const styles = Array.from(document.querySelectorAll('style'));
      return styles.some(s => s.textContent.includes('--font-heading') || s.textContent.includes('body'));
    });
    console.log(`Inlined critical CSS present: ${hasInlineStyles}`);

    // Let's check for layout shifts (CLS) by measuring layout shifts on page load
    const cls = await page.evaluate(() => {
      let cumulativeLayoutShiftScore = 0;
      new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          if (!entry.hadRecentInput) {
            cumulativeLayoutShiftScore += entry.value;
          }
        }
      }).observe({type: 'layout-shift', buffered: true});
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(cumulativeLayoutShiftScore);
        }, 500);
      });
    });
    console.log('Cumulative Layout Shift (CLS) score on page load:', cls);

    // Verify GTM is NOT loaded initially
    let hasGtmLoaded = networkRequests.some(url => url.includes('googletagmanager.com/gtag/js'));
    console.log(`GTM script loaded initially: ${hasGtmLoaded}`);

    // Trigger an interaction to load GTM
    console.log('Simulating mouse movement to trigger GTM load...');
    await page.mouse.move(100, 100);
    // Wait a brief moment for dynamic injection
    await new Promise(r => setTimeout(r, 500));

    hasGtmLoaded = networkRequests.some(url => url.includes('googletagmanager.com/gtag/js'));
    console.log(`GTM script loaded after interaction: ${hasGtmLoaded}`);

    // Log console errors and failed requests
    if (consoleErrors.length > 0) {
      console.error('Console errors detected:', consoleErrors);
    } else {
      console.log('No console errors found!');
    }

    if (failedRequests.length > 0) {
      console.error('Failed local network requests:', failedRequests);
    } else {
      console.log('All local network requests completed successfully!');
    }

  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
})();
