import { Router } from "express";
import User from './User/index';
import Admin from "./Admin"

const router = Router()

router.use("/user", User)
router.use("/admin", Admin)

export default router