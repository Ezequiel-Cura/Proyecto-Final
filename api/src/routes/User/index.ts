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
import savingsDelete from './savingsDelete'


<<<<<<< HEAD
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
router.use('/user/saving', savingsDelete)
router.use('/user', deleteUser)
=======
router.use('/login', login)
router.use('/googleLogin', googleLogin)
router.use('/logout', logout)
router.use('/getUserInfo', getUserInfo)
router.use('/account', accountAdd)
router.use('/category', categoryAdd)
router.use('/saving', savings)
router.use('/register', register)
router.use('/', userUpdate)
router.use('/account', accountDelete)
router.use('/category', categoryDelete)
router.use('/', deleteUser)
>>>>>>> ed179bcd66bdc473e8b85fea1f947d48a7b057e7


export default router