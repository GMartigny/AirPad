function AirPadReceiver(serverURL, port){
    port = port || 1337;
    this.socket = new WebSocket("ws://"+serverURL+":"+port);
    
    this.id = 0;
    this.url = location.href+"/controller/";
    this.qr = new Image();
    
    this.verbose = false;
    
    this.socket.onopen = this.onopen;
    this.socket.onmessage = this.onmessage;
    this.socket.onerror = this.onerror;
    this.socket.onclose = this.onclose;
    
    this.onopen = function(){
        this.log("Connection established");
    };
    this.onmessage = function(txt){
        this.log("Received : "+txt);
        try{
            var mess = JSON.parse(txt);
            switch (mess.type){
                case "id":
                    this.id = mess.data;
                    this.whenLoaded();
                    break;
            }
        }
        catch(e){
            throw "Invalid JSON";
        }
    };
    this.onload = function(){
        this.log("Ready for scanning");
    };
    this.onerror = function(err){
        this.log("An error occured");
        this.log(err);
    };
    this.onclose = function(){
        this.log("Connection closed");
    };
    this.onconnect = function(){
        this.log("A new controller is connected");
    };
    this.ondisconnect = function(){
        this.log("The controller disconnect");
    };
    
    this.getQR = function(url){
        if(id){
            this.url = url;
            url = encodeURIComponent(this.url+"?apid="+this.id);
            this.qr.src = "http://qrickit.com/api/qr?d="+url+"&qrsize=150";
            return this.qr;
        }
        else throw "Not ready";
    };
    
    this.send = function(data){
        this.socket.send(data);
    };
    this.close = function(){
        this.socket.close();
    };
    
    this.log = function(m){
        if(this.verbose) console.log(m);
    };
}