"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.routes = void 0;
const messages_1 = __importDefault(require("./messages"));
const authorize_1 = __importDefault(require("./authorize"));
const login_1 = __importDefault(require("./login"));
const registerUser_1 = __importDefault(require("./registerUser"));
exports.routes = [
    messages_1.default,
    registerUser_1.default,
    login_1.default,
    authorize_1.default,
];
exports.default = exports.routes;
