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
const cors_1 = __importDefault(require("cors"));
// Initializations
(0, db_1.connectDB)();
const server = (0, express_1.default)();
server.use(body_parser_1.default.urlencoded({ extended: true }));
server.use(body_parser_1.default.json());
server.use((0, cookie_parser_1.default)());
server.use((0, morgan_1.default)("dev"));
server.use((0, cors_1.default)({
    origin: ["http://localhost:3000", process.env.FRONT_URL, process.env.FRONT_URL1, process.env.FRONT_URL2],
    methods: ["POST", "PUT", "GET", "DELETE"],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true
}));
server.use('/', routes_1.default);
exports.default = server;
