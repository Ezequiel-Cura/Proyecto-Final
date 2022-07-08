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
router.put("/", authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const id = req.userId;
    try {
        const { key, value } = req.body;
        const result = yield User_1.default.updateOne({ _id: id }, { $set: { [key]: value } });
        const user = yield User_1.default.findById(id).select({ _id: 0, [key]: 1 });
        if (user) {
            result
                ? res.status(200).send({ key, value: user[key] })
                : res.status(304).send("Failed update");
        }
    }
    catch (error) {
        res.status(400).send(error.message);
    }
}));
exports.default = router;
