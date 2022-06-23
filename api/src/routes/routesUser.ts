
import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import db from "../../databases/models/index"; // importas todos los modelos como un objeto al que despues accedes con db.[modelo]
import UserNoSqlTemp from "../../databases/models/UserNoSql(temp)";
import bcrypt from 'bcrypt'


const router = Router()

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
    .then(() => {
      res.status(200).send()
    })
    .catch(() => {
      res.status(400).send('Error en creacion de usuario')
    })





});

router.put("/user/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    const userToUpdate: typeof UserNoSqlTemp = req.body;
    const query = { _id: new ObjectId(id) };

    const updateUser = await db.UserNoSqlTemp.updateOne(query, { $set: userToUpdate });

    updateUser
      ? res.status(200).send(`Successfully updated user with id ${id}`)
      : res.status(304).send(`User with id: ${id} not updated`);
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

router.get("/user", async (_req: Request, res: Response) => {
  const {email, password} = _req.body

  try {    
    const User = await UserNoSqlTemp.findOne({email})
    const passwordCompare = User && await bcrypt.compare(password, User.password)

    
    if(!User){
      res.send('Usuario inexistente')
    }
    if(passwordCompare){
      res.send(User)
    } else {
      res.status(400).send('Contraseña Incorrecta')
    }
  } catch (error) {
    res.send(error)
  }
});

router.delete("/user/:id", async (req: Request, res: Response) => {
  const id = req?.params?.id;

  try {
    // console.log("id: ", id)
    const query = { _id: new ObjectId(id) };
    // console.log("query: ", query)
    const deleteUser = await db.UserNoSqlTemp.deleteOne(query);
    // console.log({deleteUser})
    // deleteUser ahora tiene un obj con dos props: acknowledged: boolean y deletedCount: number
    if (deleteUser && deleteUser.deletedCount) {
      res.status(202).send(`Successfully removed user with id ${id}`);
    } else if (!deleteUser) {
      res.status(400).send(`Failed to remove user with id ${id}`);
    } else if (!deleteUser.deletedCount) {
      res.status(404).send(`User with id ${id} does not exist`);
    }
  } catch (error: any) {
    console.error(error.message);
    res.status(400).send(error.message);
  }
});

export default router