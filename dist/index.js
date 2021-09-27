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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.dbService = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const registerMessageHandlers_1 = __importDefault(require("./events/registerMessageHandlers"));
const database_service_1 = __importDefault(require("./services/database.service"));
const _root_1 = __importDefault(require("./routes/_root"));
exports.dbService = new database_service_1.default();
exports.app = express_1.default();
const httpServer = http_1.createServer(exports.app);
const serverOptions = {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST']
    }
};
const io = new socket_io_1.Server(httpServer, serverOptions);
const port = 3000;
exports.app.use(cors_1.default());
exports.app.use(express_1.default.json());
exports.app.use('', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    yield exports.dbService.getConnection();
    next();
    console.log('All endpoints have been satisified!');
}), _root_1.default);
io.use((socket, next) => {
    console.log('Socket connected! SocketID: ', socket.id);
    next();
    socket.on('disconnect', () => {
        console.log('Socket has disconnected, SocketID: ', socket.id);
    });
});
io.on('connection', (socket) => {
    const messageHandler = new registerMessageHandlers_1.default(io, socket);
    messageHandler.register();
});
httpServer.listen(port, () => {
    console.log(`listening on *:${port}`);
});
