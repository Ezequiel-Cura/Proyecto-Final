
import { Router, Request, Response } from "express";

import authorization from "../../middleware/authorization";
import User from "../../models/User";

const router = Router()

router.post("/", authorization, async (req: any, res: Response) => {

  const {value} = req.body
  const id = req.userId

  try {
    const user = await User.findById(id)

    if (!user) return res.status(404).send(`No se encontró al usuario con id: ${id}`)

    await user.categories.push(value)
    await user.save()
    res.status(200).send(user)

  }
  catch (err) {
    res.status(400).send(err)
  }

});

export default router;
