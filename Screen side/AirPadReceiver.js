function AirPadReceiver(url, port){
    port = port || 1337;
    this.socket = new WebSocket("ws://"+url+":"+port);
    
    this.log = false;
    
    this.socket.onopen = this.onopen;
    this.socket.onmessage = this.onmessage;
    this.socket.onerror = this.onerror;
    this.socket.onclose = this.onclose;
    
    this.onopen = function(){
        if(this.log) console.log("Connection established");
    };
    this.onmessage = function(data){
        if(this.log) console.log("Received : "+data);
    };
    this.onerror = function(){
        
    };
    this.onclose = function(){
        if(this.log) console.log("Connection closed")
    };
    
    this.send = function(data){
        this.socket.send(data);
    };
    this.close = function(){
        this.socket.close();
    };
}