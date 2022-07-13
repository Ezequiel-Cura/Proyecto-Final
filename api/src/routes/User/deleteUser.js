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
const User_1 = __importDefault(require("../../models/User"));
const router = (0, express_1.Router)();
router.delete("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.query;
    User_1.default.findByIdAndDelete(id)
        .then((user) => {
        if (user) {
            return res.status(200).send(`Usuario ${user} eliminado`);
        }
        else {
            return res.status(404).send(`Usuario ${user} eliminado`);
        }
    })
        .catch((e) => {
        res.status(400).send('Error en protocolo de borrado');
    });
}));
exports.default = router;
