var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var formidable = require('formidable');
var fs = require('fs');
var router = express.Router();
var ImageUpload = require('express-azure-image-upload');

try {
    server.listen(process.env.PORT || 1337);

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', function (request, response) {
        if (request) {
            console.log(request);
        }
        response.sendFile(__dirname, 'index.html');
    });

    app.get('/sitemap.xml', function (request, response) {
        if (request) {
            console.log(request);
        }
        response.sendFile(__dirname, 'sitemap.xml');
    });

    app.get('/BingSiteAuth.xml', function (request, response) {
        if (request) {
            console.log(request);
        }
        response.sendFile(__dirname, 'BingSiteAuth.xml');
    });

    function imageHandler () {
        var storageAccount = '';
        var storageKey = '';
        var storageContainer = '';

        var upload = new ImageUpload(storageAccount, storageKey, storageContainer);

        return upload.handler;
    }

    app.post('/upload', imageHandler());

} catch(err){
    console.log(err);
}

