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
const User_1 = __importDefault(require("../../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const crypto_1 = __importDefault(require("crypto"));
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
const schema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        let user = yield User_1.default.findOne({ email });
        if (user)
            return res.status(400).send('Email ya registrado');
        const salt = yield bcrypt_1.default.genSalt(Number(process.env.SUPER_SECRET_SALT));
        const hashPass = yield bcrypt_1.default.hash(password, salt);
        const { verifyToken, _id } = yield User_1.default.create({ firstName, lastName, email, password: hashPass, verifyToken: crypto_1.default.randomBytes(32).toString("hex") });
        (0, sendEmail_1.default)({ email, subject: "Verifica tu cuenta", text: `Porfavor verifica tu email apretando en el siguiente link: \n ${process.env.FRONT_URL}/users/${_id}/verify/${verifyToken}` });
        res.status(201).send({ message: "Se ha enviado un Email a tu cuenta para la verificación" });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}));
router.get("/:id/verify/:verifyToken", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findOne({ _id: req.params.id });
        if (!user)
            return res.status(400).send("No existe este usuario");
        if (!user.verifyToken)
            return res.status(400).send("El usuario ya esta verificado");
        user.verified = true;
        yield user.save();
        res.status(200).send("Se ha verificado su Email");
    }
    catch (err) {
        res.status(500).send("Huh?");
    }
}));
exports.default = router;
