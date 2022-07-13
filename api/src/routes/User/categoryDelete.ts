import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import authorization from "../../middleware/authorization";
import User from "../../models/User";


const router = Router()

router.delete("/", authorization, async (req: any, res: Response) => {
  // router.delete("/", async (req: any, res: Response) => {
  const { _id } = req.body
  const id = req.userId
  // const id = "62c0a45f6ffc62c777c647de"

  try {
    const user = await User.findById(id)

    if (!user) return res.status(404).send(`No se encontró al usuario con id: ${req.userId}`)

    await user.categories.remove({"_id": new ObjectId(_id)})
    await user.save()
    res.status(200).send(user) 
    
  }
  catch (err) {
    res.status(400).send(err)
  }
});

export default router