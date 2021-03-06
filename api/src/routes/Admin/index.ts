import { Router } from "express";
const router = Router()
import getAllUsers from "./getAllUsers"
import changeRole from "./changeRole"
import changePremium from "./changePremium"
import getUserById from "./getUserById"
import sendEmail from "./sendEmail"
import deleteUserReview from "./deleteUserReview"
import banUser from "./banUser"
import deleteUser from "./deleteUser"
import closeReview from "./closeReview"
import adminSendMessage from "./adminSendMessage"

router.use("/getAllUsers", getAllUsers)
router.use("/changeRole", changeRole)
router.use("/changePremium", changePremium)
router.use("/getUserById", getUserById)
router.use("/sendEmail", sendEmail)
router.use("/deleteUserReview", deleteUserReview)
router.use("/banUser", banUser)
router.use("/deleteUser", deleteUser)
router.use("/closeReview", closeReview)
router.use("/adminSendMessage", adminSendMessage)

export default router