var http = require('http');
var path = require('path');
var fs = require('fs');
var SerialPort = require('serialport');
var express = require('express');
var io = require('socket.io');

//var portName = process.argv[2];
// Chargement du fichier index.html affiché au client

var app = express();
//app.use(express.static(path.join(__dirname, 'public')));
var server = http.createServer(app);


app.get('/', function(req, res) {
    fs.readFile('./index.html', 'utf-8', function(error, content) {
        res.writeHead(200, {"Content-Type": "text/html"});
        res.end(content);
    });
});

app.get('/images/:photo', function(req, res) {
    fs.readFile('./images/' +req.params.photo, function(error, content) {
        res.writeHead(200, {"Content-Type": "image/png"});
        res.end(content);
    });
});

app.get('/css/:style', function(req, res) {
 
    fs.readFile('./css/' +req.params.style, function(error, content) {

        res.writeHead(200, {"Content-Type": "text/css"});

        res.end(content);

    });
});



server.listen(8080);

// Chargement de socket.io
var io2 = io.listen(server);



// Quand un client se connecte, on le note dans la console

io2.sockets.on('connection', function (socket) {
    console.log('Un client est connecté !');
    
    var difficulty = 3000;
    var score = 0;
    var actualValue = 0;
    var value = 0;
	//Ici on génère toutes les X secondes une nouvelle valeur dans le tableau
    generateTaup();
    socket.emit('message', 'Vous êtes bien connecté, la partie peut commencer !');
    
    socket.on('clickBtn', function (bouton) {
        console.log('Un bouton a été préssé : le ' + message);
    }); 
    
    socket.on('finPartie', function (bouton) {
        console.log('La partie est finie');
        socket.emit('scoreFin', score);
    }); 
    
    socket.on('jouer', function (difficulty) {
        console.log("Let's go !");
        if (difficulty !== "0"){
			console.log(difficulty);
			setInterval(generateTaup, difficulty);
		}
        var port = new SerialPort('COM3',{
            baudrate: 9600
            });

        port.on('open', function() {
          port.write('OK', function(err) {
            if (err) {
              return console.log('Error on write: ', err.message);
            }
            console.log('message written');
          });
        });

        port.on('data',function(data){
            console.log('data received : ');
            console.log(data);
            console.log(data.toString());
            switch (data.toString()){
				case "A":
					value = 11;
					break;
				case "B":
					value = 12;
					break;
				case "C":
					value = 13;
					break;
				case "D":
					value = 14;
					break;
				case "E":
					value = 15;
					break;
 				case "F":
					value = 16;
					break;
				default:
					value = parseInt(data.toString()) + 1
			}
			console.log(value);
			checkScore(value);
			
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
                //~ socketServer.emit('updateScore', 'A' );
                //~ }
            //~ });  
        //~ }); 
        //~ 
        function checkScore(value){
		console.log(value);
		console.log(actualValue);
		if (value == actualValue){
			score += 20;
			generateTaup();
		} else {
			score -= 5;
		}
		console.log("Le score est de : " + score);
		socket.emit("newScore", score);
		port.write(score);
	}
    });
    
	function generateTaup(){
		actualValue = Math.floor((Math.random() * 16) + 1);
		socket.emit("newValue", actualValue);
	}
	
 
});

