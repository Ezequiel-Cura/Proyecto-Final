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
    // router.delete("/", async (req: any, res: Response) => {
    const { frequency, type, value } = req.body;
    const id = req.userId;
    console.log({ frequency, type, value });
    // const id = "62c0a45f6ffc62c777c647de"
    try {
        const user = yield User_1.default.findById(id);
        if (!user) {
            res.status(404).send(`No se encontró al usuario con id: ${id}`);
        }
        else {
            if (frequency === 'monthly') {
                yield user.monthly[type].remove({ "_id": new mongodb_1.ObjectId(value._id) });
                yield user.save();
                return res.status(200).send(user);
            }
            else if (frequency === 'extra') {
                const dateSplit = value.date.split('-');
                const targetDate = `${dateSplit[0]}-${dateSplit[1]}`; //transform date into format mm-yyyy
                const targetIndex = user.extra[type].map((e) => e.date).indexOf(targetDate);
                yield user.extra[type][targetIndex].entries.remove({ "_id": new mongodb_1.ObjectId(value._id) }); //{date, entries: []}
                yield user.save();
                return res.status(200).send(user);
            }
        }
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}));
exports.default = router;
