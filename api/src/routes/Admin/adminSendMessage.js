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
const sendEmail_1 = __importDefault(require("../../utils/sendEmail"));
router.post("/", [authorization_1.default, admin_1.default], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const allEmails = yield User_1.default.find({}).where("isEmailSubscripted").equals(true).select({ _id: 0, email: 1 });
        yield (0, sendEmail_1.default)({ email: allEmails.map(user => user.email), subject: req.body.subject, text: req.body.msg });
        res.status(200).send("Successfully sent emails");
    }
    catch (err) {
        res.status(500).send(err.message);
    }
}));
exports.default = router;
