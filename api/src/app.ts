import express, { Application } from "express";
import { connectDB } from "./db";
import router from "../databases/testingRoutes"
// Initializations
connectDB()
export const server: Application = express()
server.use('/', router);

// Settings

server.set("port", process.env.PORT || 3000)