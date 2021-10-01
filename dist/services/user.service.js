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
const auth_1 = require("./auth");
class UserService {
    constructor() { }
    register(req) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.addUser(req);
            const user = yield this.getUser(req.body.email);
            if (user.id) {
                yield this.addPassword(req, user.id);
            }
            else
                throw new Error('Unable to add user or password!');
            const jwtToken = yield this.login(user.email, req.body.password);
            return jwtToken;
        });
    }
    addPassword(req, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const hashedPassword = yield bcrypt_1.default.hash(req.body.password, 10);
            const SQL = `INSERT INTO passwords (userId, password) VALUES(:userId, :password);`;
            const data = { userId: userId, password: hashedPassword };
            index_1.dbService.execute(SQL, data);
        });
    }
    addUser(req) {
        return __awaiter(this, void 0, void 0, function* () {
            const userSQL = `INSERT INTO users 
        (username, email, bio, avatar_image, role, room, server)
        VALUES (:username, :email, :bio, :avatarImage, :role, :room, :server);`;
            const userData = {
                username: req.body.username,
                email: req.body.email,
                bio: req.body.bio,
                avatarImage: req.body.avatarImage,
                role: req.body.role,
                room: req.body.room,
                server: req.body.server
            };
            yield index_1.dbService.execute(userSQL, userData);
        });
    }
    getUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            const SQL = `SELECT * FROM users WHERE email = :email`;
            const data = { email: email };
            const [[user]] = yield index_1.dbService.execute(SQL, data);
            if (user.length > 1) {
                throw new Error('To many users have the same email!');
            }
            return user;
        });
    }
    login(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = yield this.getUser(email);
                let passwordVerified = false;
                console.log('Beggining the login process...', user.id);
                if (user.id) {
                    console.log('verifying the password now...');
                    passwordVerified = yield this.checkPassword(user.id, password);
                    if (passwordVerified) {
                        console.log('Verifying the user now...');
                        return auth_1.authService.jwtify(user);
                    }
                }
            }
            catch (err) {
                console.error('Unable to login!', err);
            }
            return 'User does not exist! Unable to login!';
        });
    }
    checkPassword(userId, testInput) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const SQL = `SELECT * FROM passwords WHERE userId = :userId`;
                const data = { userId: userId };
                const [[hashedPassword]] = yield index_1.dbService.execute(SQL, data);
                console.log('Stored password ... ', hashedPassword.password.toString());
                let isValid = false;
                isValid = yield bcrypt_1.default.compare(testInput, hashedPassword.password.toString());
                console.log('Password is ', isValid);
                return isValid;
            }
            catch (error) {
                console.error(error);
                return false;
            }
        });
    }
    delete() {
    }
}
exports.UserService = UserService;
exports.userService = new UserService();
