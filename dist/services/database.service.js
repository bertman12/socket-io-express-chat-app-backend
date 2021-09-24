"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseService = void 0;
const connectionManager_1 = __importDefault(require("../connectionManager"));
class DatabaseService {
    constructor() {
        this.connectionManager = new connectionManager_1.default();
    }
    getConnection() {
        console.log('getting connection!');
        this.connectionManager.connectToDatabase();
    }
    query(sqlOptions) {
        let options = 'NO SELECTIONS';
        if (sqlOptions.selections.length > 1) {
            options = sqlOptions.selections.join(',');
        }
        else {
            options = sqlOptions.selections[0];
        }
        const SQL = `${sqlOptions.action} ${options} FROM ${sqlOptions.table}${sqlOptions.condition ? ` WHERE ${sqlOptions.condition}` : ''}`;
        console.log(SQL);
    }
}
exports.DatabaseService = DatabaseService;
exports.default = DatabaseService;
