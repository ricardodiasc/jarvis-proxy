var net = require("net");

var server = net.createServer(function(conn){
    console.log("Cliente conectado.");

    var options = {
        host : 'www.tst.jus.br',
        port: '443'
    };

    var dest = net.connect(options,function(){
        console.log('conectou ' + dest.toString());
        //dest.write('GET / HTTP/1.1\r\nHost: www.tst.jus.br\r\n\r\n');
        //Devolve o que recebeu da internet para o cliente
    });

    dest.on('connect',function(res, socket, head){
        //conn.write(res);
        console.log("DEST connection");
    });

    dest.on('end', function(){
        conn.end();
    });

    dest.on('error', function(err){
        console.log("Erro no DESTINO"+err);
    });


    //Envia o que recebe para o destino
    conn.on('data', function(data){
        console.log('Conn recebe dados');
        //conn.write(data);
        dest.write(data);
        // console.log('Recebimento de dados: '+data);
    });
    conn.on('error', function(e){
        console.log("Error no Connection" +e);
    });

    conn.on('end', function(){
        console.log("Cliente DESCONECTADO.");
    });

});

//server.listen('/tmp/echo.sock', function() { //'listening' listener
server.listen(3131, function() {
    console.log("Server ligado!");
});

server.on('error',function(error){
    console.log("Erro no servidor !!!");
});
