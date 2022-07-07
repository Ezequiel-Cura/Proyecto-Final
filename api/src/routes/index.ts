import { Router } from "express";
import User from './User/index';
import Admin from "./Admin"
import Emails from "./Emails"
import convertCurrency from './ConvertCurrency/ConvertCurrency'

const router = Router()

router.use("/user", User)
router.use("/admin", Admin)
router.use("/emails", Emails)
router.use("/currency", convertCurrency)

export default router