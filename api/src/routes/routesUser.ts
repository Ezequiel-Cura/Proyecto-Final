
import { Router, Request, Response } from "express";
import { ObjectId } from "mongodb";
import db from "../../databases/models/index"; // importas todos los modelos como un objeto al que despues accedes con db.[modelo]
import UserNoSqlTemp from "../../databases/models/UserNoSql(temp)";

const router = Router()

router.post("/", async (req: Request, res: Response) => {
    try {
        const newUser: object = req.body;
        console.log({newUser})
        const savingNewUser = await db.UserNoSqlTemp.create(newUser);

        savingNewUser
            ? res.status(200).json(`Successfully created a new user with id ${savingNewUser._id}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error: any) {

        res.status(400).send("Error en la ruta post de user");
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    const id = req?.params?.id;

    try {
        const updatedUser: typeof UserNoSqlTemp = req.body;
        const query = { _id: new ObjectId(id) };
      
        const updateUser = await db.UserNoSqlTemp.updateOne(query, { $set: updatedUser });

        updateUser
            ? res.status(200).send(`Successfully updated user with id ${id}`)
            : res.status(304).send(`User with id: ${id} not updated`);
    } catch (error: any) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
});

router.get("/users", async (_req: Request, res: Response) => {
    try {
       const Users = await db.UserNoSqlTemp.find({});
       console.log("Users: ", Users) 
       res.status(200).send(Users);
    } catch (error: any) {
        res.status(500).send(error.message);
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
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