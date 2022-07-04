import { Router } from "express";
const router = Router()
import admin from "../../middleware/admin";
import authorization from "../../middleware/authorization";
import User from "../../models/User";

router.put("/", [authorization, admin], async (req: any, res: any) => {
    try {
        const { id, value } = req.body
        if (id === req.userId) return res.status(403).send("que mierda haces")
        if (value !== "user" && value !== "admin") return res.status(401).end()
        await User.updateOne({_id: id}, {role: value})
        const user = await User.findById(id)
        res.status(200).send(user)
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router