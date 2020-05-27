const puppeteer = require('puppeteer');
const { createWriteStream } = require('fs');
const Stream = require('stream');

const arrayToFile = (array, filePath) => {


    return new Promise( (resolve, reject) => {
        try {
            const writable = createWriteStream(filePath, {flags:'w'})
            const readable = new Stream.Readable();
            readable._read = () => {
                for(let i=0; i<array.length; i++){
                    readable.push(`${array[i]}\n`);
                }
                readable.push(null) // to end the stream
            }
            readable.pipe(writable);
            resolve(`Writing Done: ${filePath}`);
        } catch (err) {
            reject(err);
        }
        
    })

}

// (async () => {
//     const browser = await puppeteer.launch();
//     const page = await browser.newPage();
//     // Drag and drop this JSON file to the DevTools Performance panel!
//     await page.tracing.start({ path: 'profile.json' });
//     await page.goto('https://ratehub.ca');
//     await page.tracing.stop();
//     await browser.close();
// })();

(async () => {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('https://pptr.dev');

    const metrics = await page.metrics();
    console.info(metrics);

    await browser.close();
})();
