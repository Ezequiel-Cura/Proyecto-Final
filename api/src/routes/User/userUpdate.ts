import { Router, Response } from "express";
import authorization from "../../middleware/authorization";
import User from "../../models/User";


const router = Router()

router.put("/", authorization, async (req: any, res: Response) => {

const id = req.userId

  try {
      const {key, value} = req.body
      const result = await User.updateOne({_id: id}, { $set: { [key]: value} })
      const user: any = await User.findById(id).select({_id: 0, [key]: 1})
      if(user){
        result
        ? res.status(200).send({key, value: user[key]})
        : res.status(304).send("Failed update"); 
      }
  } catch (error: any) {
      res.status(400).send(error.message);
  }
});

export default router;