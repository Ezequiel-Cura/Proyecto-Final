import { Router } from "express";

 const router = Router()

 import routesUser from './routesUser';

 router.use("/", routesUser)





export default router