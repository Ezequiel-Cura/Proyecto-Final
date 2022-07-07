import { Router } from "express";
import User from './User/index';
import Admin from "./Admin"
import Emails from "./Emails"

const router = Router()

router.use("/user", User)
router.use("/admin", Admin)
router.use("/emails", Emails)

export default router