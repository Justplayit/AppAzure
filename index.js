var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var formidable = require('formidable');
var fs = require('fs');
var azure = require('azure-storage');

const storageAccount = 'azureappb4';
const storageAccessKey = 'M28H+AO14p6JiUDg6HeRQNPsYycCeLw4mMMSxNXSk5m5LjIt8jx11YULjXPDvGcgftjiGT089TDB3WLWhpkfJg==';
const azureEndpoint = 'DefaultEndpointsProtocol=https;AccountName=azureappb4;AccountKey=M28H+AO14p6JiUDg6HeRQNPsYycCeLw4mMMSxNXSk5m5LjIt8jx11YULjXPDvGcgftjiGT089TDB3WLWhpkfJg==;EndpointSuffix=core.windows.net';
const containerName = 'azureappb4';

var blobClient = azure.createBlobService(storageAccount, storageAccessKey);

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

    var uploadFull = function(imgPath, itemId, options){
        var fileName = itemId + '.jpg';
        blobClient.createBlockBlogFromLocalFile(containerName, fileName, imgPath, options,
            function(error){
                if(error !== null){
                    console.log('Azure full error: ', error);
                }
                else{
                    console.log('Azure full success.');
                }
            });
    };

    app.post('/upload', function (response, request) {
        var form = new formidable.IncomingForm();
        var itemID = new Date().getTime();
        form.parse(req, function(err, fields, files){
           var options = {
               contentType: 'image/jpeg',
               metadata: {fileName: itemID}
           };
           var imgPath = files.image.path;
           var machineID = fields.machineId;
           var userName = fields.userName;

           uploadFull(imgPath, itemID, options);
        });
    });

} catch(err){
    console.log(err);
}

