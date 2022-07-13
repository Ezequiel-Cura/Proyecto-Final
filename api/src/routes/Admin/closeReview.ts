import { Router } from "express";
const router = Router()
import admin from "../../middleware/admin";
import authorization from "../../middleware/authorization";
import User from "../../models/User";

router.put("/", [authorization, admin], async (req: any, res: any) => {
    try {
        const review = await User.findOneAndUpdate({"review.reports._id": req.body.reviewId},
        {
            $set: {
                "review.reports.$.status": "reviewed"
            }
        })
        console.log(review)
        res.status(200).end()
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router