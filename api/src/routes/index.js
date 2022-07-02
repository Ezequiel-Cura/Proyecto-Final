"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const User_1 = __importDefault(require("./User"));
const Admin_1 = __importDefault(require("./Admin"));
const router = (0, express_1.Router)();
router.use("/user", User_1.default);
router.use("/admin", Admin_1.default);
exports.default = router;
