"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
class MessageHandler {
    constructor(io, socket) {
        this.io = io;
        this.socket = socket;
    }
    register() {
        try {
            this.socket.on('chat-message', (message) => __awaiter(this, void 0, void 0, function* () {
                this.io.emit('chat-message', message);
                const SQL = `INSERT INTO messages (userId, serverId, roomId, content, time) VALUES (:userId, :serverId, :roomId, :content, :time);`;
                const data = { userId: message.userId, serverId: message.serverId, roomId: message.roomId, content: message.content, time: message.time };
                yield index_1.dbService.execute(SQL, data);
            }));
            this.socket.on('chat-message-edited', (message) => __awaiter(this, void 0, void 0, function* () {
                console.log('new edited message = ', message.content);
                this.io.emit('chat-message-edited', message);
                const SQL = `UPDATE messages SET content = :content WHERE id = :id;`;
                const data = { content: message.content, id: message.id };
                yield index_1.dbService.execute(SQL, data);
            }));
            this.socket.on('chat-message-deleted', (message) => __awaiter(this, void 0, void 0, function* () {
                console.log('deleted message = ', message.content);
                this.io.emit('chat-message-deleted', message);
            }));
        }
        catch (error) {
            console.log(error);
        }
    }
}
exports.default = MessageHandler;
