
import { Router, Request, Response } from "express";
import db from "../../databases/models/index"; // importas todos los modelos como un objeto al que despues accedes con db.[modelo]

const router = Router()

router.post("/", async (req: Request, res: Response) => {
    try {
        const newUser: object = req.body;
        console.log({newUser})
        const savingNewUser = await db.UserNoSql.create(newUser);

        savingNewUser
            ? res.status(200).json(`Successfully created a new user with id ${savingNewUser._id}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error: any) {

        res.status(400).send("Error en la ruta post de user");
    }
});

router.get("/", async (_req: Request, res: Response) => {
    try {
       const Users = await db.UserNoSql.find({});
       console.log("Users: ", Users) 
       res.status(200).send(Users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

export default router