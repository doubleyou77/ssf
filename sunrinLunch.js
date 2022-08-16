const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ headless: false });
  try {
    const page = await browser.newPage();
    await page.goto('https://sunrint.sen.hs.kr/');
    const text = await page.evaluate(() => {
      const score = document.querySelector('.menu');
      if (score) {
        return score.textContent;
      }
    });
    console.log(text.trim());
  } catch (err){
    console.log(err);
  }
  await browser.close();
})()
