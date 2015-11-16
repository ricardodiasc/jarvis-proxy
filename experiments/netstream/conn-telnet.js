var net = require('net');

var client = net.connect({port:3131}, function(){
    console.log('connected to server!');
    client.write('mundo!');
    client.end();

});

client.on('end',function(){
    console.log('disconnected from server');
});
