function AirPad(serverURL, port){
    port = port || 1337;
    this.socket = new WebSocket("ws://"+serverURL+":"+port);
    
    this.verbose = false;
    
    this.socket.onopen = this.onopen;
    this.socket.onmessage = this.onmessage;
    this.socket.onerror = this.onerror;
    this.socket.onclose = this.onclose;
    
    window.AP = this;
    window.onload = function(){
        window.buttons = document.getElementsByTagName("button");
        for(var i=0;i<buttons.length;++i){
            buttons[i].onclick = function(){
                window.AP.send("cmd", this.value);
            };
        }
    };
    
    this.send = function(t, v){
        var data = JSON.stringify({
            type: t,
            value: v
        });
        this.socket.send(data);
    };
}