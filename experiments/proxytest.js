var http = require("http");
var https = require("https");
var request = require("request");

var server = http.createServer(function(req, resp){
    var host =  req.headers.host;
    var headers = req.headers;
    var method = req.method;


    console.log(host);
    console.log(method);

    resp.writeHead(200, {
        "Content-Type" : "text/html"
    });

    resp.write("<html> <body>Hello Mother Fucker ");

    resp.write("<p>host: "+host+"</p>");
    resp.write("<p>method: "+method+"</p>");
    resp.write(" <p>headers: "+JSON.stringify(headers)+"</p>");


    resp.write("</body> </html>\n");



    resp.end();
});

server.listen(3131);

console.log("> Servidor de pé.");
