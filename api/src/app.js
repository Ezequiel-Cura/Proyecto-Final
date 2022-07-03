"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./db");
const routes_1 = __importDefault(require("./routes"));
const morgan_1 = __importDefault(require("morgan"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
const body_parser_1 = __importDefault(require("body-parser"));
// Initializations
(0, db_1.connectDB)();
const server = (0, express_1.default)();
server.set("port", process.env.PORT || 3001);
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(body_parser_1.default.json());
server.use((0, cookie_parser_1.default)());
server.use((0, morgan_1.default)("dev"));
server.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', process.env.FRONT_URL || "http://localhost:3000/"); // update to match the domain you will make the request from
    res.header('Access-Control-Allow-Credentials', 'true');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
    next();
});
server.get("/ping", (req, res) => {
    res.status(200).send("pong");
});
server.use('/', routes_1.default);
exports.default = server;
