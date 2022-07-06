import { Router, Request, Response } from "express";
import User from "../../models/User";
import authorization from "../../middleware/authorization";


const router = Router()

router.post("/", authorization, async (req: any, res: Response) => {
  const {value} = req.body

    const id = req.userId
  try{
    const user = await User.findById(id)
   if(!user){
    res.status(404).send(`No se encontró al usuario con id: ${id}`)
   } else {
    user.savings.push(value)
    await user.save()
    res.status(200).send(user)
   }
  }
  catch (err: any) {
    console.log(err)
    res.status(400).send(err.message)
  }

});

export default router