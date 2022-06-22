"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const routesUser_1 = __importDefault(require("./routesUser"));
const routeUserNoSql_1 = __importDefault(require("./routeUserNoSql"));
router.use("/", routesUser_1.default);
router.use('/test', routeUserNoSql_1.default);
exports.default = router;
