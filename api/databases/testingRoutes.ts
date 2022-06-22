import { Router, Request, Response } from "express";
import db from "../databases/models/index"; // importas todos los modelos como un objeto al que despues accedes con db.[modelo]
 const router = Router()


router.post("/", async (req: Request, res: Response) => {
    try {
        const newUser: typeof Object = req.body;
        const result = await new db.User(newUser).save();
        console.log("result: ", result)
        result
            ? res.status(200).json(`Successfully created a new user with id ${result._id}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send("Errorrrrrrrrr en la ruta post de user");
    }
});


export default router