"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const register_1 = __importDefault(require("./register"));
const login_1 = __importDefault(require("./login"));
const googleLogin_1 = __importDefault(require("./googleLogin"));
const logout_1 = __importDefault(require("./logout"));
const getUserInfo_1 = __importDefault(require("./getUserInfo"));
const accountAdd_1 = __importDefault(require("./accountAdd"));
const savings_1 = __importDefault(require("./savings"));
const userUpdate_1 = __importDefault(require("./userUpdate"));
const accountDelete_1 = __importDefault(require("./accountDelete"));
const deleteUser_1 = __importDefault(require("./deleteUser"));
const categoryAdd_1 = __importDefault(require("./categoryAdd"));
const categoryDelete_1 = __importDefault(require("./categoryDelete"));
router.use('/login', login_1.default);
router.use('/register', register_1.default);
router.use('/googleLogin', googleLogin_1.default);
router.use('/logout', logout_1.default);
router.use('/getUserInfo', getUserInfo_1.default);
router.use('/update', userUpdate_1.default);
router.use('/delete', deleteUser_1.default);
router.use('/account', accountAdd_1.default);
router.use('/account', accountDelete_1.default);
router.use('/category', categoryAdd_1.default);
router.use('/category', categoryDelete_1.default);
router.use('/savings', savings_1.default);
exports.default = router;
