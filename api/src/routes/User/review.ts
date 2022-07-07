import { Request, Response, Router } from "express"
import authorization from "../../middleware/authorization"
import User from "../../models/User"
const router = Router()

router.get("/", authorization, async (req: Request, res: Response)=> {
    try {
        const user = await User.findById(req.userId)
        res.status(200).send(user?.review)
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

router.post("/", authorization, async (req: Request, res: Response)=> {
    try {
        const { review } = req.body
        const user: any = await User.findById(req.userId)
        user.review = review;
        await user.save()
        res.status(200).send("Se ha subido tu Review")
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

router.delete("/", authorization, async (req: Request, res: Response)=> {
    try {
        const user: any = await User.updateOne({_id: req.userId}, {$unset : { review: 1}})
        console.log(user)
        res.status(200).send("Se ha borrado tu Review")
    } catch (err: any) {
        res.status(500).send(err.message)
    }
})

export default router