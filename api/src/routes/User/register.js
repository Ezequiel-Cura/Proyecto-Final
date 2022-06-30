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
const User_1 = __importDefault(require("../../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const userExistCheck = yield User_1.default.findOne({ email });
        if (userExistCheck)
            return res.status(400).send('Email ya registrado');
        const salt = yield bcrypt_1.default.genSalt(Number(process.env.SUPER_SECRET_SALT));
        const hashPass = yield bcrypt_1.default.hash(password, salt);
        const user = yield User_1.default.create({ userName: firstName, lastName, email, password: hashPass });
        const { avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs } = user;
        const token = user.generateAuthToken();
        res.cookie("access_token", token, { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true }).status(201).send({ userName: firstName, lastName, email, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}));
exports.default = router;
