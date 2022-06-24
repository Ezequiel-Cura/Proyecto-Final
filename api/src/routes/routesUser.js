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
const UserNoSql_temp_1 = __importDefault(require("../../databases/models/UserNoSql(temp)"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const schema = joi_1.default.object({
    firstName: joi_1.default.string().required(),
    lastName: joi_1.default.string().required(),
    email: joi_1.default.string().email().required(),
    password: joi_1.default.string().required()
});
const router = (0, express_1.Router)();
const entriesUpdate = (key, value) => {
    /*
    monthlyInput
    extraInput
    monthlyExpenses
    variableExpenses
    */
};
router.get("/user", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = _req.body;
    try {
        const User = yield UserNoSql_temp_1.default.findOne({ email });
        const passwordCompare = User && (yield bcrypt_1.default.compare(password, User.password));
        if (!User) {
            res.send('Usuario inexistente');
        }
        if (passwordCompare) {
            res.send(User);
        }
        else {
            res.status(400).send('Contraseña Incorrecta');
        }
    }
    catch (error) {
        res.status(404).send(error);
    }
}));
router.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(404).send(error);
        const userExistCheck = yield UserNoSql_temp_1.default.findOne({ email: email });
        if (userExistCheck) {
            return res.status(400).send('Email ya registrado');
        }
        bcrypt_1.default.hash(password, process.env.SUPER_SECRET_SALT)
            .then((hashPass) => {
            return UserNoSql_temp_1.default.create({
                userName: firstName,
                lastName,
                email,
                password: hashPass
            });
        })
            .then((user) => {
            res.status(200).send(`User con ${user.email} fue creado`);
        })
            .catch((err) => {
            console.log(err);
            res.status(400).send('Error en creacion de usuario');
        });
    }
    catch (err) {
        return res.status(400).send('Error');
    }
}));
router.delete("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    UserNoSql_temp_1.default.findByIdAndDelete(id)
        .then((user) => {
        console.log(user);
        if (user) {
            res.send('Usuario eliminado');
        }
        else {
            res.send('Usuario no encontrado');
        }
    })
        .catch(() => {
        res.status(400).send('Error en protocolo de borrado');
    });
}));
router.put("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, key, value } = req.body;
    try {
        const user = yield UserNoSql_temp_1.default.findById(id);
        yield (user === null || user === void 0 ? void 0 : user.Account[key].push(value));
        yield (user === null || user === void 0 ? void 0 : user.save());
        res.status(200).send('Usuario actualizado');
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.default = router;
