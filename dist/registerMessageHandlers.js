"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MessageHandler {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    }
    observe() {
        try {
            this.socket.on('chat-message', (message) => {
                this.io.emit('chat-message', message);
                console.log('check');
            });
            this.socket.on('chat-message-edited', (message) => {
                console.log('new edited message = ', message.content);
                this.io.emit('chat-message-edited', message);
            });
            this.socket.on('chat-message-deleted', (message) => {
                console.log('deleted message = ', message.content);
                this.io.emit('chat-message-deleted', message);
            });
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = MessageHandler;
