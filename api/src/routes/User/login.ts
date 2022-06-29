import { Router, Request, Response } from "express";
import User from "../../models/User";
import bcrypt from 'bcrypt'


const router = Router()

router.post("/", async (req: Request, res: Response) => {
  try {
    const { email, password } : any = req.body
    const user = await User.findOne({email})
    if (!user) return res.status(400).send('Usuario inexistente')
    const passwordCompare = await bcrypt.compare(password, user.password)
    if (passwordCompare) {
      const {email, userName, lastName, avatar, Account} = user
      const token = user.generateAuthToken()
      return res.cookie("access_token", token, {maxAge : 7 * 24 * 3600 * 1000, httpOnly: true}).status(200).send({email, userName, lastName, avatar, Account})
    }
    res.status(400).send('Contraseña Incorrecta')
  } catch (err) {
    res.status(404).send(err)
  }
});

export default router