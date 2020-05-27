const {writeFile} = require('fs');
const {promisify} = require('util');
const pWriteFile = promisify(writeFile);

const puppeteer = require('puppeteer');
const lighthouse = require('lighthouse');
const {URL} = require('url');

(async() => {
  const url = 'https://ratehub.ca';

  // Use Puppeteer to launch headful Chrome and don't use its default 800x600 viewport.
  const browser = await puppeteer.launch({
    headless: false,
    defaultViewport: null,
  });
  //console.log(browser.wsEndpoint())
    // ws://127.0.0.1:39189/devtools/browser/fdf2f10c-797f-4554-82b4-1895168ef968
  //console.log(new URL(browser.wsEndpoint()));
    // URL {
    //   href: 'ws://127.0.0.1:43495/devtools/browser/c57f93e8-df8c-4d85-9b6f-bb75761983eb',
    //   origin: 'ws://127.0.0.1:43495',
    //   protocol: 'ws:',
    //   username: '',
    //   password: '',
    //   host: '127.0.0.1:43495',
    //   hostname: '127.0.0.1',
    //   port: '43495',
    //   pathname: '/devtools/browser/c57f93e8-df8c-4d85-9b6f-bb75761983eb',
    //   search: '',
    //   searchParams: URLSearchParams {},
    //   hash: ''
    // }
  const {lhr, report} = await lighthouse(url, {
    port: (new URL(browser.wsEndpoint())).port,
    output: 'html',
  });

  await browser.close();
  
  console.log(`Lighthouse scores:\n${Object.keys(lhr.categories).map(key => {return `${key}:${lhr.categories[key]['score']}`}).join('\n')}`);

  await pWriteFile("out.html", report);

  await pWriteFile("output.json", JSON.stringify(lhr),'utf8', (err) => {
      if(err !== null)
        return console.error(err);
  })
})();

