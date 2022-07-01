import { Router } from "express";
const router = Router()

import register from './register'
import login from './login'
import googleLogin from './googleLogin'
import logout from './logout'
import getUserInfo from './getUserInfo'
import accountAdd from './accountAdd'
import savings from './savings'
import userUpdate from './userUpdate'
import accountDelete from './accountDelete'
import deleteUser from './deleteUser'
import categoryAdd from './categoryAdd'
import categoryDelete from './categoryDelete'


router.use('/user/login', login)
router.use('/user/googleLogin', googleLogin)
router.use('/user/logout', logout)
router.use('/user/getUserInfo', getUserInfo)
router.use('/user/account', accountAdd)
router.use('/user/category', categoryAdd)
router.use('/user/saving', savings)
router.use('/user/register', register)
router.use('/user', userUpdate)
router.use('/user/account', accountDelete)
router.use('/user/category', categoryDelete)
router.use('/user', deleteUser)


export default router