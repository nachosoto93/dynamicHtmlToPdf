var express = require('express');
var app = express();
var fileUpload = require('express-fileupload');
var pdf = require('dynamic-html-pdf');

/* GET home page. */
app.use(fileUpload());
app.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

app.post('/', function(req,res){
    console.log(req)
     var options = {
        format: "A3",
        orientation: "portrait",
        border: "10mm"
     };


    var document = {
        template: JSON.stringify(req.files.template.data),
        type: 'buffer',
        context: JSON.stringify(req.body)
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
