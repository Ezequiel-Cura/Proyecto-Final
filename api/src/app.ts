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

server.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin',`${process.env.FRONT_URL}`)
  res.header('Access-Control-Allow-Origin', `${process.env.FRONT_URL}`); // update to match the domain you will make the request from
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, DELETE');
  next();
});

server.get("/ping", (req: Request, res: Response) => {
    res.status(200).send("pong")
})

server.use('/', router);

export default server
