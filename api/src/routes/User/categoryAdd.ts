
import { Router, Request, Response } from "express";

import authorization from "../../middleware/authorization";
import User from "../../models/User";

const router = Router()

router.post("/", authorization, async (req: any, res: Response) => {

  const { key, value } = req.body
  const id = req.userId

  try {
    const user = await User.findById(id).select({_id: 0, email: 1, firstName: 1, lastName: 1, avatar: 1, Account: 1, Saving: 1, premium: 1, CategoriesExpenses: 1, CategoriesInputs: 1})

    if (!user) return res.status(404).send(`No se encontró al usuario con id: ${req.userId}`)
    
    if (key === "CategoriesExpenses") {

      user.CategoriesExpenses.push(value)
      await user.save()
      return res.status(200).send(user)
    
    } else if (key === "CategoriesInputs") {
      
      user.CategoriesInputs.push(value)
      await user.save()
      res.status(200).send(user)
    }
  }
  catch (err) {
    console.log("ERROR:--->", err)
    res.status(400).send(err)
  }

});

export default router;