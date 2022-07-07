"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const index_1 = __importDefault(require("./User/index"));
const Admin_1 = __importDefault(require("./Admin"));
const Emails_1 = __importDefault(require("./Emails"));
<<<<<<< HEAD
const ConvertCurrency_1 = __importDefault(require("./ConvertCurrency/ConvertCurrency"));
=======
const common_1 = __importDefault(require("./common"));
>>>>>>> 646ce524a078d93f2e95f801219758e6b704444b
const router = (0, express_1.Router)();
router.use("/user", index_1.default);
router.use("/admin", Admin_1.default);
router.use("/emails", Emails_1.default);
<<<<<<< HEAD
router.use("/currency", ConvertCurrency_1.default);
=======
router.use("/common", common_1.default);
// router.use("/currency",)
>>>>>>> 646ce524a078d93f2e95f801219758e6b704444b
exports.default = router;
