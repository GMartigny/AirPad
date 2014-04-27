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

function getId(){
    var id = Math.random().toString(36).substr(2, 9);
    if(!clients[id])
        return id;
    else return getId();
}