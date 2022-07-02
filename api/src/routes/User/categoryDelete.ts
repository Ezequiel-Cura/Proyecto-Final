import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import authorization from "../../middleware/authorization";
import User from "../../models/User";


const router = Router()

router.delete("/", authorization, async (req: any, res: Response) => {

  const { key, value } = req.body

  const id = req.userId
  try {
    const user = await User.findById(id)
    if (!user) {
      res.status(404).send(`No se encontró al usuario con id: ${id}`)
    } else {
      const { email, firstName, lastName, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs } = user
      if (key === 'CategoriesExpenses') {

        const index = user.CategoriesExpenses.indexOf(value)
        user.CategoriesExpenses.splice(index, 1)
        await user.save()
        res.status(200).send({ email, firstName, lastName, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs })
     
      } else if (key === 'CategoriesInputs') {
        
        const indexIn = user.CategoriesInputs.indexOf(value)
        user.CategoriesExpenses.splice(indexIn, 1)
        await user.save()
        res.status(200).send({ email, firstName, lastName, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs })
      }
    }
  }
  catch (err) {
    console.log(err)
    res.status(400).send(err)
  }
});

export default router