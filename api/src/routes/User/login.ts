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
      const {firstName, lastName, avatar, premium, role, savings, fees, monthly, extra, categories} = user
      const token = user.generateAuthToken()
      return res.cookie("access_token", token, {maxAge : 7 * 24 * 3600 * 1000, httpOnly: true, sameSite: process.env.NODE_ENV ? "none" : "lax", secure: process.env.NODE_ENV ? true : false}).status(200).end()
    }
    res.status(400).end()
  } catch (err: any) {
    res.status(404).send(err.message)
  }
});

export default router