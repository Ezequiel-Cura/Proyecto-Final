"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const axios_1 = __importDefault(require("axios"));
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, to, amount } = req.body;
    try {
        const convertCrypto = yield (0, axios_1.default)(`https://criptoya.com/api/${id}/${to}/${amount}`);
        res.status(200).send(convertCrypto.data);
    }
    catch (error) {
        console.log(error);
        res.status(404).send(error);
    }
}));
exports.default = router;
