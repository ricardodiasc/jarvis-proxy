var net = require("net");

var server = net.createServer(function(conn){
    console.log("Cliente conectado.");


    conn.on('data', function(data){
        console.log(data);
    });

    conn.on('end', function(){
        console.log("Cliente DESCONECTADO.");
    });


    //conn.write('ola\n');
    conn.on('error', function(error){
        console.error(error);
    });
    conn.pipe(conn);
});

//server.listen('/tmp/echo.sock', function() { //'listening' listener
server.listen(3131, function() {
    console.log("Server ligado!");
});



//Receber a conexao
//Configurar socket para :
    //Pegar conexao e fazer o forward


    //Configurar o retorno e escrever para o Cliente

    //on end, close remote connection

//end
