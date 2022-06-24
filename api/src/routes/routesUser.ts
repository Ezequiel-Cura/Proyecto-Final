
import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import dotenv from 'dotenv'
dotenv.config()
import UserNoSqlTemp from "../../databases/models/UserNoSql(temp)";
import bcrypt from 'bcrypt'

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
    res.send(error)
  }
});

router.post("/user", async (req: Request, res: Response) => {

  const { userName, lastName, email, password } = req.body;

  try {
    const userExistCheck = await UserNoSqlTemp.findOne({ email: email })

    if (userExistCheck) {
      return res.status(400).send('E-mail ya registrado')
    }

  } catch (err) {
    return res.status(400).send('Error')
  }

  bcrypt.hash(password, 10)
    .then((hashPass) => {
      return UserNoSqlTemp.create({
        userName,
        lastName,
        email,
        password: hashPass
      })
    })
    .then((user) => {
      res.status(200).send(user)
    })
    .catch((err) => {
      console.log(err)
      res.status(400).send('Error en creacion de usuario')
    })

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
    res.send('Error en protocolo de borrado')
  })
});

router.put("/user", async (req: Request, res: Response) => {
  const {id} = req.query
  const {key, value} = req.body

  


});





export default router