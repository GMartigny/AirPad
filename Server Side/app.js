var clients = {};

function getId(){
    var id = Math.random().toString(36).substr(2, 9);
    if(!clients[id])
        return id;
    else return getId();
}