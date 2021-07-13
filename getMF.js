const puppeteer = require('puppeteer')
const {tall} = require('tall')
const helpers = require("./helpers");

// Microsoft forms - Only people in my organisation can respond wont work
// const microsoftForm = 'https://forms.office.com/Pages/ResponsePage.aspx?id=SEPx0bXxCUqsmX6_ITy8ga3_Z9XVSDZBrlkGj2ihlnlUQ0lQQlZSTDVOQ0tMT1lCMEVNSDlRSVpIQS4u'

// const webcamScam = "https://benoitpasquier.com/webcam-utility-app-macos-swiftui/"

var url = process.argv[2]
var func = process.argv[3];
if (func === "Q") {
    getMFQ(url);
} else if (func === "QwO" ) {
    getMFQwO(url);
} else {
    console.log("Please provide a valid function argument");
    console.log("Q -- for getting list of all questions");
    console.log("QwO -- for getting all questions with options");
}

async function getMFQ (url) {
    console.log(url);
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

        // const nodes = await page.evaluate(() => document.querySelectorAll(".office-form-question-content > div > div > div > span:nth-child(2)"));
        await page.waitForTimeout(5000);

        // let arrOfQues = await page.evaluate(() => [...document.querySelectorAll('.office-form-question-content > div > div > div > span:nth-child(2)')].map(span => span.innerText))
        let arrOfQues = await page.evaluate(() => [...document.querySelectorAll('.text-format-content')].map(span => span.innerText))
        // console.log(arrOfQues);
        
        helpers.printAllInConsole(arrOfQues, "onlyQ")

        await browser.close();
  
        return  arrOfQues;
      }
      catch(err) {
        console.log(err)
        return err
      }
    
  }

async function getMFQwO (url) {
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

        await page.waitForTimeout(5000);

        var qAndO = []

        // let arrOfQuesContent = await page.evaluate(() => [...document.querySelectorAll('.office-form-question-content > div > div > span:nth-child(2)')].map(span => span.innerText))
        qAndO = await page.evaluate(() => 
        [...document.querySelectorAll('.office-form-question-content')].map(element => {
                let q = ''
                q = element.querySelector('.office-form-question-title > span > span:nth-child(2)').innerText
                let ops = []
                optNodes = [...element.querySelectorAll('.office-form-question-choice > div > label > span > span')]
                ops = optNodes.map(element => element.innerText)
                return {q, ops}
            })
        )
        console.log(qAndO);

        // Trying to get all the options of all the questions not just the first section
        // qAndO = await page.evaluate(() => 
        // [...document.querySelectorAll('.text-format-content')].map(element => {
        //         let q = ''
        //         q = element.innerText
        //         let ops = []
        //         optNodes = [...element.parentElement.parentElement.parentElement.parentElement.parentElement.querySelectorAll('.office-form-question-choice')]
        //         ops = optNodes.map(element => element.innerText)
        //         return {q, ops}
        //     })
        // )
        // console.log(qAndO);

        helpers.printAllInConsole(qAndO, "qWithO")

        await browser.close();
  
        return  qAndO;
      }
      catch(err) {
        console.log(err)
        return err
      }
    
  }
// getMFQwO();