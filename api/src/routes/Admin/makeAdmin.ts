import { Router } from "express";
const router = Router()
import admin from "../../middleware/admin";
import authorization from "../../middleware/authorization";
import User from "../../models/User";

router.put("/", [authorization, admin], async (req: any, res: any) => {
    try {
        const { id, key, value } = req.body
        if (key !== "role" && key !== "premium") return res.status(401).send("You can't change this my dude")
        if (value !== "user" && value !== "admin" && value !== "true" && value !== "false") return res.status(401).send("You can't change this value my dude")
        await User.updateOne({_id: id}, {[key]: value})
        const user = await User.findById(id)
        res.status(200).send(user)
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router