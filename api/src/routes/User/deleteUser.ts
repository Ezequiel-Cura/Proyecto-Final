import { Router, Request, Response } from "express";
import User from "../../models/User";

const router = Router()

router.delete("/", async (req: Request, res: Response) => {
  const {id} = req.query

  User.findByIdAndDelete(id)
  .then((user) => {
    console.log(user)
    if(user){
      return res.status(200).send(`Usuario ${user} eliminado`)
    } else {
      console.log(user)
      return res.status(404).send(`Usuario ${user} eliminado`)
    }
  })
  .catch((e) => {
    res.status(400).send('Error en protocolo de borrado')
  })
});

export default router