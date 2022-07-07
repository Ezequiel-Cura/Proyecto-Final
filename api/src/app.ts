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
server.use(bodyparser.urlencoded({extended: true}));
server.use(bodyparser.json());
server.use(cookieparser());
server.use(morgan("dev"));
server.use(cors(
  {
    origin: [process.env.FRONT_URL, process.env.FRONT_URL1, process.env.FRONT_URL2 ],
    methods: ["POST", "PUT", "GET", "DELETE"],
    allowedHeaders: 'Origin, X-Requested-With, Content-Type, Accept',
    credentials: true
  }
))

server.use('/', router);

export default server
