import { Router } from "express";
const router = Router()
import getAllUsers from "./getAllUsers"
import changeRole from "./changeRole"
import changePremium from "./changePremium"

router.use("/getAllUsers", getAllUsers)
router.use("/changeRole", changeRole)
router.use("/changePremium", changePremium)

export default router