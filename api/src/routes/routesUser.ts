
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
    res.send('Error en protocolo de borrado')
  })
});



// router.put("/user", async (req: Request, res: Response) => {
//   const {id} = req.query
//   const { key, value } = req.body

// });

router.put("/user/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const userToUpdate: typeof UserNoSqlTemp = req.body;
        const query = { _id: new ObjectId(id) };
      
        const updateUser = await UserNoSqlTemp.updateOne(query, { $set: userToUpdate });

        updateUser
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});





export default router;
