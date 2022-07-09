import { Request, Response, Router } from "express"
import authorization from "../../middleware/authorization"
import User from "../../models/User"
const router = Router()

router.post("/", authorization, async(req: Request, res: Response) => {
    try {
        const user: any = await User.findById(req.userId)
        if (user?.supportMessages?.length) user?.supportMessages.push(req.body.message)
        else user.supportMessages = [req.body.message]
        await user.save()
        res.status(201).end()
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router