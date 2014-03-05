function AirPadReceiver(serverURL, port, qr){
    port = port || 1337;
    this.socket = new WebSocket("ws://"+serverURL+":"+port);
    
    this.id = 0;
    this.url = location.href+"/controller/";
    this.qr = qr || new Image();
    this.qr.onload = this.onload;
    
    this.verbose = true;
    
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
                    this.qr = this.getQR();
                    break;
                case "cmd":
                    this.oncommand(mess.data);
                    break;
            }
        }
        catch(e){
            throw "Invalid JSON";
        }
    };
    this.oncommand = function(data){
        this.log((data.press? "Press": "Release")+" the button "+data.button);
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
    
    this.getQR = function(){
        if(this.id){
            if(!this.qr.src){
                url = encodeURIComponent(this.url+"?apid="+this.id);
                this.qr.src = "http://qrickit.com/api/qr?d="+url+"&qrsize=150";
            }
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