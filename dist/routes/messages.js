"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const database_service_1 = __importDefault(require("../services/database.service"));
const router = express_1.Router();
const db = new database_service_1.default();
router.get('/all', (req, res) => {
    res.json('hiiiii');
});
router.post('', (req, res) => {
    db.query('', { data: 'lol' });
});
exports.default = router;
