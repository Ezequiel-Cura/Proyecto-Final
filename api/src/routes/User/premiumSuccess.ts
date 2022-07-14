import { Router, Request, Response } from "express";
import authorization from "../../middleware/authorization";
import dotenv from 'dotenv'
import User from "../../models/User";
dotenv.config()

const router = Router()

router.get('/', authorization, async (req: Request, res: Response) => {
  const Id = req.userId
  try {    
    await User.findByIdAndUpdate(Id, {$set: {premium: true}})
    res.redirect(`${process.env.FRONT_URL}/home/premium`)
  } catch(err){
    res.redirect(400, `${process.env.FRONT_URL}/home/premium`)
    
  }
})

/*
const result = await User.updateOne({_id: id}, { $set: { [premium]: true} })
const user = await User.findById(id).select({_id: 0, [premium]: 1})
if(user){
  result
  ? res.status(200).send(user)
  : res.status(304).send("Failed update"); 
}
*/
export default router