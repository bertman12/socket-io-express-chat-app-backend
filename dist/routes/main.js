"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const messages_1 = __importDefault(require("./messages"));
const router = express_1.Router();
router.get('', (req, res) => {
    console.log('yeeeeeeeeeeeeee boiiiiiiiiii');
    res.json('You are a good boy!');
});
router.use('', messages_1.default);
exports.default = router;
