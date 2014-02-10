function AirPad(serverURL, port){
    port = port || 1337;
    this.socket = new WebSocket("ws://"+serverURL+":"+port);
    
    this.verbose = false;
    
    this.socket.onopen = this.onopen;
    this.socket.onmessage = this.onmessage;
    this.socket.onerror = this.onerror;
    this.socket.onclose = this.onclose;
}