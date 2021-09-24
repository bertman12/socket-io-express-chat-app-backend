"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const database_service_1 = __importDefault(require("./services/database.service"));
class MessageHandler {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
        this.db = new database_service_1.default();
    }
    observe() {
        try {
            this.socket.on('chat-message', (message) => {
                this.io.emit('chat-message', message);
                this.db.query('', message);
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
