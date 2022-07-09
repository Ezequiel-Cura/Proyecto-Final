
import { Router, Request, Response } from "express"
const router = Router()
import axios from 'axios'

router.get("/", async (req: Request, res: Response) => {
    try {
      const supported_vs_currencies = await axios('https://api.coingecko.com/api/v3/simple/supported_vs_currencies')
      res.status(200).send(supported_vs_currencies)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

export default router;