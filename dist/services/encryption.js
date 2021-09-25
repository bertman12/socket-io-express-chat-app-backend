"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.comparePassword = exports.encryptPassword = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const _ROUNDS = 10;
function encryptPassword(password) {
    bcrypt_1.default.hash(password, _ROUNDS);
}
exports.encryptPassword = encryptPassword;
function comparePassword(password) {
    let userPass = '';
    const isValid = bcrypt_1.default.compare(password, userPass);
    return isValid;
}
exports.comparePassword = comparePassword;
