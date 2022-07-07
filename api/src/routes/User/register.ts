import { Router, Request, Response } from "express";
const router = Router()
import User from "../../models/User";
import bcrypt from 'bcrypt'
import Joi from 'joi';
import crypto from "crypto"
import sendEmail from "../../utils/sendEmail";

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

router.post("/", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const { error } = schema.validate(req.body)
    if(error) return res.status(400).send({message: error.details[0].message})
    let user = await User.findOne({email})
    if (user) return res.status(400).send('Email ya registrado')
    const salt = await bcrypt.genSalt(Number(process.env.SUPER_SECRET_SALT))
    const hashPass = await bcrypt.hash(password, salt)
    const {verifyToken, _id} = await User.create({firstName, lastName, email, password: hashPass, verifyToken: crypto.randomBytes(32).toString("hex")})
    sendEmail({email, subject: "Verifica tu cuenta", text:`Porfavor verifica tu email apretando en el siguiente link: \n ${process.env.FRONT_URL}/users/${_id}/verify/${verifyToken}`});
    res.status(201).send({message: "Se ha enviado un Email a tu cuenta para la verificación"});
  } catch (err: any) {
    res.status(400).send(err.message)
  }
})

router.get("/:id/verify/:verifyToken", async (req: any, res: any) => {
    try {
        const user = await User.findOne({_id: req.params.id});
        if (!user) return res.status(400).send("No existe este usuario");
        if (!user.verifyToken) return res.status(400).send("El usuario ya esta verificado");
        user.verified = true;
        await user.save()
        res.status(200).send("Se ha verificado su Email")
    } catch (err: any) {
        res.status(500).send("Huh?")
    }
})


export default router