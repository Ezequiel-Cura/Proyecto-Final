import { Router, Request, Response } from "express"
const router = Router()

router.post("/", (req: Request, res: Response) => {
  res.clearCookie("access_token").status(200).end()
})

export default router