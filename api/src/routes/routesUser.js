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
const User_1 = __importDefault(require("../models/User"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const joi_1 = __importDefault(require("joi"));
const mongodb_1 = require("mongodb");
const jwt_decode_1 = __importDefault(require("jwt-decode"));
const authorization_1 = __importDefault(require("../middleware/authorization"));
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
router.post("/user/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const user = yield User_1.default.findOne({ email });
        if (!user)
            return res.status(400).send('Usuario inexistente');
        const passwordCompare = yield bcrypt_1.default.compare(password, user.password);
        if (passwordCompare) {
            const { email, userName, lastName, avatar, Account } = user;
            const token = user.generateAuthToken();
            return res.cookie("access_token", token, { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true }).status(200).send({ email, userName, lastName, avatar, Account });
        }
        res.status(400).send('Contraseña Incorrecta');
    }
    catch (err) {
        res.status(404).send(err);
    }
}));
router.post("/user/googleLogin", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        console.log(user);
        if (user) {
            const validPassword = yield bcrypt_1.default.compare(password, user.password);
            if (!validPassword)
                return res.status(400).send("La contraseña es incorrecta");
            const token = user.generateAuthToken();
            const { userName, lastName, avatar } = user;
            return res.cookie("access_token", token, { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true }).status(200).send({ userName, lastName, email, avatar });
        }
        else {
            const newUser = yield new User_1.default({ userName: given_name, email, password: passwordHash, avatar: picture }).save();
            const token = newUser.generateAuthToken();
            const { userName, lastName, avatar } = newUser;
            res.cookie("access_token", token, { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true }).status(200).send({ userName, lastName, email, avatar });
        }
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
router.post("/user/logout", authorization_1.default, (req, res) => {
    res.clearCookie("access_token").status(200).send({ message: "Successfully logged out" });
});
router.get("/user/getUserInfo", authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, userName, lastName, avatar } = yield User_1.default.findById(req.userId);
        res.status(200).send({ email, userName, lastName, avatar });
    }
    catch (err) {
        res.status(404).send(err.message);
    }
}));
// Para agregar valores a la cuenta del usuario se mandan así los parámetros en el body:
// {   "id": "62b7b9f2168812a442797012",
//     "key": "extraInput",
//     "value": {"description": "para comer",
//     "amount": 5000}
// }
router.post("/user/account", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, key, value } = req.body;
    try {
        const user = yield User_1.default.findById(id);
        if (!user) {
            res.status(404).send(`No se encontró al usuario con id: ${id}`);
        }
        else {
            yield user.Account[key].push(value);
            yield user.save();
            res.status(200).send(user);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
// Para agregar ahorros se requiere dos parámetros:
router.post("/user/saving", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, value } = req.body;
    try {
        const user = yield UserNoSql_temp_1.default.findById(id);
        if (!user) {
            res.status(404).send(`No se encontró al usuario con id: ${id}`);
        }
        else {
            user.Saving.push(value);
            yield user.save();
            res.status(200).send(user);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
// Para registrar al usuario:
router.post("/user/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
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
        const { avatar, Account } = user;
        const token = user.generateAuthToken();
        res.cookie("access_token", token, { maxAge: 7 * 24 * 3600 * 1000, httpOnly: true }).status(201).send({ userName: firstName, lastName, email, avatar, Account });
    }
    catch (err) {
        res.status(400).send(err.message);
    }
}));
// Para modificar y setear datos del usuario manden los tres datos con sus respectivos valores:
// {"id": "62b7b9f2168812a442797012",
// "key": "userName",
// "value": "test"}
router.put("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, key, value } = req.body;
    try {
        const result = yield User_1.default.updateOne({ _id: id }, { $set: { [key]: value } });
        // const result = await User.findOneAndUpdate({_id: id}, { [key]: value }).save();
        result
            ? res.status(200).send({ key, value })
            : res.status(304).send(`User with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
// Para eliminar entradas de la cuenta, hay que pasar estos parametros por body:
// {   "id": "62b7b9f2168812a442797012",
//     "key": "extraInput",
//     "value": {"_id": "62b8b79f91091d937fe969d7"}
// }
router.delete("/user/account", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, key, value } = req.body.source;
    try {
        const user = yield User_1.default.findById(id);
        if (!user) {
            console.log({ user });
            res.status(404).send(`No se encontró al usuario con id: ${id}`);
        }
        else {
            yield user.Account[key].remove({ "_id": new mongodb_1.ObjectId(value._id) });
            yield user.save();
            res.status(200).send(user);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
router.delete("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    User_1.default.findByIdAndDelete(id)
        .then((user) => {
        if (user) {
            res.status(200).send(`Usuario ${user} eliminado`);
        }
        else {
            res.status(404).send(`Usuario ${user} eliminado`);
        }
    })
        .catch(() => {
        res.status(400).send('Error en protocolo de borrado');
    });
}));
exports.default = router;
