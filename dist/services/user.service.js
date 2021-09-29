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
exports.userService = exports.UserService = void 0;
const bcrypt_1 = __importDefault(require("bcrypt"));
const index_1 = require("../index");
class UserService {
    constructor() { }
    register(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
            console.log('Password was hashed!');
            let SQL = `INSERT INTO passwords (userId, password) VALUES(:userId, :password);`;
            let data = { userId: req.body.userId, password: hashedPassword };
            index_1.dbService.execute(SQL, data);
            SQL = `INSERT INTO users 
               (username, email, bio, avatar_image, role, room, server)
        VALUES (:username, :email, :bio, :avatarImage, :role, :room, :server);`;
            data = {
                username: req.body.username,
                email: req.body.email,
                bio: req.body.bio,
                avatarImage: req.body.avatarImage,
                role: req.body.role,
                room: req.body.room,
                server: req.body.server
            };
            index_1.dbService.execute(SQL, data);
        });
    }
    login() {
        console.log('User has logged in!');
    }
    logout() {
    }
    delete() {
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
