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
import review from "./review"
import supportMessages from "./supportMessages"
import reportReview from "./reportReview"
import deleteAccount from "./deleteAccount"
import stripePremium from "./stripePremium"
import premiumSuccess from "./premiumSuccess"

router.use('/login', login)
router.use('/register', register)
router.use('/googleLogin', googleLogin)
router.use('/logout', logout)
router.use('/getUserInfo', getUserInfo)
router.use('/update', userUpdate)
router.use('/delete', deleteUser)
router.use('/account', accountAdd)
router.use('/account', accountDelete)
router.use('/category', categoryAdd)
router.use('/category', categoryDelete)
router.use('/savings', savings)
router.use('/savings', savingsDelete)
router.use("/review", review)
router.use("/supportMessages", supportMessages)
router.use("/reportReview", reportReview)
router.use("/deleteAccount", deleteAccount)
router.use("/premium/buy", stripePremium)
router.use('/premium/success', premiumSuccess)

export default router