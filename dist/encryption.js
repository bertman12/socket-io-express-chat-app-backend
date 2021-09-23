"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const user_service_1 = require("./user.service");
const ROUNDS = 10;
console.log(user_service_1.mynumber);
function encryptPassword(password) {
    bcrypt_1.default.hash(password, ROUNDS);
}
exports.encryptPassword = encryptPassword;
function comparePassword(password) {
    let userPass = '';
    const isValid = bcrypt_1.default.compare(password, userPass);
    return isValid;
}
exports.comparePassword = comparePassword;
