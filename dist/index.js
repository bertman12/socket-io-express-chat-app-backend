"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = exports.dbService = void 0;
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const admin_ui_1 = require("@socket.io/admin-ui");
const registerMessageHandlers_1 = __importDefault(require("./registerMessageHandlers"));
const database_service_1 = __importDefault(require("./services/database.service"));
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
admin_ui_1.instrument(io, {
    auth: false
});
exports.app.use(cors_1.default());
exports.app.use(express_1.default.json());
io.use(() => {
    exports.dbService.getConnection();
});
io.on('connection', (socket) => {
    const messageHandler = new registerMessageHandlers_1.default(io, socket);
    messageHandler.observe();
});
httpServer.listen(port, () => {
    console.log(`listening on *:${port}`);
});
