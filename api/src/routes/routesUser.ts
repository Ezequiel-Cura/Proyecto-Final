
import { Router, Request, Response } from "express";
import UserNoSqlTemp from "../../databases/models/UserNoSql(temp)";
import bcrypt from 'bcrypt';
import Joi from 'joi';
import { ObjectId } from "mongodb";

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

router.post("/user/loggin", async (req: Request, res: Response) => {
  try {
    const { email, password } : any = req.body
    const User = await UserNoSqlTemp.findOne({email})
    if (!User) return res.status(400).send('Usuario inexistente')
    const passwordCompare = await bcrypt.compare(password, User.password)
    if (passwordCompare) {
     return res.status(200).json(User)
    } else {
     return res.status(400).send('Contraseña Incorrecta')
    }
  } catch (err) {
    res.status(404).send(err)
  }
});
router.post("/user/account", async (req: Request, res: Response) => {
  const {id, key, value} = req.body

  try{
    const user = await UserNoSqlTemp.findById(id)
   if(!user){
    res.status(404).send(`No se encontró al usuario con id: ${id}`)
   }else {
    await user?.Account[key].push(value)
    await user?.save()
    res.status(200).send(`${key}: ${value}, usuario con id: ${id} actualizado`)
   }
  }
  catch (err) {
    res.status(400).send(err)
  }

});

router.post("/user", async (req: Request, res: Response) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    const { error } = schema.validate(req.body)
    if(error) return res.status(400).send({message: error.details[0].message})
    const userExistCheck = await UserNoSqlTemp.findOne({ email: email })
    if (userExistCheck) return res.status(400).send('Email ya registrado')
    const salt: any = await bcrypt.genSalt(Number(process.env.SUPER_SECRET_SALT))
    const hashPass = await bcrypt.hash(password, salt)
    const user = await UserNoSqlTemp.create({userName: firstName, lastName, email, password: hashPass})
    res.status(201).json(`${user} creado exitosamente.`)
  } catch (err: any) {
    res.status(400).send(err.message)
  }
})



router.put("/user", async (req: Request, res: Response) => {
  const {id, key, value} = req.body

  try {
    console.log({req})

      const result = await UserNoSqlTemp.updateOne({_id: id}, { $set: { [key]: value} });

      result
          ? res.status(200).send({key, value})
          : res.status(304).send(`User with id: ${id} not updated`);
  } catch (error: any) {
      console.error(error.message);
      res.status(400).send(error.message);
  }
});

// router.delete("/user/account", async (req: Request, res: Response) => {
//   const {date, key, value} = req.body

//   try{
//     const user = await UserNoSqlTemp.findById(id)
//     await user?.Account[key].filter(obj => obj === value)
//     await user?.save()
//     res.status(200).send('Usuario actualizado')
//   }
//   catch (err) {
//     res.status(400).send(err)
//   }
// });


router.delete("/user", async (req: Request, res: Response) => {
  const {id} = req.query

  UserNoSqlTemp.findByIdAndDelete(id)
  .then((user) => {
    console.log(user)
    if(user){
      res.status(200).json(`Usuario ${user} eliminado`)
    } else {
      res.status(404).json(`Usuario ${user} eliminado`)
    }
  })
  .catch(() => {
    res.status(400).send('Error en protocolo de borrado')
  })
});


export default router;
