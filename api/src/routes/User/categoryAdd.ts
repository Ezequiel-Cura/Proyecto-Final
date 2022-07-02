
import { Router, Request, Response } from "express";

import authorization from "../../middleware/authorization";
import User from "../../models/User";

const router = Router()

router.post("/", authorization, async (req: any, res: Response) => {

  const { key, value } = req.body
  const id = req.userId

  try {
    const user:any = await User.findById(id)

    if (!user) return res.status(404).send(`No se encontró al usuario con id: ${req.userId}`)

    await user.categories.push(value).save()
    res.status(200).send({key, value: user[key]})

  }
  catch (err) {
    res.status(400).send(err)
  }

});

export default router;
