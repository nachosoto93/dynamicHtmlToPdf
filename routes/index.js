var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
var bodyParser = require('body-parser')
const puppeteer = require('puppeteer');
const handlebars = require("handlebars");

/* GET home page. */
app.use(fileUpload());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))

app.post('/', function(req,res){
     var options = {
        format: "A3",
        orientation: "portrait",
        border: "0"
     };

    var html = req.files.template.data.toString('utf8')
    var json = req.body.pdfJson;


    (async () => {
        const browser = await puppeteer.launch()
    const page = await browser.newPage()


    var template = handlebars.compile(html);
    var finalHtml = template(JSON.parse(json));

    console.log(finalHtml);

    await page.setContent(finalHtml)
    const buffer = await page.pdf(options);
    console.log(buffer)
    res.type('application/pdf')
    res.send(buffer)

    browser.close()
})()



});

module.exports = app;
