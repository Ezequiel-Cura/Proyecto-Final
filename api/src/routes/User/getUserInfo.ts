import { Router, Request, Response } from "express"
import User from "../../models/User"
import authorization from "../../middleware/authorization"

const router = Router()

router.get("/", authorization, async (req: any, res: Response) => {
  try {
    const {email, userName, lastName, avatar, Account} : any = await User.findById(req.userId)
    res.status(200).send({email, userName, lastName, avatar, Account})
  } catch (err: any) {
    res.status(404).send(err.message)
  }
})

export default router