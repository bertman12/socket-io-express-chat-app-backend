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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const __1 = require("..");
const auth_1 = require("../services/auth");
const router = express_1.Router();
router.get('/all', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    console.log('Getting all messages!');
    const [data] = yield __1.dbService.execute(`SELECT * FROM messages`);
    res.json(data);
}));
router.get('/test', (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const response = auth_1.authService.verify('');
    console.log('testing the verification');
    res.json({ data: response });
}));
exports.default = router;
