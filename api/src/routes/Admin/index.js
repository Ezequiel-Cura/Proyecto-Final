"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const getAllUsers_1 = __importDefault(require("./getAllUsers"));
const makeAdmin_1 = __importDefault(require("./makeAdmin"));
router.use("/getAllUsers", getAllUsers_1.default);
router.use("/makeAdmin", makeAdmin_1.default);
exports.default = router;
