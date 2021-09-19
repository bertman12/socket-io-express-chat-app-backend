"use strict";
exports.__esModule = true;
// import cors from 'cors';
var express_1 = require("express");
var http_1 = require("http");
var socket_io_1 = require("socket.io");
var app = express_1["default"]();
var httpServer = http_1.createServer(app);
var options = {
    cors: { origin: 'http://localhost:4200',
        methods: ['GET', 'POST']
    }
};
var io = new socket_io_1.Server(httpServer, options);
var port = 3000;
// app.use(cors());
app.get('/', function (req, res) {
    // res.sendFile('C:/Users/eddyd/OneDrive/Documents/bay-valley-tech/code-academy/Projects/backend projects/socket-io-chat-app/src/index.html');
});
io.on('connection', function (socket) {
    console.log('user has connected');
    // io.emit('connection', socket.id.slice(0,5));
    console.log('this is the sockset\'s id....', socket.id);
    socket.on('chat message', function (msg) {
        // io.emit('chat message', msg, socket.id.slice(0,5) );
        io.emit('chat message', msg);
    });
    socket.on('myEvent', function (msg) {
        console.log('I hear the custom event!', msg);
    });
    socket.on('disconnect', function () {
        console.log('A socket has disconnected!');
        io.emit('user_disconnected');
        // io.emit('custom_disconnect', socket.id.slice(0,5));
    });
});
// io.use((socket,next) => {
//   if(socket.data.role === 'admin'){
//     console.log('Admin sockets only beyond this point. BEWARE!!!!!!!')
//     next();
//   }
// })
httpServer.listen(port, function () {
    console.log("listening on *:" + port);
});
//This was listening for server disconnect and not a socket specifically disconnecting
// io.on('disconnect', (socket)=> {
//   io.emit('disconnect');
//   // socket.on('disconnect', () => {
//   // })
// })
