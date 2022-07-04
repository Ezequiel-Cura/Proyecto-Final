
import { Router, Request, Response } from "express";

import authorization from "../../middleware/authorization";
import User from "../../models/User";

const router = Router()

router.post("/", authorization, async (req: any, res: Response) => {
  // router.post("/", async (req: any, res: Response) => {

  const { id, value } = req.body

  // const id = req.userId
  // const id = "62c0a45f6ffc62c777c647de"
  try {
    const user = await User.findById(id)

    if (!user) return res.status(404).send(`No se encontró al usuario con id: ${req.userId}`)

    await user.categories.push(value)
    await user.save()
    res.status(200).send(user)

  }
  catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
});

export default router;
