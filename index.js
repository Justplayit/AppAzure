var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var bodyParser = require('body-parser');
var formidable = require('formidable');
var fs = require('fs');

app.use(bodyParser.urlencoded({ extended: false }));

try {
    server.listen(process.env.PORT || 1337);

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', function (request, response) {
        if (request) {
            console.log(request);
        }
        response.sendFile(__dirname, 'index.html');
    });

    // app.get('/sitemap.xml', function (request, response) {
    //     if (request) {
    //         console.log(request);
    //     }
    //     response.sendFile(__dirname, 'sitemap.xml');
    // });
    //
    // app.get('/BingSiteAuth.xml', function (request, response) {
    //     if (request) {
    //         console.log(request);
    //     }
    //     response.sendFile(__dirname, 'BingSiteAuth.xml');
    // });
    //
    // app.post('/upload', function (request, response) {
    //     var form = new formidable.IncomingForm();
    //     form.multiples = true;
    //     form.uploadDir = path.join(__dirname, '/uploads/');
    //
    //     form.on('file', function (field, file) {
    //         fs.rename(file.path, path.join(form.uploadDir, file.name));
    //     });
    //
    //     form.on('error', function (error) {
    //        console.log('An error occurred: \n' + error);
    //     });
    //
    //     form.on('end', function () {
    //         response.end('success');
    //     });
    //
    //     form.parse(request);
    //
    // });

    }
    catch(err){
        console.log(err);
}

