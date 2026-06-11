const puppeteer = require('puppeteer');
const http = require('http');
const fs = require('fs');
const path = require('path');
// We can use http-server or simple node server

// Create a simple HTTP server to serve files for testing
const PORT = 8082;
const server = http.createServer((req, res) => {
  let filePath = '.' + req.url;
  if (filePath === './') {
    filePath = './index.html';
  }
  // Remove query parameters
  filePath = filePath.split('?')[0];

  const extname = String(path.extname(filePath)).toLowerCase();
  const mimeTypes = {
    '.html': 'text/html',
    '.js': 'text/javascript',
    '.css': 'text/css',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpeg',
    '.gif': 'image/gif',
    '.webp': 'image/webp',
    '.svg': 'image/svg+xml',
    '.ico': 'image/x-icon',
    '.pdf': 'application/pdf',
  };

  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code == 'ENOENT') {
        res.writeHead(404);
        res.end('File not found');
      } else {
        res.writeHead(500);
        res.end('Sorry, check with the site admin for error: ' + error.code + ' ..\n');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, async () => {
  console.log(`Test server running at http://localhost:${PORT}`);
  
  let success = true;
  
  try {
    console.log('Launching Puppeteer browser...');
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    // Set age verified in localStorage first
    const page = await browser.newPage();
    await page.goto(`http://localhost:${PORT}/verify.html`);
    await page.evaluate(() => {
      localStorage.setItem('age_verified', 'true');
    });

    // TEST 1: Mobile Viewport on Our Story Page
    console.log('--- TEST 1: Mobile Viewport on about.html ---');
    const mobilePage = await browser.newPage();
    await mobilePage.setViewport({ width: 375, height: 667 });
    await mobilePage.goto(`http://localhost:${PORT}/about.html`, { waitUntil: 'networkidle2' });

    // Verify Read More button exists and is visible
    const mobileBtnStyle = await mobilePage.evaluate(() => {
      const btn = document.getElementById('btn-read-more');
      if (!btn) return 'NOT_FOUND';
      return window.getComputedStyle(btn).display;
    });
    console.log('Mobile "Read More" button display:', mobileBtnStyle);
    if (mobileBtnStyle === 'none' || mobileBtnStyle === 'NOT_FOUND') {
      console.error('ERROR: Mobile "Read More" button is not visible or missing.');
      success = false;
    }

    // Verify Read More Content is hidden
    const mobileContentStyle = await mobilePage.evaluate(() => {
      const content = document.querySelector('.story-read-more-content');
      if (!content) return 'NOT_FOUND';
      return window.getComputedStyle(content).display;
    });
    console.log('Mobile "Read More" content display initially:', mobileContentStyle);
    if (mobileContentStyle !== 'none') {
      console.error('ERROR: Mobile "Read More" content is visible initially.');
      success = false;
    }

    // Click the Read More button
    console.log('Clicking the Read More button...');
    await mobilePage.click('#btn-read-more');
    await new Promise(r => setTimeout(r, 500)); // wait for fade in

    // Verify button is now hidden and content is visible
    const mobileBtnStyleAfter = await mobilePage.evaluate(() => {
      const btn = document.getElementById('btn-read-more');
      return window.getComputedStyle(btn).display;
    });
    const mobileContentStyleAfter = await mobilePage.evaluate(() => {
      const content = document.querySelector('.story-read-more-content');
      return window.getComputedStyle(content).display;
    });
    console.log('Mobile button display after click:', mobileBtnStyleAfter);
    console.log('Mobile content display after click:', mobileContentStyleAfter);
    if (mobileBtnStyleAfter !== 'none') {
      console.error('ERROR: Mobile button is not hidden after click.');
      success = false;
    }
    if (mobileContentStyleAfter === 'none') {
      console.error('ERROR: Mobile content is still hidden after click.');
      success = false;
    }

    // TEST 2: Desktop Viewport on Our Story Page
    console.log('--- TEST 2: Desktop Viewport on about.html ---');
    const desktopPage = await browser.newPage();
    await desktopPage.setViewport({ width: 1200, height: 800 });
    await desktopPage.goto(`http://localhost:${PORT}/about.html`, { waitUntil: 'networkidle2' });

    // Verify button is hidden on desktop
    const desktopBtnStyle = await desktopPage.evaluate(() => {
      const btn = document.getElementById('btn-read-more');
      if (!btn) return 'NOT_FOUND';
      return window.getComputedStyle(btn).display;
    });
    console.log('Desktop "Read More" button display:', desktopBtnStyle);
    if (desktopBtnStyle !== 'none') {
      console.error('ERROR: Desktop "Read More" button should be hidden.');
      success = false;
    }

    // Verify Content is visible on desktop
    const desktopContentStyle = await desktopPage.evaluate(() => {
      const content = document.querySelector('.story-read-more-content');
      if (!content) return 'NOT_FOUND';
      return window.getComputedStyle(content).display;
    });
    console.log('Desktop "Read More" content display:', desktopContentStyle);
    if (desktopContentStyle === 'none') {
      console.error('ERROR: Desktop story content should be visible by default.');
      success = false;
    }

    // TEST 3: Global Heading Underline Verification
    console.log('--- TEST 3: Heading Underline Verification ---');
    const testPages = ['index.html', 'products.html', 'about.html', 'distributors.html', 'documentation.html'];
    for (const pageName of testPages) {
      console.log(`Checking page: ${pageName}`);
      const checkPage = await browser.newPage();
      await checkPage.goto(`http://localhost:${PORT}/${pageName}`, { waitUntil: 'domcontentloaded' });
      
      const underlineCheck = await checkPage.evaluate(() => {
        const titles = Array.from(document.querySelectorAll('.section-title, .about-heading'));
        const docHeroTitles = Array.from(document.querySelectorAll('.doc-hero .section-title'));
        const allChecked = [...titles, ...docHeroTitles];
        
        let hasUnderline = false;
        const details = [];
        
        allChecked.forEach(el => {
          const afterStyle = window.getComputedStyle(el, '::after');
          const hasContent = afterStyle.content && afterStyle.content !== 'none' && afterStyle.content !== '""' && afterStyle.content !== '';
          const hasHeight = parseFloat(afterStyle.height) > 0;
          const hasWidth = parseFloat(afterStyle.width) > 0;
          
          if (hasContent && (hasHeight || afterStyle.position === 'absolute')) {
            // Underline pseudo elements usually have position absolute and content
            hasUnderline = true;
            details.push({
              tag: el.tagName,
              text: el.innerText.substring(0, 30),
              afterContent: afterStyle.content,
              afterWidth: afterStyle.width,
              afterHeight: afterStyle.height
            });
          }
        });
        
        return { hasUnderline, details };
      });
      
      console.log(`  Underline elements found:`, underlineCheck.hasUnderline);
      if (underlineCheck.hasUnderline) {
        console.error(`  ERROR: Underline styles detected on heading elements on page ${pageName}:`, underlineCheck.details);
        success = false;
      }
      await checkPage.close();
    }

    await browser.close();
  } catch (err) {
    console.error('Test execution failed:', err);
    success = false;
  } finally {
    server.close(() => {
      console.log('Test server stopped.');
      if (success) {
        console.log('ALL TESTS PASSED SUCCESSFULLY!');
        process.exit(0);
      } else {
        console.error('SOME TESTS FAILED.');
        process.exit(1);
      }
    });
  }
});
