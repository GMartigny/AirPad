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