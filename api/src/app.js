"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const testingRoutes_1 = __importDefault(require("../databases/testingRoutes"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
// Initializations
(0, db_1.connectDB)();
const server = (0, express_1.default)();
server.set("port", process.env.PORT || 3000);
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(body_parser_1.default.json());
server.use((0, cookie_parser_1.default)());
server.use((0, morgan_1.default)("dev"));
server.use((0, cors_1.default)());
server.get("/ping", (req, res) => {
    res.status(200).send("pong");
});
server.use('/', testingRoutes_1.default);
exports.default = server;
