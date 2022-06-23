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
const index_1 = __importDefault(require("../../databases/models/index")); // importas todos los modelos como un objeto al que despues accedes con db.[modelo]
const router = (0, express_1.Router)();
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const newUser = req.body;
        console.log({ newUser });
        const savingNewUser = yield index_1.default.UserNoSqlTemp.create(newUser);
        savingNewUser
            ? res.status(200).json(`Successfully created a new user with id ${savingNewUser._id}`)
            : res.status(500).send("Failed to create a new user.");
    }
    catch (error) {
        res.status(400).send("Error en la ruta post de user");
    }
}));
router.get("/", (_req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const Users = yield index_1.default.UserNoSqlTemp.find({});
        console.log("Users: ", Users);
        res.status(200).send(Users);
    }
    catch (error) {
        res.status(500).send(error.message);
    }
}));
exports.default = router;
