import { Router } from "express";
import User from './User/index';
import Admin from "./Admin"
import Emails from "./Emails"
import Common from "./common"
import convertCurrency from './ConvertCurrency/ConvertCurrency'
import Crypto from './CryptoCurrency/index'

const router = Router()

router.use("/user", User)
router.use("/admin", Admin)
router.use("/emails", Emails)
router.use("/common", Common)
router.use("/currency", convertCurrency)
router.use("/crypto", Crypto)

export default router