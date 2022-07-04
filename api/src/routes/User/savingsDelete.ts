
import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";

import User from "../../models/User";


const router = Router()

router.delete("/", async (req: any, res: Response) => {

  const {id, value } = req.body

  try {
    const user = await User.findById(id)
    if (!user) {
      res.status(404).send(`No se encontró al usuario con id: ${id}`)
    } else {
        user.savings.remove( {"_id": new ObjectId(value._id)})
        await user.save()
        res.status(200).send(user)
      }
    }
  catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
});

export default router;