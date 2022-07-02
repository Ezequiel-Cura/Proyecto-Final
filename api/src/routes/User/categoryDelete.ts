import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import authorization from "../../middleware/authorization";
import User from "../../models/User";


const router = Router()

router.delete("/", authorization, async (req: any, res: Response) => {

  const { value } = req.body
  const id = req.userId

  try {
    const user:any = await User.findById(id)

    if (!user) return res.status(404).send(`No se encontró al usuario con id: ${req.userId}`)

    await user.categories.remove({"_id": new ObjectId(value.id)}).save()
    res.status(200).send(user.categories)

  }
  catch (err) {
    res.status(400).send(err)
  }
});

export default router