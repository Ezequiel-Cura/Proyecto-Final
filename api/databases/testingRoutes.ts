import { Router, Request, Response } from "express";
import db from "../databases/models/index"; // importas todos los modelos como un objeto al que despues accedes con db.[modelo]
 const router = Router()


router.post("/", async (req: Request, res: Response) => {
    try {
        const newUser: typeof Object = req.body;
        const savingNewUser = await new db.User(newUser).save();
        // console.log("result: ", result)
        savingNewUser
            ? res.status(200).json(`Successfully created a new user with id ${savingNewUser._id}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error: any) {
        // console.error(error.message);
        res.status(400).send("Error en la ruta post de user");
    }
});



router.get("/", async (_req: Request, res: Response) => {
    try {
       const Users = await db.User.find({});
       console.log("Users: ", Users) 
       res.status(200).send(Users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});


export default router