const io = require('socket.io-client');

const socket = io.connect("http://localhost:3000")

socket.on('greeting',(data)=>{
    console.log("mesage recieved !!",data);
});