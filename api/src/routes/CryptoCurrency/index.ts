import { Router } from "express";
const router = Router()
import getCryptoList from './getCryptoList'
import searchCrypto from './searchCrypto'
import supportedCurrency from './supportedCurrency'
import convertCrypto from './convertCrypto'

router.use('/getCryptoList', getCryptoList)
router.use('/searchCrypto', searchCrypto)
router.use('/supportedCurrency', supportedCurrency)
router.use('/convertCrypto', convertCrypto)


export default router