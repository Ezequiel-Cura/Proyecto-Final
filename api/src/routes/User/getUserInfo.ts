import { Router, Response } from "express"
import User from "../../models/User"
import authorization from "../../middleware/authorization"

const router = Router()

router.get("/", authorization, async (req: any, res: Response) => {
  try {
    const user : any = await User.findById(req.userId).select({
      _id: 0, 
      email: 1, 
      firstName: 1, 
      lastName: 1, 
      avatar: 1, 
      Account: 1, 
      Saving: 1, 
      premium: 1, 
      CategoriesExpenses: 1, 
      CategoriesInputs: 1, 
      role: 1
    })
    res.status(200).send(user)
  } catch (err: any) {
    res.status(404).send(err.message)
  }
})

export default router


