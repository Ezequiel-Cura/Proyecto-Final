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
const express_1 = require("express");
const router = (0, express_1.Router)();
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const User_1 = __importDefault(require("../../models/User"));
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email_verified, email, given_name, picture } = (0, jwt_decode_1.default)(req.body.jwt);
        if (!email_verified)
            return res.status(403).send("Tu email no esta verificado");
        if (!email)
            return res.status(403).send("No tenes gmail? wtf");
        const password = email + process.env.GOOGLE_SECRET;
        const salt = yield bcrypt_1.default.genSalt(Number(process.env.SUPER_SECRET_SALT));
        const passwordHash = yield bcrypt_1.default.hash(password, salt);
        const user = yield User_1.default.findOne({ email });
        if (user) {
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassword)
                return res.status(400).send("La contraseña es incorrecta");
            const token = user.generateAuthToken();
            return res.cookie("access_token", token, { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true, sameSite: process.env.NODE_ENV ? "none" : "lax", secure: process.env.NODE_ENV ? true : false })
                .status(200).send({ role: user.role });
        }
        const newUser = yield new User_1.default({ firstName: given_name, email, password: passwordHash, avatar: picture, isGoogle: true, verified: true }).save();
        const token = newUser.generateAuthToken();
        res.cookie("access_token", token, { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true, sameSite: process.env.NODE_ENV ? "none" : "lax", secure: process.env.NODE_ENV ? true : false }).status(200).end();
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
exports.default = router;
