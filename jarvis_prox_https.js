var http = require("http");
var https = require("https");
var request = require("request");
var url = require("url");
var util = require('util');
var tls = require('tls');

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var server = http.createServer(function(req, resp){
    var destHost =  req.headers.host;
    var destHeaders = req.headers;
    var destMethod = req.method;
    var destUrl = url.parse(req.url);


    var options = {
            //Your proxy server
            host: '127.0.0.1',
            //Your proxy port
            port: 3128,

            path  : destUrl.href,
            //method: destMethod,
            method: 'CONNECT',
            headers: destHeaders
    };


    console.log("\tHost: "+ destHost);
    console.log("\tMethod: "+ destMethod);
    console.log("\tUrl: "+ destUrl.href);
    // console.log(JSON.stringify(options));
    var destino = http.request(options);
    // var destino = http.request(options, function(r){



    destino.on('connect', function (res, socket, head) {
        var cts = tls.connect({
            host: destHost,
            socket: socket,
            port: destUrl.port
        }, function () {
            cts.write('GET / HTTP/1.1\r\nHost: '+destHost+'\r\n\r\n');
        });

        // console.log(res.connection.getPeerCertificate);

        cts.on('data', function (data) {
            console.log(data.toString());
            resp.write(data);
        });

        cts.on('end', function(){
            resp.end();
        });

        cts.on('error', function(ctsError){
            console.log("CTS ERROR -> " + ctsError);
        });
    });

    destino.end();
});

server.listen(3131);

console.log("> Servidor de pé.");
