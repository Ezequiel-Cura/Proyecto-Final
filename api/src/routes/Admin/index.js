"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const getAllUsers_1 = __importDefault(require("./getAllUsers"));
const changeRole_1 = __importDefault(require("./changeRole"));
const changePremium_1 = __importDefault(require("./changePremium"));
router.use("/getAllUsers", getAllUsers_1.default);
router.use("/changeRole", changeRole_1.default);
router.use("/changePremium", changePremium_1.default);
exports.default = router;
