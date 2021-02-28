var Io = require('socket.io');

class SocketIO{
    constructor(){
        this.io = undefined;
    }
    createSocket(server){
        this.io = Io(server,{
            cors:true,
            origins:["http://localhost:3000"],
           })
        
        this.io.on("connection",(socket)=>{
            console.log("Socket Connected with socket ID :- ",socket.id);
            socket.join(socket.handshake.auth.roomId)  
            socket.on("disconnect",(d)=>{
                console.log("socket disconnected :- ",socket.id);
            });
            socket.on("message",(msg)=>{
                console.log(`message recieved from socket Id :- ${socket.id} and data = ${msg}`)
                this.io.in(socket.handshake.auth.roomId).emit("message", msg);
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