var http = require("http");
var https = require("https");
var request = require("request");
var tls = require("tls");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var server = http.createServer(function(req, resp){
    var host =  req.headers.host;
    var headers = req.headers;
    var method = req.method;


    console.log(host);
    console.log(method);

    var request = http.request({
        host: '127.0.0.1',
        port: 3128,
        method: 'CONNECT',
        path: 'https://google.com:443'
    });

    request.on('connect', function (res, socket, head) {
        var cts = tls.connect({
            host: 'google.com',
            socket: socket
        }, function () {
            cts.write('GET / HTTP/1.1\r\nHost: google.com\r\n\r\n');
        });

        //console.log(res.connection.getPeerCertificate);
        // resp.writeHead(200, {
        //     "Content-Type" : "text/html"
        // });

        cts.on('data', function (data) {
            console.log(data.toString());
            resp.pipe(data);
        });

        cts.on('end',function(){
            resp.end();
        });
    });

    request.on('data',function(data){
        resp.write(data);
    });


    request.end();
});

server.listen(3131);

console.log("> Servidor de pé.");
