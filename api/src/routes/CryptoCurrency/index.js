"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const getCryptoList_1 = __importDefault(require("./getCryptoList"));
const searchCrypto_1 = __importDefault(require("./searchCrypto"));
const supportedCurrency_1 = __importDefault(require("./supportedCurrency"));
router.use('/getCryptoList', getCryptoList_1.default);
router.use('/searchCrypto', searchCrypto_1.default);
router.use('/supportedCurrency', supportedCurrency_1.default);
exports.default = router;
