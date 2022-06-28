import { Router, Request, Response } from "express";
import User from "../../models/User";


const router = Router()

router.put("/", async (req: Request, res: Response) => {
  const {id, key, value} = req.body

  try {
      const result = await User.updateOne({_id: id}, { $set: { [key]: value} });
      // const result = await User.findOneAndUpdate({_id: id}, { [key]: value }).save();

      result
          ? res.status(200).send({key, value})
          : res.status(304).send(`User with id: ${id} not updated`);
  } catch (error: any) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});

export default router