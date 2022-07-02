import { Router } from "express";
const router = Router()
import getAllUsers from "./getAllUsers"
import makeAdmin from "./makeAdmin"

router.use("/getAllUsers", getAllUsers)
router.use("/makeAdmin", makeAdmin)

export default router