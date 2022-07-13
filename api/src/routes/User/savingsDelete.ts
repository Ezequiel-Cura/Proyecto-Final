
import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import authorization from "../../middleware/authorization";

import User from "../../models/User";


const router = Router()

router.delete("/", authorization, async (req: any, res: Response) => {

  const { value } = req.body
const id = req.userId
  try {
    const id = req.userId
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
    res.status(400).send(err)
  }
});


export default router;