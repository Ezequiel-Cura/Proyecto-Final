import { Router } from "express"
import User from "../../models/User"
const router = Router()

router.get("/", async (req: any, res: any) => {
    try {
        const allReviews = await User.find({}).where("review").exists(true).select({_id: 0, firstName: 1, lastName: 1, avatar: 1, review: 1})
        if (!allReviews) return res.status(404).send("Aun no hay reviews")
        res.status(200).send(allReviews)
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router