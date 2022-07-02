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
const router = (0, express_1.Router)();
// router.post("/", authorization, async (req: any, res: Response) => {
router.post("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { frequency, key, value } = req.body;
    const date = `${new Date().getMonth() + 1}-${new Date().getFullYear()}`;
    // const id = req.userId
    const id = "62c0a45f6ffc62c777c647de";
    try {
        const user = yield User_1.default.findById(id);
        if (!user)
            return res.status(404).send(`No se encontró al usuario con id: ${req.userId}`);
        if (frequency === "monthly") {
            yield user[frequency][key].push(value);
            yield user.save();
            res.status(200).send(user);
        }
        // else{
        //   const accountUpdate = user.extra[key].findById(value._id)
        // }
    }
    catch (err) {
        console.log(err);
        res.status(400).send(err);
    }
}));
exports.default = router;
