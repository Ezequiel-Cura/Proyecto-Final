
import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import UserNoSqlTemp from "../../databases/models/UserNoSql(temp)";
import bcrypt from 'bcrypt'
import Joi from "joi"

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

router.get("/user", async (_req: Request, res: Response) => {
  const { email, password } = _req.body

  try {
    const User = await UserNoSqlTemp.findOne({ email })
    const passwordCompare = User && await bcrypt.compare(password, User.password)

    if (!User) {
      res.send('Usuario inexistente')
    }
    if (passwordCompare) {
      res.send(User)
    } else {
      res.status(400).send('Contraseña Incorrecta')
    }
  } catch (error) {
    res.status(404).send(error)
  }
});

router.post("/user", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const { error } = schema.validate(req.body)
    if(error) return res.status(404).send(error)
    const userExistCheck = await UserNoSqlTemp.findOne({ email: email })
    if (userExistCheck) {
      return res.status(400).send('Email ya registrado')
    }
    bcrypt.hash(password, process.env.SUPER_SECRET_SALT)
    .then((hashPass) => {
      return UserNoSqlTemp.create({
        userName: firstName,
        lastName,
        email,
        password: hashPass
      })
    })
    .then((user) => {
      res.status(200).send(`User con ${user.email} fue creado`)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send('Error en creacion de usuario')
    })

  } catch (err) {
    return res.status(400).send('Error')
  }

});

router.delete("/user", async (req: Request, res: Response) => {
  const {id} = req.query

  UserNoSqlTemp.findByIdAndDelete(id)
  .then((user) => {
    console.log(user)
    if(user){
      res.send('Usuario eliminado')
    } else {
      res.send('Usuario no encontrado')
    }
  })
  .catch(() => {
    res.status(400).send('Error en protocolo de borrado')
  })
});



router.put("/user", async (req: Request, res: Response) => {
  const {id, key, value} = req.body

  try{

    const user = await UserNoSqlTemp.findById(id)
    await user?.Account[key].push(value)
    await user?.save()
    res.status(200).send('Usuario actualizado')
  }
  catch (err) {
    res.status(400).send(err)
  }

});





export default router;
