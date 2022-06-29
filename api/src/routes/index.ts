// Backup:
// import routeUserNoSql from '../../backup/routeUserNoSql'
// router.use('/test', routeUserNoSql)


import { Router } from "express";
import User from './User';

const router = Router()

router.use("/", User)

export default router