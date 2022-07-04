"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
function authorization(req, res, next) {
    try {
        const token = req.cookies.access_token;
        if (!token)
            return res.sendStatus(401).end();
        const data = jsonwebtoken_1.default.verify(token, process.env.JWTPRIVATEKEY);
        req.userId = data._id;
        next();
    }
    catch (err) {
        return res.sendStatus(401).send(err.message);
    }
}
exports.default = authorization;
