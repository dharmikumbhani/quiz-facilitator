const puppeteer = require('puppeteer')
const {tall} = require('tall')
const helpers = require("./helpers");

// const exampleForm = 'https://forms.gle/yYprqf6r6dHxfG2g8';
// const webcamScam = "https://benoitpasquier.com/webcam-utility-app-macos-swiftui/"
// https://flaviocopes.com/puppeteer/

var url = process.argv[2];
var func = process.argv[3];
if (func === "Q") {
    getGFQ(url);
} else if (func === "QwO" ) {
    getGFQwO(url);
} else {
    console.log("Please provide a valid function argument");
    console.log("Q -- for getting list of all questions");
    console.log("QwO -- for getting all questions with options");
}

async function getGFQ (url) {
    console.log(url)
    try {
        var unshortenedUrl = await tall(url);
        console.log('Tall url', unshortenedUrl);
    } catch (err) {
        console.error('AAAW 👻', err);
    }
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.goto(`${unshortenedUrl}`, {waitUntil: 'networkidle2'});
        
        const fullArray = await page.evaluate(() => FB_PUBLIC_LOAD_DATA_[1][1]);
        
        const filtered = fullArray.map(element => element[1]);

        helpers.printAllInConsole(filtered ,"onlyQ")
        await browser.close();
  
        return  filtered;
      }
      catch(err) {
        console.log(err)
        return err
      }
    
  }

async function getGFQwO (url) {
    console.log(url)
    try {
        var unshortenedUrl = await tall(url);
        console.log('Tall url', unshortenedUrl);
    } catch (err) {
        console.error('AAAW 👻', err);
    }
    try {
        const browser = await puppeteer.launch({
            headless: true,
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });

        const page = await browser.newPage();
        await page.goto(`${unshortenedUrl}`, {waitUntil: 'networkidle2'});
        
        const fullArray = await page.evaluate(() => FB_PUBLIC_LOAD_DATA_[1][1]);
        
        
        let qAndO = [];
        qAndO = fullArray.map(element => {
            // console.log("just 4", element[4]);
            // console.log("4 and 0", element[4][0])
            let options
            if (typeof element[4] !== 'undefined') {
                if (typeof element[4][0] !== 'undefined' || element[4][0] !== null) {
                    if (typeof element[4][0][1] !== 'undefined' || element[4][0][1] !== null)  {
                        let aOa = element[4][0][1]
                        if (aOa !== null) {
                            // console.log(aOa)
                            options = aOa.map(e => e[0]);
                        } else {
                            options = []
                        }
                    }
                }
            } else {
                options = []
            }
            return {
                q: element[1],
                ops: options
            }
        })

        helpers.printAllInConsole(qAndO, "qWithO")
        
        await browser.close();
  
        return qAndO;
      }
      catch(err) {
        console.log(err)
        return err
      }
    
  }