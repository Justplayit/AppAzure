var http = require('http');
var fs = require('fs')

var server = http.createServer(function(request, response) {

    // response.writeHead(200, {"Content-Type": "text/plain"});
    // response.end("Hello Azure!");

    var pathname = url.parse(request.url).pathname;

    console.log('Request for ' + pathname + ' received.');

    fs.readFile(pathname.substr(1), function (err, data) {
        if(err){
            console.log(err);
            response.writeHead(404, {'Content-Type': 'text/html'});
        }
        else {
            response.writeHead(200, {'Content-Type': 'text/htl'});
            response.write(data.toString());

        }
        response.end();
    });

});

var port = process.env.PORT || 1337;
server.listen(port);

console.log("Server running at http://localhost:%d", port);