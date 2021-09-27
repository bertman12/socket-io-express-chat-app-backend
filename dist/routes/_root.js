"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = require("../index");
const messages_1 = __importDefault(require("./messages"));
const authorize_1 = __importDefault(require("./authorize"));
const login_1 = __importDefault(require("./login"));
const router = express_1.Router();
const routes = [
    messages_1.default,
    authorize_1.default,
    login_1.default
];
router.use(...routes, (req, res, next) => {
    console.log('End of main route...');
    index_1.dbService.releaseConnection();
});
exports.default = router;
