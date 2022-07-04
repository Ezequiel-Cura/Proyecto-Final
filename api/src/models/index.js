'use strict';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// In './backup/
// import User from "../../backup/User"
// import Account from "../../backup/Account"
// import UserNoSql from "./UserNoSql(temp)"
// export default {User, Account, Category, UserNoSql}
// import Category from "../../backup/Category"
const User_1 = __importDefault(require("./User"));
exports.default = { User: User_1.default };
