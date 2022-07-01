import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import authorization from "../../middleware/authorization";
import User from "../../models/User";


const router = Router()


router.delete("/", authorization, async (req: any, res: Response) => {
  const {key, value} = req.body.source
  const id = req.userId
  try{
    const user : any = await User.findById(id)
    if(!user){
     res.status(404).send(`No se encontró al usuario con id: ${id}`)
    } else {
      await user[key].remove( {"_id": new ObjectId(value._id)})
      await user.save()
      res.status(200).send("Removed")
    }
  }
  catch (err) {
    res.status(400).send(err)
  }
});

export default router