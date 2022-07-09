import { Router } from "express";
import admin from "../../middleware/admin";
import authorization from "../../middleware/authorization";
import User from "../../models/User";
const router = Router()

router.post("/", [authorization, admin], async (req: Request, res: any) => {
    try {
        const {id}: any = req.body
        const user = await User.findById(id).select({firstName: 1, avatar: 1, lastName: 1, email: 1, role: 1, premium: 1, review: 1, supportMessages: 1,})
        res.status(200).send(user)
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router