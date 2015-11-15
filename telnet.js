var net = require("net");

var server = net.createServer(function(conn){
    console.log("Cliente conectado.");

    
    conn.on('data', function(data){



        console.log('Recebimento de dados: '+data);
    });

    conn.on('end', function(){
        console.log("Cliente DESCONECTADO.");
    });

    conn.write('ola\n');

    // conn.pipe(conn);
});

//server.listen('/tmp/echo.sock', function() { //'listening' listener
server.listen(3131, function() {
    console.log("Server ligado!");
});
