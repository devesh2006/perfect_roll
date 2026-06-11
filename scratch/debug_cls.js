const puppeteer = require('puppeteer');

(async () => {
  console.log('Launching Puppeteer browser...');
  const browser = await puppeteer.launch({
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  await page.setViewport({ width: 800, height: 600 });

  try {
    console.log('Visiting page to set age verification...');
    await page.goto('http://127.0.0.1:8081/', { waitUntil: 'domcontentloaded' });
    await page.evaluate(() => {
      localStorage.setItem('age_verified', 'true');
    });

    console.log('Testing Products Page CLS details during interaction...');
    await page.goto('http://127.0.0.1:8081/', { waitUntil: 'networkidle2' });

    // Set up observer in browser
    await page.evaluate(() => {
      window.shiftDetails = [];
      const observer = new PerformanceObserver((list) => {
        for (const entry of list.getEntries()) {
          // Log even if it had recent input, to see what shifted during the transition!
          window.shiftDetails.push({
            value: entry.value,
            hadRecentInput: entry.hadRecentInput,
            sources: entry.sources.map(s => {
              let identifier = 'unknown';
              if (s.node) {
                identifier = s.node.nodeName;
                if (s.node.className) identifier += '.' + s.node.className.split(' ').join('.');
                if (s.node.id) identifier += '#' + s.node.id;
              }
              return {
                node: identifier,
                prevRect: `${s.previousRect.top},${s.previousRect.left} size ${s.previousRect.width}x${s.previousRect.height}`,
                currRect: `${s.currentRect.top},${s.currentRect.left} size ${s.currentRect.width}x${s.currentRect.height}`
              };
            })
          });
        }
      });
      observer.observe({type: 'layout-shift', buffered: true});
    });

    // Wait a brief moment for page load shifts
    await new Promise(r => setTimeout(r, 1000));

    const shifts = await page.evaluate(() => window.shiftDetails);
    console.log('Layout Shifts observed:', JSON.stringify(shifts, null, 2));

  } catch (error) {
    console.error('Error during testing:', error);
  } finally {
    await browser.close();
    console.log('Browser closed.');
  }
})();
