"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const getCryptoList_1 = __importDefault(require("./getCryptoList"));
const convertCrypto_1 = __importDefault(require("./convertCrypto"));
router.use('/getCryptoList', getCryptoList_1.default);
router.use('/convertCrypto', convertCrypto_1.default);
exports.default = router;
