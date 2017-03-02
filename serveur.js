var http = require('http');

var fs = require('fs');
var SerialPort = require('serialport')
portName = process.argv[2];
// Chargement du fichier index.html affiché au client

var server = http.createServer(function(req, res) {

    fs.readFile('./index.html', 'utf-8', function(error, content) {

        res.writeHead(200, {"Content-Type": "text/html"});

        res.end(content);

    });

});


// Chargement de socket.io

var io = require('socket.io').listen(server);


// Quand un client se connecte, on le note dans la console

io.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    
   
    
    socket.emit('message', 'Vous êtes bien connecté, la partie peut commencer !');
    
    socket.on('clickBtn', function (bouton) {
        console.log('Un bouton a été préssé : le ' + message);
    }); 
    socket.on('newPlayer', function (joueur) {
        console.log('Le joueur ' + joueur + ' a rejoinds la partie !');
        var port = new SerialPort('COM3',{
            baudrate: 57600
            });

        port.on('open', function() {
          port.write('main screen turn on', function(err) {
            if (err) {
              return console.log('Error on write: ', err.message);
            }
            console.log('message written');
          });
        });

        port.on('data',function(data){
            console.log('data received : ');
            console.log(data);
        });
        
        port.on('disconnect', function(disc){
            console.log("Deconnexion");
            console.log(disc);
        });
        port.on('close', function(close){
            console.log("CLOSED");
            console.log(close);
        });
        // open errors will be emitted as an error event
        port.on('error', function(err) {
          console.log('Error:: ', err.message);
        })
        //~ serialPort = new SerialPort('COM3', { //portName ?
            //~ baudrate: 9600,
            //~ // defaults for Arduino serial communication
             //~ dataBits: 8, 
             //~ parity: 'none', 
             //~ stopBits: 1, 
             //~ flowControl: false 
        //~ });
        //~ serialPort.on("open", function () {
            //~ console.log('open serial communication');
            //~ // Listens to incoming data
            //~ serialPort.on('btnPress', function(btnID) { 
                //~ console.log("Button " + btnID + " pressed");
                //~ if (btnID > 0) {
                //~ // save the data between 'B' and 'E'
                //~ socketServer.emit('updateScore', 'ZOB' );
                //~ }
            //~ });  
        //~ }); 
        //~ 
        socket.emit('addPlayer', joueur);
    }); 
});





server.listen(8080);