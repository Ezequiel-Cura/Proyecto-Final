import { Router } from "express";
const router = Router()
import getCryptoList from './getCryptoList'
import convertCrypto from './convertCrypto'

router.use('/getCryptoList', getCryptoList)
router.use('/convertCrypto', convertCrypto)


export default router