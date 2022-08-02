// const puppeteer = require('puppeteer');

// const crawler = async (name) => {
//   try {
//     const browser = await puppeteer.launch({ headless: false });
//     const page = await browser.newPage();
//     await page.setViewport({
//       width: 1920,
//       height: 1080,
//     });
//     await page.goto('https://poro.gg/summoner/kr/'+name);
    
//     let result = [];
//     while(result.length < 20) {
//       const text = await page.evaluate(() => {
//         const Feed = document.querySelector('div.flex.flex-row.items-center > strong > span').textContent;
//         return Feed;
//       });
//       result.push(text);
//       await page.evaluate(() => {
//         let Feed = document.querySelector('div.flex.flex-row.items-center > strong > span');
//         Feed.parentNode.removeChild(Feed);
//         Feed = document.querySelector('div.flex.flex-row.items-center > strong > span');
//         Feed.parentNode.removeChild(Feed);
//       });
//     }
//     console.log(result);
//     let win = 0;
//     result.forEach((r, i) => {
//       if (r == "승리") {
//         win++;
//       }
//     })
//     let rate = win/20 *100;
//     console.log(name+'의 최근 20게임 승률은'+rate+'%입니다.');
//     await browser.close();
//   } catch (err) {
//     console.error(err);
//   }

  
// }

// crawler('더블은못날아');