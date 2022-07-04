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
const router = (0, express_1.Router)();
const admin_1 = __importDefault(require("../../middleware/admin"));
const authorization_1 = __importDefault(require("../../middleware/authorization"));
const User_1 = __importDefault(require("../../models/User"));
router.put("/", [authorization_1.default, admin_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { id, value } = req.body;
        if (id === req.userId)
            return res.status(403).send("que mierda haces");
        if (value !== "user" && value !== "admin")
            return res.status(401).end();
        yield User_1.default.updateOne({ _id: id }, { role: value });
        const user = yield User_1.default.findById(id);
        res.status(200).send(user);
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
exports.default = router;
