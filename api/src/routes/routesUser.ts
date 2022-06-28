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

// Funciona como un get para traer toda la data del usuario, mandar los params por body así:
// {
//   "email": "test@test.com", 
//   "password": "1234"
// }
router.post("/user/login", async (req: Request, res: Response) => {
  try {
    const { email, password } : any = req.body
    const User = await UserNoSqlTemp.findOne({email})
    if (!User) return res.status(400).send('Usuario inexistente')
    const passwordCompare = await bcrypt.compare(password, User.password)
    if (passwordCompare) {
     return res.status(200).send(User)
    } else {
     return res.status(400).send('Contraseña Incorrecta')
    }
  } catch (err) {
    res.status(404).send(err)
  }
});
// Para agregar valores a la cuenta del usuario se mandan así los parámetros en el body:
// {   "id": "62b7b9f2168812a442797012",
//     "key": "extraInput",
//     "value": {"description": "para comer",
//     "amount": 5000}
// }
router.post("/user/account", async (req: Request, res: Response) => {
  const {id, key, value} = req.body

  try{
    const user = await UserNoSqlTemp.findById(id)
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

// Para agregar ahorros se requiere dos parámetros:
router.post("/user/saving", async (req: Request, res: Response) => {
  const {id, value} = req.body

  try{
    const user = await UserNoSqlTemp.findById(id)
   if(!user){
    res.status(404).send(`No se encontró al usuario con id: ${id}`)
   } else {
    user.Saving.push(value)
    await user.save()
    res.status(200).send(user)
   }
  }
  catch (err) {
    res.status(400).send(err)
  }

});
// Para registrar al usuario:
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
    res.status(201).send(`${user} creado exitosamente.`)
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
      const result = await UserNoSqlTemp.updateOne({_id: id}, { $set: { [key]: value} });
      // const result = await UserNoSqlTemp.findOneAndUpdate({_id: id}, { [key]: value }).save();

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
  const {id, key, value} = req.body.source

  try{
    let newId = new ObjectId(id)
    const user = await UserNoSqlTemp.findById(newId)
    if(!user){
      console.log({user})
     res.status(404).send(`No se encontró al usuario con id: ${id}`)
    } else {
      await user.Account[key].remove( {"_id": new ObjectId(value._id)})
      await user.save()
      res.status(200).send(user)
    }
  }
  catch (err) {
    res.status(400).send(err)
  }
});


router.delete("/user", async (req: Request, res: Response) => {
  const {id} = req.query

  UserNoSqlTemp.findByIdAndDelete(id)
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
