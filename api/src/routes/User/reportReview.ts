import { Request, Response, Router } from "express"
import authorization from "../../middleware/authorization"
import User from "../../models/User"
const router = Router()

router.post("/", authorization, async (req: Request, res: Response)=> {
    try {
        const user: any = await User.findById(req.body.id)
        user.review.reported
        user.save()
        res.status(200).send(user)
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router