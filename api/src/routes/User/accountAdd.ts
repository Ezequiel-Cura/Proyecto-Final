import { Router, Request, Response } from "express";
import authorization from "../../middleware/authorization";
import User from "../../models/User";


const router = Router()

router.post("/", authorization, async (req: any, res: Response) => {
  // router.post("/", async (req: any, res: Response) => {
  const { frequency, key, value } = req.body
  const date = `${new Date().getMonth() + 1}-${new Date().getFullYear()}`
  const id = req.userId
  // const id = "62c0a45f6ffc62c777c647de"
  try {
    const user: any = await User.findById(id)
    if (!user) return res.status(404).send(`No se encontró al usuario con id: ${req.userId}`)
    if(frequency === "monthly"){
      await user[frequency][key].push(value)
      await user.save()
      res.status(200).send(user)
    } 
    else{
      // const accountUpdate = user.extra[key].findById(value._id) No entiendo lo del date
      await user[frequency][key].entries.push(value)
      await user.save()
      res.status(200).send(user)
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).send(err)
  }

});

export default router;