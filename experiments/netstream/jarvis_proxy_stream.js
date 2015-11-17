var net = require("net");

var server = net.createServer(function(conn){
    console.log("Cliente conectado.");

    var options = {
        host : 'google.com',
        port: '443'
    };

    var dest = net.connect(options,function(){
        console.log('conectou ' + dest.toString());

        dest.write('GET / HTTP/1.1\r\nHost: google.com\r\n\r\n');
        //Devolve o que recebeu da internet para o cliente
        dest.on('data', function(dataResponse){
            console.log('\tGoogle Respondeu: '+dataResponse.toString());
            conn.pipe(dataResponse);
        });

        dest.on('end', function(){
            conn.end();
        });
        //dest.pipe(conn);

        dest.on('error', function(err){
            console.log("Erro no DESTINO"+err);
        });

    });



    //Envia o que recebe para o destino
    conn.on('data', function(data){
        console.log('Conn recebe dados');
        //conn.write(data);
        // console.log('Recebimento de dados: '+data);
    });
    conn.on('error', function(e){
        console.log("Error no Connection" +e);
    });

    conn.on('end', function(){
        console.log("Cliente DESCONECTADO.");
    });

});

server.on('error',function(error){
    console.log("Erro no servidor !!!");
});

//server.listen('/tmp/echo.sock', function() { //'listening' listener
server.listen(3131, function() {
    console.log("Server ligado!");
});
