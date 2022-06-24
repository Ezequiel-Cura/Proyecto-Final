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

const mongodb_1 = require("mongodb");

const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const UserNoSql_temp_1 = __importDefault(require("../../databases/models/UserNoSql(temp)"));
const bcrypt_1 = __importDefault(require("bcrypt"));
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
    const { userName, lastName, email, password } = req.body;
    try {
        const userExistCheck = yield UserNoSql_temp_1.default.findOne({ email: email });
        if (userExistCheck) {
            return res.status(400).send('E-mail ya registrado');
        }
        bcrypt_1.default.hash(password, 10)
            .then((hashPass) => {
            return UserNoSql_temp_1.default.create({
                userName,
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

    bcrypt_1.default.hash(password, 10)
        .then((hashPass) => {
        return UserNoSql_temp_1.default.create({
            userName,
            lastName,
            email,
            password: hashPass
        });
    })
        .then((user) => {
        res.status(200).send(user);
    })
        .catch((err) => {
        console.log(err);
        res.status(400).send('Error en creacion de usuario');
    });
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
