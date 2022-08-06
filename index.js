const puppeteer = require('puppeteer');

const crawler = async (name) => {
  try {
    const browser = await puppeteer.launch({ headless: false });
    const page = await browser.newPage();
    await page.setViewport({
      width: 1920,
      height: 1080,
    });
    await page.goto('https://www.aladin.co.kr/search/wsearchresult.aspx?SearchTarget=All&SearchWord='+name+'&x=0&y=0');
    
    let result = [];
    while(result.length < 100) {
      try {
        const text = await page.evaluate(() => {
          const Feed = document.querySelector('.ss_book_list .bo3').textContent;
          return Feed;
        });
        result.push(text);
        await page.evaluate(() => {
          const Feed = document.querySelector('.ss_book_list .bo3');
          Feed.parentNode.removeChild(Feed);
        });
      } catch (err) {
        break;
      }
    }
    
    console.log(result);
    await page.goto('http://reading.ssem.or.kr/r/newReading/search/schoolSearchForm.jsp');
    await page.waitForTimeout(1000);
    await page.type('#schoolSearch', '선린인터넷고등학교');
    await page.waitForTimeout(1000);
    await page.click('.material-icons');
    await page.waitForTimeout(1000);
    await page.click('.school_name>a');
    
    await page.waitForSelector('#searchCon1');
    let i = 0
    while(i < result.length) {
      await page.waitForSelector('#searchCon1');
      await page.evaluate(() => {
        document.querySelector('#searchCon1').value = "";
      });
      await page.type('#searchCon1', result[i]);
      await page.waitForTimeout(1000);
      await page.click('.book_search > div.btn_search_box > button');
      await page.waitForSelector('.bd_list.bd_book_list.school_lib');
      let recommend = await page.evaluate(() => {
        if(!document.querySelector('.bd_list.bd_book_list.school_lib').textContent.includes('검색결과가 없습니다.')) {
          let title = document.querySelector('.bd_list_title').textContent;
          title = title.replaceAll('\t', '').replaceAll('\n', '');
          let number = document.querySelector('.bd_list_year').textContent;
          number = number.replaceAll('\t', '').replaceAll('\n', '');
          return {title, number};
        }
      });
      if (recommend != undefined) {
        console.log(recommend.title+'(이)라는 책이 도서관에 있어요! 청구기호는 '+recommend.number+'입니다');
        await browser.close();
        process.exit()
      }
      await page.waitForTimeout(1000);
      i++;
    }
    console.log('아쉽지만 책을 찾지못했어요');
    await browser.close();
  } catch (err) {
    console.error(err);
  }
}

crawler('프로그래밍');
