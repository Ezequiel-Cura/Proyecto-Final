"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.server = void 0;
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
// Initializations
(0, db_1.connectDB)();
exports.server = (0, express_1.default)();
// Settings
exports.server.set("port", process.env.PORT || 3000);
