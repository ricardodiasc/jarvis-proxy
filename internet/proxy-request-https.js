//http://blog.vanamco.com/proxy-requests-in-node-js/

var Http = require('http');
var Tls = require('tls');
// var sslrootcas = require('ssl-root-cas');
// sslrootcas.inject().addFile("/home/ricardo/dias/node/jarvis-prox/keys/proxyserver.rede.tst.cer")
// .addFile("/etc/ssl/certs/ca-certificates.crt");

process.env.NODE_TLS_REJECT_UNAUTHORIZED = "0";

var req = Http.request({
    host: '127.0.0.1',
    port: 3128,
    method: 'CONNECT',
    path: 'https://google.com:443'
});

req.on('connect', function (res, socket, head) {
    var cts = Tls.connect({
        host: 'google.com',
        socket: socket
    }, function () {
        cts.write('GET / HTTP/1.1\r\nHost: google.com\r\n\r\n');
    });

    // console.log(res.connection.getPeerCertificate);

    cts.on('data', function (data) {
        console.log(data.toString());
    });
});

req.end();
