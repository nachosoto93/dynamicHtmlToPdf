var fs = require('fs');
var pdf = require('dynamic-html-pdf');


var html = fs.readFileSync('/Users/iguanafix/nodeJsDynamicPdf/views/test.html', 'utf8');






var options = {
    format: "A3",
    orientation: "portrait",
    border: "10mm"
};



var document = {
    template: html,
    context: {
        options: {
            fname: 'CheckList',
            mname: 'Leo',
            lname: 'Iguanas'
        },
        img: 'http://www.ruralagriventures.com/wp-content/uploads/2017/05/man-team.jpg'
    },
    path: "./output.pdf"
};





pdf.create(document, options)
    .then(res => {
    console.log(res)
})
.catch(error => {
    console.error(error)
});
