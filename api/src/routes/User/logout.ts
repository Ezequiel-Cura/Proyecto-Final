import { Router, Request, Response } from "express"
import authorization from '../../middleware/authorization'

const router = Router()

router.post("/", authorization , (req: Request, res: Response) => {
  res.clearCookie("access_token").status(200).end()
})

export default router