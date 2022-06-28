import { Router, Request, Response } from "express";
import User from "../models/User";
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { ObjectId } from "mongodb";
import jwt_decode from "jwt-decode"
import authorization from "../middleware/authorization"

const schema = Joi.object({
  firstName: Joi.string().required(),
  lastName: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

const router = Router()

interface value {
  date?: string
}

const entriesUpdate = (key: string, value: object) => {
  /*
  monthlyInput
  extraInput
  monthlyExpenses
  variableExpenses
  */
}

router.post("/user/login", async (req: Request, res: Response) => {
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

router.post("/user/googleLogin", async (req: Request, res: Response) => {
  try {
    const {email_verified, email, given_name, picture } : any = jwt_decode(req.body.jwt)
    if(!email_verified) return res.status(403).send("Tu email no esta verificado")
    if (!email) return res.status(403).send("No tenes gmail? wtf")
    const password = email + process.env.GOOGLE_SECRET
    const salt = await bcrypt.genSalt(Number(process.env.SUPER_SECRET_SALT))
    const passwordHash = await bcrypt.hash(password, salt)
    const user = await User.findOne({email})
    console.log(user)
    if (user) {
        const validPassword = await bcrypt.compare(password, user.password)
        if (!validPassword) return res.status(400).send("La contraseña es incorrecta")
        const token = user.generateAuthToken()
        const {userName, lastName, avatar} = user
        return res.cookie("access_token", token, {maxAge : 7 * 24 * 3600 * 1000, httpOnly: true}).status(200).send({userName, lastName, email, avatar})
    } else {
        const newUser: any = await new User({userName: given_name, email, password: passwordHash, avatar: picture}).save()
        const token = newUser.generateAuthToken()
        const {userName, lastName, avatar} = newUser
        res.cookie("access_token", token, {maxAge : 7 * 24 * 3600 * 1000, httpOnly: true}).status(200).send({userName, lastName, email, avatar})
    }
  } catch (err: any) {
    res.status(500).send(err.message)
    
  }
})

router.post("/user/logout", authorization , (req: Request, res: Response) => {
    res.clearCookie("access_token").status(200).send({message: "Successfully logged out"})
})

router.get("/user/getUserInfo", authorization, async (req: any, res: Response) => {
  try {
    const {email, userName, lastName, avatar} : any = await User.findById(req.userId)
    res.status(200).send({email, userName, lastName, avatar})
  } catch (err: any) {
    res.status(404).send(err.message)
  }
})

// Para agregar valores a la cuenta del usuario se mandan así los parámetros en el body:
// {   "id": "62b7b9f2168812a442797012",
//     "key": "extraInput",
//     "value": {"description": "para comer",
//     "amount": 5000}
// }
router.post("/user/account", async (req: Request, res: Response) => {
  const {id, key, value} = req.body

  try{
    const user = await User.findById(id)
   if(!user){
    res.status(404).send(`No se encontró al usuario con id: ${id}`)
   } else {
    await user.Account[key].push(value)
    await user.save()
    res.status(200).send(user)
   }
  }
  catch (err) {
    res.status(400).send(err)
  }

});
// Para registrar al usuario:
router.post("/user/register", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const { error } = schema.validate(req.body)
    if(error) return res.status(400).send({message: error.details[0].message})
    const userExistCheck = await User.findOne({email})
    if (userExistCheck) return res.status(400).send('Email ya registrado')
    const salt = await bcrypt.genSalt(Number(process.env.SUPER_SECRET_SALT))
    const hashPass = await bcrypt.hash(password, salt)
    const user = await User.create({userName: firstName, lastName, email, password: hashPass})
    const {avatar, Account} = user
    const token = user.generateAuthToken()
    res.cookie("access_token", token, {maxAge : 7 * 24 * 3600 * 1000, httpOnly: true}).status(201).send({userName: firstName, lastName, email, avatar, Account})
  } catch (err: any) {
    res.status(400).send(err.message)
  }
})

// Para modificar y setear datos del usuario manden los tres datos con sus respectivos valores:
// {"id": "62b7b9f2168812a442797012",
// "key": "userName",
// "value": "test"}
router.put("/user", async (req: Request, res: Response) => {
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

// Para eliminar entradas de la cuenta, hay que pasar estos parametros por body:
// {   "id": "62b7b9f2168812a442797012",
//     "key": "extraInput",
//     "value": {"_id": "62b8b79f91091d937fe969d7"}
// }
router.delete("/user/account", async (req: Request, res: Response) => {
  const {id, key, value} = req.body

  try{
    const user = await User.findById(id)
    if(!user){
     res.status(404).send(`No se encontró al usuario con id: ${id}`)
    } else {
      await user.Account[key].remove( {"_id": new ObjectId(value._id)})
      await user.save()
      res.status(200).send(user.Account)
    }
  }
  catch (err) {
    res.status(400).send(err)
  }
});


router.delete("/user", async (req: Request, res: Response) => {
  const {id} = req.query

  User.findByIdAndDelete(id)
  .then((user) => {
    if(user){
      res.status(200).send(`Usuario ${user} eliminado`)
    } else {
      res.status(404).send(`Usuario ${user} eliminado`)
    }
  })
  .catch(() => {
    res.status(400).send('Error en protocolo de borrado')
  })
});


export default router;
