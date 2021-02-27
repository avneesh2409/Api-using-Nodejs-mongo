var Io = require('socket.io');

class SocketIO{
    constructor(){
        this.io = undefined;
    }
    createSocket(server){
        this.io = Io(server)
        this.io.on("Connection",(socket)=>{
            console.log("Socket Connected with socket ID :- ",socket.id);
            socket.emit("greeting","Hi Avneesh");
            socket.on("disconnect",(d)=>{
                console.log("socket disconnected :- ",socket.id);
            });
            socket.on("message",(data)=>{
                console.log(`message recieved from socket Id :- ${socket.id} and data = ${data}`)
            });
            socket.on("error",(e)=>{
                console.log("Error occured :- ",e);
            });
        })
    }
    getServer(){
        return this.io;
    }
}
module.exports = new SocketIO();