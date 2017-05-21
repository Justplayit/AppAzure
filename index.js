var express = require('express');
var app = express();
var path = require('path')
var server = require('http').createServer(app);

try {
    server.listen(process.env.PORT || 1337);

    app.use(express.static(path.join(__dirname, 'public')));

    app.get('/', function (request, response) {
        if (request) {
            console.log(request);
        }
        response.sendFile(__dirname, 'index.html');
    });

    app.get('/sitemap', function (request, response) {
        if (request) {
            console.log(request);
        }
        response.send('this is a string');
    });
}catch(err){
    console.log(err);
}

