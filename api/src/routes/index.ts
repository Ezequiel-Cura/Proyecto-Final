import { Router } from "express";

 const router = Router()
// Backup:
//  import routeUserNoSql from '../../backup/routeUserNoSql'
// router.use('/test', routeUserNoSql)

import routesUser from './routesUser';

 router.use("/", routesUser)





export default router