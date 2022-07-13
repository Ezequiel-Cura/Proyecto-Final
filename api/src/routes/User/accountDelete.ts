import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import authorization from "../../middleware/authorization";
import User from "../../models/User";


const router = Router()


router.delete("/", authorization, async (req: any, res: Response) => {
  // router.delete("/", async (req: any, res: Response) => {
  const { frequency, type, value} = req.body
  const id = req.userId
  // const id = "62c0a45f6ffc62c777c647de"
  try{
    const user = await User.findById(id)
    if(!user){
     res.status(404).send(`No se encontró al usuario con id: ${id}`)
    } else {
      if(frequency === 'monthly'){
        await user.monthly[type].remove( {"_id": new ObjectId(value._id)})
        await user.save()
        return res.status(200).send(user)
      } else if(frequency === 'extra'){
        const dateSplit = value.date.split('-')	
        const targetDate = `${dateSplit[0]}-${dateSplit[1]}` //transform date into format mm-yyyy
        const targetIndex =  user.extra[type].map((e: any) => e.date).indexOf(targetDate)
        await user.extra[type][targetIndex].entries.remove({"_id": new ObjectId(value._id)})  //{date, entries: []}
        await user.save()
        return res.status(200).send(user)
      }

    }
  }
  catch (err) {
    res.status(400).send(err)
  }
});

export default router