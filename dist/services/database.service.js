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
exports.DatabaseService = void 0;
const connectionManager_1 = __importDefault(require("./connectionManager"));
class DatabaseService {
    constructor() {
        this._connectionManager = new connectionManager_1.default();
    }
    getConnection() {
        return __awaiter(this, void 0, void 0, function* () {
            this._connection = yield this._connectionManager.connectToDatabase();
        });
    }
    releaseConnection() {
        this._connectionManager.forceDisconnect();
    }
    execute(sql, data) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                if (!this._connection) {
                    yield this.getConnection();
                    console.log('Reconnected!');
                    yield this.execute(sql, data);
                }
                else {
                    if (data) {
                        return yield this._connection.query(sql, data);
                    }
                    else {
                        return yield this._connection.query(sql);
                    }
                }
            }
            catch (error) {
                console.error(error);
            }
            return ['QUERY FAILED'];
        });
    }
}
exports.DatabaseService = DatabaseService;
exports.default = DatabaseService;
