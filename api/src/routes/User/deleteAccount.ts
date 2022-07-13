import { Router, Request, Response } from "express";
import authorization from "../../middleware/authorization";
import User from "../../models/User";
const router = Router()

router.delete("/", authorization, async (req: Request, res: Response) => {
  try {
    const result = await User.deleteOne({_id: req.userId})
    if(result.deletedCount === 0) return res.status(404).send("There has been an error deleting this user")
    res.status(200).end()
  } catch (err: any) {
    res.status(500).send(err.message)
  }
})

export default router