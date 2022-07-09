import { Router } from "express"
import admin from "../../middleware/admin"
import authorization from "../../middleware/authorization"
import User from "../../models/User"
const router = Router()

router.put("/", [authorization, admin], async (req: any, res: any) => {
    try {
        const {id, value}: any = req.body
        if (typeof value !== "boolean") return res.status(404).send("huh")
        const result = await User.updateOne({_id: id}, {$set: {banned: value}})
        if (result.modifiedCount === 0) return res.status(500).send("There was an error")
        const user = await User.findById({_id: id})
        res.status(200).send(user?.banned)
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router