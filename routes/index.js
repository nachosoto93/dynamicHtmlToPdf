var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
var pdf = require('dynamic-html-pdf');
var bodyParser = require('body-parser')

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
        border: "10mm"
     };
    var html = req.files.template.data.toString('utf8')
    var json = req.body.pdfJson;

    var document = {
        template: html,
        type: 'buffer',
        context: JSON.parse(json)

    };

    pdf.create(document, options)
        .then(response => {
            console.log(response)
            res.send(response)
        })
        .catch(error => {
                console.error(error)
        });


});

module.exports = app;
