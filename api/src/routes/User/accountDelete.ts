import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import User from "../../models/User";


const router = Router()


router.delete("/", async (req: Request, res: Response) => {
  const {id, key, value} = req.body.source

  try{
    const user = await User.findById(id)
    if(!user){
      console.log({user})
     res.status(404).send(`No se encontró al usuario con id: ${id}`)
    } else {
      await user.Account[key].remove( {"_id": new ObjectId(value._id)})
      await user.save()
      res.status(200).send(user)
    }
  }
  catch (err) {
    res.status(400).send(err)
  }
});

export default router