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
            // method: destMethod,
            method: 'CONNECT',
            headers: destHeaders
    };


    console.log("\tHost: "+ destHost);
    console.log("\tMethod: "+ destMethod);
    console.log("\tUrl: "+ destUrl.href);
    // console.log(JSON.stringify(options));

    var destino = http.request(options, function(r){
            console.log("Response");
            resp.writeHead(r.headers);

             r.on('data', function(chunk){
                 resp.write(chunk);
             });
             r.on('end', function(){
                console.log("r.end");
                resp.end();
             });

             r.on('error',function(err){
                console.log("Request Error : "+err);
             });


    });

    destino.end();
});

server.listen(3131);

console.log("> Servidor de pé.");
