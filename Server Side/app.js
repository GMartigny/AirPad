var http = require('http'),
           websocketServer = require('websocket').server;

var port = 1337,
    domain = "localhost",
    clients = [];

// empty http server
var HTTPServer = http.createServer(function(){
});
HTTPServer.listen(socketPort);

// socket server based on the http server
wsServer = new websocketServer({
    httpServer: HTTPServer
});

// receive a request
wsServer.on('request', function(request){
    console.log("connection from " + request.origin);
    if(request.origin == domain){
        var connection = request.accept(null, request.origin),
            id = getId();
        clients[id] = connection;
    }
});
var everyones = {};



function Link(screen){
    this.screen = screen;
    this.device = false;
    
    this.connectNewDevice = function(connected){
        this.device = connected;
    };
}

function Connexion(socket, type){
    this.socket = socket;
    this.type = type;
}

function getId(){
    var id = Math.random().toString(36).substr(2, 20);
    if(!everyones[id])
        return id;
    else return getId();
}
