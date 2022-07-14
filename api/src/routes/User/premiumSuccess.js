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
const authorization_1 = __importDefault(require("../../middleware/authorization"));
const dotenv_1 = __importDefault(require("dotenv"));
const User_1 = __importDefault(require("../../models/User"));
dotenv_1.default.config();
const router = (0, express_1.Router)();
router.get('/', authorization_1.default, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const Id = req.userId;
    try {
        yield User_1.default.findByIdAndUpdate(Id, { $set: { premium: true } });
        res.redirect(`${process.env.FRONT_URL}/home/premium`);
    }
    catch (err) {
        res.redirect(400, `${process.env.FRONT_URL}/home/premium`);
        console.log(err);
    }
}));
/*
const result = await User.updateOne({_id: id}, { $set: { [premium]: true} })
const user = await User.findById(id).select({_id: 0, [premium]: 1})
if(user){
  result
  ? res.status(200).send(user)
  : res.status(304).send("Failed update");
}
*/
exports.default = router;
