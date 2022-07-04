<<<<<<< HEAD

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

    await user.categories.push(value)
    await user.save()
    res.status(200).send({key, value: user[key]})

  }
  catch (err) {
    res.status(400).send(err)
  }

});

export default router;
=======

import { Router, Request, Response } from "express";

import authorization from "../../middleware/authorization";
import User from "../../models/User";

const router = Router()

router.post("/", authorization, async (req: any, res: Response) => {
  // router.post("/", async (req: any, res: Response) => {

  const {frequency, type, name} = req.body

  const id = req.userId
  // const id = "62c0a45f6ffc62c777c647de"
  try {
    const user = await User.findById(id)

    if (!user) return res.status(404).send(`No se encontró al usuario con id: ${req.userId}`)

    await user.categories.push({frequency, type, name})
    await user.save()
    res.status(200).send(user)

  }
  catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
});

export default router;
>>>>>>> 26a858e7e1200fa57e5c7d62b38e8bfbdf5c3aef
