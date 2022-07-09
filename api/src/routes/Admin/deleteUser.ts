import { Router } from "express"
import admin from "../../middleware/admin"
import authorization from "../../middleware/authorization"
import User from "../../models/User"
const router = Router()

router.delete("/", [authorization, admin], async (req: any, res: any) => {
    try {
        const result = await User.deleteOne({_id: req.query.id})
        if(result.deletedCount === 0) return res.status(404).send("There has been an error deleting this user")
        res.status(200).end()
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router