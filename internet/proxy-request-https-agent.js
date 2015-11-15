var Http = require('http');
var Https = require('https');
var Util = require('util');
var Tls = require('tls');
var HttpsProxyAgent = require('./HttpProxyAgent');

var agent = new HttpsProxyAgent({
    proxyHost: '127.0.0.1',
    proxyPort: 3128
});

Https.request({
    // like you'd do it usually...
    host: 'google.com',
    port: 443,
    method: 'GET',
    path: '/',

    // ... just add the special agent:
    agent: agent
}, function (res) {
    res.on('data', function (data) {
        console.log(data.toString());
    });
}).end();
