
import { Router, Request, Response } from "express";

import authorization from "../../middleware/authorization";
import User from "../../models/User";

const router = Router()

router.post("/", authorization, async (req: any, res: Response) => {

  const { key, value } = req.body
  const id = req.userId

  try {
    const user = await User.findById(id)

    if (!user) {
      res.status(404).send(`No se encontró al usuario con id: ${req.userId}`)
    } else {
      const { email, userName, lastName, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs } = user
      
      if (key === "CategoriesExpenses") {

        user.CategoriesExpenses.push(value)
        await user.save()
        res.status(200).send({ email, userName, lastName, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs })
     
      } else if (key === "CategoriesInputs") {
        user.CategoriesInputs.push(value)
        await user.save()
        res.status(200).send({ email, userName, lastName, avatar, Account, Saving, premium, CategoriesExpenses, CategoriesInputs })
      }
    }
  }
  catch (err) {
    console.log("ERROR:--->", err)
    res.status(400).send(err)
  }

});

export default router;