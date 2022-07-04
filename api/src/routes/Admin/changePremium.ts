import { Router } from "express"
import admin from "../../middleware/admin"
import authorization from "../../middleware/authorization"
import User from "../../models/User"
const router = Router()

router.put("/", [authorization, admin], async (req: any, res: any) => {
    try {
        const {id, value} = req.body
        if (value !== "false" && value !== "true") return res.status(403).send("huh?")
        await User.updateOne({_id: id}, {premium: value})
        const user = await User.findById(id)
        res.status(200).send(user)
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router