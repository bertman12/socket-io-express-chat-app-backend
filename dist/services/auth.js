"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authService = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotevn = __importStar(require("dotenv"));
dotevn.config();
class Auth {
    jwtify(payload) {
        if (process.env.JWT_PHRASE) {
            const key = process.env.JWT_PHRASE;
            const jwtKey = jsonwebtoken_1.default.sign(JSON.stringify(payload), key);
            console.log('jwtifying!');
            if (!jwtKey)
                console.log('unable to create jwt');
            return jwtKey;
        }
        return 'NO JWT PHRASE';
    }
    verify(input) {
        try {
            const token = input;
            const test = 'eyJhbGciOiJIUzI1NiJ9.eyJpZCI6MywidXNlcm5hbWUiOiJteSB1c2VybmFtZSIsImVtYWlsIjoiZW1haWwzQGVtYWlsLmNvbSIsImJpbyI6Ik15IGJpby4uLiIsImF2YXRhcl9pbWFnZSI6ImltYWdlIHNyYyIsInJvbGUiOjAsInJvb20iOjAsInNlcnZlciI6MH0.eiDvSK5VTzAaRneGRRDPpRga8Titjpfj19WNr-3TbGA';
            const key = process.env.JWT_PHRASE || '';
            const payload = jsonwebtoken_1.default.verify(test, key);
            console.log(payload);
            return { isValid: true, payload: payload };
        }
        catch (error) {
            console.log('Invalid JWT Token!');
            return { isValid: false, payload: 'Invalid JWT Token' };
        }
    }
}
exports.authService = new Auth();
