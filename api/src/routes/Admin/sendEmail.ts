import { Router } from "express";
import admin from "../../middleware/admin";
import authorization from "../../middleware/authorization";
import sendEmail from "../../utils/sendEmail";
const router = Router()

router.post("/", [authorization, admin], async (req: Request, res: any) => {
    try {
        const { emailMsg, email}: any = req.body
        sendEmail({email, subject: "Support is contacting with you", text: emailMsg})
        res.status(200).send("se ha enviado tu mensaje")
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router