"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const app = express_1.default();
const httpServer = http_1.createServer(app);
const options = {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST']
    }
};
const io = new socket_io_1.Server(httpServer, options);
const port = 3000;
app.get('/', (req, res) => {
});
io.on('connection', (socket) => {
    console.log('user has connected');
    console.log('this is the sockset\'s id....', socket.id);
    socket.on('chat message', msg => {
        io.emit('chat message', msg);
    });
    socket.on('myEvent', (msg) => {
        console.log('I hear the custom event!', msg);
    });
    socket.on('disconnect', () => {
        console.log('A socket has disconnected!');
        io.emit('user_disconnected');
    });
});
httpServer.listen(port, () => {
    console.log(`listening on *:${port}`);
});
