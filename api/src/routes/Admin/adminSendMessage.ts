import { Router } from "express";
const router = Router()
import admin from "../../middleware/admin";
import authorization from "../../middleware/authorization";
import User from "../../models/User";
import sendEmail from "../../utils/sendEmail"

router.post("/", [authorization, admin], async (req: any, res: any) => {
    try {
      const allEmails = await User.find({}).where("isEmailSubscripted").equals(true).select({_id: 0, email: 1})
      await sendEmail({email: allEmails.map(user => user.email), subject: req.body.subject, text: req.body.msg})
      res.status(200).send("Successfully sent emails")
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router