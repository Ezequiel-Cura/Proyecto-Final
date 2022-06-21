
import { Router, Request, Response } from "express";
const User = require("./models/User");
const router = Router()


router.post("/", async (req: Request, res: Response) => {
    try {
        const newUser: {} = req.body;
        const result = await User.insertOne(newUser);
        result
            ? res.status(201).send(`Successfully created a new user with id ${result._id}`)
            : res.status(500).send("Failed to create a new user.");
    } catch (error) {
        console.error(error);
        res.status(400).send("Errorrrrrrrrr en la ruta post de user");
    }
});