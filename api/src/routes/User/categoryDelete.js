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
const authorization_1 = __importDefault(require("../../middleware/authorization"));
const User_1 = __importDefault(require("../../models/User"));
const router = (0, express_1.Router)();
router.delete("/", authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { value } = req.body;
    const id = req.userId;
    try {
        const user = yield User_1.default.findById(id);
<<<<<<< HEAD
        if (!user)
            return res.status(404).send(`No se encontró al usuario con id: ${req.userId}`);
        yield user.categories.remove({ "_id": new mongodb_1.ObjectId(value.id) }).save();
        res.status(200).send(user.categories);
=======
        if (!user) {
            res.status(404).send(`No se encontró al usuario con id: ${id}`);
        }
        else {
            const { email, firstName, lastName, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs } = user;
            if (key === 'CategoriesExpenses') {
                const index = user.CategoriesExpenses.indexOf(value);
                user.CategoriesExpenses.splice(index, 1);
                yield user.save();
                res.status(200).send({ email, firstName, lastName, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs });
            }
            else if (key === 'CategoriesInputs') {
                const indexIn = user.CategoriesInputs.indexOf(value);
                user.CategoriesExpenses.splice(indexIn, 1);
                yield user.save();
                res.status(200).send({ email, firstName, lastName, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs });
            }
        }
>>>>>>> a561fd8a15fac5350b9b97555e8a86b73b8ec5c9
    }
    catch (err) {
        res.status(400).send(err);
    }
}));
exports.default = router;
