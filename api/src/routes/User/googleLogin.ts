import { Router, Request, Response } from "express";
const router = Router()
import jwt_decode from "jwt-decode"
import bcrypt from 'bcrypt';
import User from "../../models/User";

router.post("/", async (req: Request, res: Response) => {
  try {
    const {email_verified, email, given_name, picture } : any = jwt_decode(req.body.jwt)
    if(!email_verified) return res.status(403).send("Tu email no esta verificado")
    if (!email) return res.status(403).send("No tenes gmail? wtf")
    const password = email + process.env.GOOGLE_SECRET
    const salt = await bcrypt.genSalt(Number(process.env.SUPER_SECRET_SALT))
    const passwordHash = await bcrypt.hash(password, salt)
    const user = await User.findOne({email})
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(400).send("La contraseña es incorrecta")
        const token = user.generateAuthToken()
        return res.cookie("access_token", token, {maxAge : 7 * 24 * 3600 * 1000, httpOnly: true}).status(200).end()
    }
    const newUser: any = await new User({firstName: given_name, email, password: passwordHash, avatar: picture}).save()
    const token = newUser.generateAuthToken()
    res.cookie("access_token", token, {maxAge : 7 * 24 * 3600 * 1000, httpOnly: true}).status(200).end()
  } catch (err: any) {
    res.status(500).send(err.message)
  }
})

export default router