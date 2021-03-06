var express = require('express');
var app = express();
var path = require('path');
var server = require('http').createServer(app);
var formidable = require('formidable');
var fs = require('fs');
var azure = require('azure-storage');

const storageAccount = 'azureappb4';
const storageAccessKey = 'M28H+AO14p6JiUDg6HeRQNPsYycCeLw4mMMSxNXSk5m5LjIt8jx11YULjXPDvGcgftjiGT089TDB3WLWhpkfJg==';
const containerName = 'azureappb4';

var blobClient = azure.createBlobService(storageAccount, storageAccessKey);
var blobSvc = azure.createBlobServiceAnonymous('https://azureappb4.blob.core.windows.net/');


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

    app.get('/images', function (request, response) {
        if (request) {
            console.log(request);
        }
  
        
   blobClient.listBlobsSegmented('azureappb4', null, function(error, result, resp){
  if(!error){
     console.log(resp);
      back="";
      var arrayLength = result.entries.length;
for (var i = 0; i < arrayLength; i++) {
    back+="<img src='"+"https://azureappb4.blob.core.windows.net/azureappb4/"+result.entries[i].name+"'>";
    //Do something
} 
      
      response.send(back);
      // result.entries contains the entries
      // If not all blobs were returned, result.continuationToken has the continuation token.
  }
});
    });

    app.get('/BingSiteAuth.xml', function (request, response) {
        if (request) {
            console.log(request);
        }
        response.sendFile(__dirname, 'BingSiteAuth.xml');
    });

    app.post('/upload', function (request, response) {
        console.log('Here');

        var form = new formidable.IncomingForm();

        form.on('error', function (error) {
            console.log('An error occurred: \n' + error);
        });

        form.on('end', function () {
            console.log('success')
        });

        form.parse(request, function (error, fields, files) {
            var itemID = new Date().getTime();
            var options = {
                contentType: 'image/jpeg',
                metadata: {
                    fileName: itemID
                }
            };

            blobClient.createBlockBlobFromLocalFile(containerName, itemID + '.jpeg', files['files'].path, options,
                function(error){
                    if(error !== null){
                        console.log('Azure full error: ', error);
                    }
                    else{
                        console.log('Azure full success.');
                    }
                });
        });

    });

} catch(err){
    console.log(err);
}

