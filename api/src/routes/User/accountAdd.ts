import { Router, Request, Response } from "express";
import authorization from "../../middleware/authorization";
import User from "../../models/User";


const router = Router()

router.post("/", authorization, async (req: any, res: Response) => {
  const { key, value } = req.body
  try {
    const user = await User.findById(req.userId)
    console.log(user)
    if (!user) {
      res.status(404).send(`No se encontró al usuario con id: ${req.userId}`)
    } else {
      const {email, userName, lastName, avatar, Account} = user
      await user.Account[key].push(value)
      await user.save()
      res.status(200).send({email, userName, lastName, avatar, Account})
    }
  }
  catch (err) {
    res.status(400).send(err)
  }

});

export default router