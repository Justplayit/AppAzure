var express = require('express');
var app = express();
var path = require('path')
var server = require('http').createServer(app);

server.listen(process.env.PORT || 8000);

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', function(req, res){
   res.sendFile(__dirname, 'index.html');
});

// var http = require('http');
// var fs = require('fs')
// var url = require('url')
//
//
// var server = http.createServer(function(request, response) {
//
//     var pathname = url.parse(request.url).pathname + 'views/index.html';
//     console.log(pathname)
//
//     console.log('Request for ' + pathname + ' received.');
//
//     fs.readFile(pathname.substr(1), function (err, data) {
//         if(err){
//             console.log(err);
//             response.writeHead(404, {'Content-Type': 'text/html'});
//         }
//         else {
//             response.writeHead(200, {'Content-Type': 'text/html'});
//             response.write(data.toString());
//
//         }
//         response.end();
//     });
//
// });
//
// var port = process.env.PORT || 1337;
// server.listen(port);
//
// console.log("Server running at http://localhost:%d", port);