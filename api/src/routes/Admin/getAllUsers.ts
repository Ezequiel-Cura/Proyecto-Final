import { Router } from "express";
import admin from "../../middleware/admin";
import authorization from "../../middleware/authorization";
import User from "../../models/User";
const router = Router()

router.get("/", [authorization, admin], async (req: Request, res: any) => {
    try {
        const allUsers = await User.find({}).select({firstName: 1, lastName: 1, email: 1, role: 1,  premium: 1})
        res.status(200).send(allUsers)
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router