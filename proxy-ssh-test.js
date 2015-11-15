var http = require("https");
var fs = require("fs");
var request = require("request");

var options = {
        key : fs.readFileSync('keys/server.key'),
        cert : fs.readFileSync('keys/server.crt')
};

var server = http.createServer(options, function(req, resp){
    var host =  req.headers.host;
    var headers = req.headers;
    var method = req.method;


    console.log(host);
    console.log(method);

    // http.request(headers, function(error, response, body){
    //     if(error){
    //         console.error('erro de requisicao ', error);
    //     } else{
    //         console.log(body);
    //     }
    //
    // });

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
