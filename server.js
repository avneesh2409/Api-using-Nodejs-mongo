var express = require('express');  
var app = express();  
var server = require('http').createServer(app);  
require('./socket').createSocket(server);
const config = require('./config');

server.listen(config.app.port,()=>{
    console.log("Server is listening on ",config.app.port);
});

module.exports = app;