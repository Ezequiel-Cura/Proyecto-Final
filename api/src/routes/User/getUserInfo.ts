import { Router, Request, Response } from "express"
import User from "../../models/User"
import authorization from "../../middleware/authorization"

const router = Router()

router.get("/", authorization, async (req: any, res: Response) => {
  try {
    
    const user: any = await User.findById(req.userId).select({
      _id: 0,
      firstName: 1, 
      lastName : 1, 
      avatar : 1, 
      premium : 1, 
      role : 1, 
      savings : 1, 
      fees : 1, 
      monthly : 1, 
      extra : 1, 
      categories : 1})

    res.status(200).send(user)
  } catch (err: any) {
    res.status(404).send(err.message)
  }
})

export default router


