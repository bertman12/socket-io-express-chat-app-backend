"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const admin_ui_1 = require("@socket.io/admin-ui");
const mysql2_1 = __importDefault(require("mysql2"));
const registerMessageHandlers_1 = __importDefault(require("./registerMessageHandlers"));
const dotevn = __importStar(require("dotenv"));
dotevn.config();
const app = express_1.default();
const httpServer = http_1.createServer(app);
const options = {
    cors: {
        origin: 'http://localhost:4200',
        methods: ['GET', 'POST']
    }
};
const pool = mysql2_1.default.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
});
const io = new socket_io_1.Server(httpServer, options);
const port = 3000;
app.use(cors_1.default());
app.use(express_1.default.json());
app.get('/', (req, res) => {
});
admin_ui_1.instrument(io, {
    auth: false
});
io.on('connection', (socket) => {
    const messageHandler = new registerMessageHandlers_1.default(io, socket);
    messageHandler.observe();
    socket.on('disconnect', (socket) => {
        console.log('A socket has disconnected!');
        io.emit('user_disconnected');
    });
});
httpServer.listen(port, () => {
    console.log(`listening on *:${port}`);
});
