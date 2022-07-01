import { Router, Response } from "express";
import authorization from "../../middleware/authorization";
import User from "../../models/User";


const router = Router()

router.put("/", authorization, async (req: any, res: Response) => {
  try {
      const {key, value} = req.body
      const result = await User.updateOne({_id: req.userId}, { $set: { [key]: value} })
      const user: any = await User.findById(req.userId).select({avatar: 1}) 
      result
          ? res.status(200).send({key, value: user.avatar})
          : res.status(304).send("Failed update");
  } catch (error: any) {
      res.status(400).send(error.message);
  }
});

export default router