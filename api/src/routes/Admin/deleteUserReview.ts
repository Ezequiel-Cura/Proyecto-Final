import { Router } from "express"
import admin from "../../middleware/admin"
import authorization from "../../middleware/authorization"
import User from "../../models/User"
const router = Router()

router.delete("/", [authorization, admin], async (req: any, res: any) => {
    try {
        const {id} = req.query
        await User.updateOne({_id: id}, {$unset: {review: 1}})
        const user = await User.findById(id)
        res.status(200).send(user?.review)
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router