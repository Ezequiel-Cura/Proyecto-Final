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
// Funciona como un get para traer toda la data del usuario:
router.post("/user/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email, password } = req.body;
        const User = yield UserNoSql_temp_1.default.findOne({ email });
        if (!User)
            return res.status(400).send('Usuario inexistente');
        const passwordCompare = yield bcrypt_1.default.compare(password, User.password);
        if (passwordCompare) {
            return res.status(200).json(User);
        }
        else {
            return res.status(400).send('Contraseña Incorrecta');
        }
    }
    catch (err) {
        res.status(404).send(err);
    }
}));
// Para agregar valores a la cuenta del usuario:
router.post("/user/account", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, key, value } = req.body;
    try {
        const user = yield UserNoSql_temp_1.default.findById(id);
        if (!user) {
            res.status(404).send(`No se encontró al usuario con id: ${id}`);
        }
        else {
            yield (user === null || user === void 0 ? void 0 : user.Account[key].push(value));
            yield (user === null || user === void 0 ? void 0 : user.save());
            res.status(200).send(`${key}: ${value}, usuario con id: ${id} actualizado`);
        }
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
// Para registrar al usuario:
router.post("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { firstName, lastName, email, password } = req.body;
    try {
        const { error } = schema.validate(req.body);
        if (error)
            return res.status(400).send({ message: error.details[0].message });
        const userExistCheck = yield UserNoSql_temp_1.default.findOne({ email: email });
        if (userExistCheck)
            return res.status(400).send('Email ya registrado');
        const salt = yield bcrypt_1.default.genSalt(Number(process.env.SUPER_SECRET_SALT));
        const hashPass = yield bcrypt_1.default.hash(password, salt);
        const user = yield UserNoSql_temp_1.default.create({ userName: firstName, lastName, email, password: hashPass });
        res.status(201).json(`${user} creado exitosamente.`);
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
        const result = yield UserNoSql_temp_1.default.updateOne({ _id: id }, { $set: { [key]: value } });
        // const result = await UserNoSqlTemp.findOneAndUpdate({_id: id}, { [key]: value }).save();
        result
            ? res.status(200).json({ key, value })
            : res.status(304).send(`User with id: ${id} not updated`);
    }
    catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
}));
// router.delete("/user/account", async (req: Request, res: Response) => {
//   const {date, key, value} = req.body
//   try{
//     const user = await UserNoSqlTemp.findById(id)
//     await user?.Account[key].filter(obj => obj === value)
//     await user?.save()
//     res.status(200).send('Usuario actualizado')
//   }
//   catch (err) {
//     res.status(400).send(err)
//   }
// });
router.delete("/user", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    UserNoSql_temp_1.default.findByIdAndDelete(id)
        .then((user) => {
        console.log(user);
        if (user) {
            res.status(200).json(`Usuario ${user} eliminado`);
        }
        else {
            res.status(404).json(`Usuario ${user} eliminado`);
        }
    })
        .catch(() => {
        res.status(400).send('Error en protocolo de borrado');
    });
}));
exports.default = router;
