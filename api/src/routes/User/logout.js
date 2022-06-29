"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const authorization_1 = __importDefault(require("../../middleware/authorization"));
const router = (0, express_1.Router)();
router.post("/", authorization_1.default, (req, res) => {
    res.clearCookie("access_token").status(200).send({ message: "Successfully logged out" });
});
exports.default = router;
