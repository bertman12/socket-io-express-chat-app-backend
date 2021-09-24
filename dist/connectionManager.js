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
exports.ConnectionManager = void 0;
const promise_1 = __importDefault(require("mysql2/promise"));
const dotevn = __importStar(require("dotenv"));
const index_1 = require("./index");
const messages_1 = __importDefault(require("./routes/messages"));
dotevn.config();
let _connection;
class ConnectionManager {
    constructor() {
        this._pool = promise_1.default.createPool({
            host: process.env.DB_HOST,
            user: process.env.DB_USER,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            waitForConnections: true,
            connectionLimit: 10,
            queueLimit: 10
        });
    }
    forceDisconnect() {
        if (_connection) {
            _connection.release();
            console.log('You have been force disconnected!');
        }
        else {
            console.log('No connection to disconnect from.');
        }
    }
    connectToDatabase() {
        return __awaiter(this, void 0, void 0, function* () {
            const pool = this._pool;
            this._connection = yield pool.getConnection();
            const connection = this._connection;
            index_1.app.use(function mysqlConnection(req, res, next) {
                return __awaiter(this, void 0, void 0, function* () {
                    try {
                        req.db = connection;
                        _connection = req.db;
                        req.db.config.namedPlaceholders = true;
                        yield req.db.query('SET SESSION sql_mode = "TRADITIONAL"');
                        yield req.db.query(`SET time_zone = '-8:00'`);
                        yield next();
                        req.db.release();
                    }
                    catch (err) {
                        console.log(err);
                        if (req.db)
                            req.db.release();
                        throw err;
                    }
                });
            });
            index_1.app.get('', (req, res) => {
                res.json({ message: 'Hello World!', header: req.headers });
            });
            index_1.app.use('/message', messages_1.default);
        });
    }
}
exports.ConnectionManager = ConnectionManager;
exports.default = ConnectionManager;
