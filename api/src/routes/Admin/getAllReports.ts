import { Router } from "express";
import admin from "../../middleware/admin";
import authorization from "../../middleware/authorization";
import User from "../../models/User";
const router = Router()

router.get("/", [authorization, admin], async (req: Request, res: any) => {
    try {
        const allReviews = await User.find({}).where("review").exists(true).select({_id: 0, review: 1})
        res.status(200).send(allReviews.filter((review) => review?.review?.reports?.length))
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router