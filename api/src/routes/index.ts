import { Router } from "express";

 const router = Router()

 import routesUser from './routesUser';
 import routeUserNoSql from './routeUserNoSql'


 router.use("/", routesUser)

 router.use('/test', routeUserNoSql)




export default router