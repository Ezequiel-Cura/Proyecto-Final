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
const authorization_1 = __importDefault(require("../../middleware/authorization"));
const router = (0, express_1.Router)();
router.get("/", authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield User_1.default.findById(req.userId).select({
            _id: 0,
            email: 1,
            firstName: 1,
            lastName: 1,
            avatar: 1,
            savings: 1,
            premium: 1,
            monthly: 1,
            extra: 1,
            categories: 1,
            isGoogle: 1,
            review: 1,
            role: 1,
            banned: 1,
            verified: 1,
        });
        res.status(200).send(user);
    }
    catch (err) {
        res.status(404).send(err.message);
    }
}));
exports.default = router;
