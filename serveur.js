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
        socket.emit('addPlayer', joueur);
    }); 
});





server.listen(8080);