import express, { Application, Request, Response } from "express";
import { connectDB } from "./db";
import router from "./routes"
import morgan from "morgan"
import cookieparser from "cookie-parser"
import bodyparser from "body-parser"
import cors from "cors"
// Initializations

connectDB()
 const server: Application = express()
server.set("port", process.env.PORT || 3001)

server.use(bodyparser.urlencoded({extended: true}));
server.use(bodyparser.json());
server.use(cookieparser());
server.use(morgan("dev"));
server.use(cors(
  {
    origin: 'http://localhost:3000', 
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Accept', 'Content-Type'],
    credentials: true
  }
))


server.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("pong")
})

server.use('/', router);

export default server
