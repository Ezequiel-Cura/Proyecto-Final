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
const authorization_1 = __importDefault(require("../../middleware/authorization"));
const User_1 = __importDefault(require("../../models/User"));
const router = (0, express_1.Router)();
router.delete("/", authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { key, value } = req.body;
    const id = req.userId;
    try {
        const user = yield User_1.default.findById(id);
        if (!user) {
            res.status(404).send(`No se encontró al usuario con id: ${id}`);
        }
        else {
            const { email, userName, lastName, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs } = user;
            if (key === 'CategoriesExpenses') {
                const index = user.CategoriesExpenses.indexOf(value);
                if (index < 0) {
                    res.status(404).send("La categoría que quieres eliminar no se encontró");
                }
                else {
                    user.CategoriesExpenses.splice(index, 1);
                    yield user.save();
                    res.status(200).send({ email, userName, lastName, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs });
                }
            }
            else if (key === 'CategoriesInputs') {
                const indexIn = user.CategoriesInputs.indexOf(value);
                if (indexIn < 0) {
                    res.status(404).send("La categoría que quieres eliminar no se encontró");
                }
                else {
                    user.CategoriesInputs.splice(indexIn, 1);
                    yield user.save();
                    res.status(200).send({ email, userName, lastName, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs });
                }
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}));
exports.default = router;
