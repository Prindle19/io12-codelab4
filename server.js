// This is just a simple web server app for Cloud9
// Borrowed from http://thecodinghumanist.com/blog/archives/2011/5/6/serving-static-files-from-node-js
// It will load the index.html file plus any .js or .css includes that are in index.html
//

var http = require('http');
var fs = require('fs');
var path = require('path');
 
http.createServer(function (request, response) {
     
    var filePath = '.' + request.url;
    if (filePath == './')
        filePath = './index.html';
         
    var extname = path.extname(filePath);
    var contentType = 'text/html';
    switch (extname) {
        case '.js':
            contentType = 'text/javascript';
            break;
        case '.css':
            contentType = 'text/css';
            break;
    }
     
    path.exists(filePath, function(exists) {
     
        if (exists) {
            fs.readFile(filePath, function(error, content) {
                if (error) {
                    response.writeHead(500);
                    response.end();
                }
                else {
                    response.writeHead(200, { 'Content-Type': contentType });
                    response.end(content, 'utf-8');
                }
            });
        }
        else {
            response.writeHead(404);
            response.end();
        }
    });
     
}).listen(process.env.PORT || 8080, "0.0.0.0");
 
console.log('Server is running');
