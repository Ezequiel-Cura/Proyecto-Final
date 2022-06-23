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
const UserNoSql_temp_1 = __importDefault(require("./UserNoSql(temp)"));
const Category_1 = __importDefault(require("./Category"));
exports.default = { Category: Category_1.default, UserNoSqlTemp: UserNoSql_temp_1.default };
