const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://sunrint.sen.hs.kr/');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();
