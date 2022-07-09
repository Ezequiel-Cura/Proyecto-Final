
import { Router, Request, Response } from "express"
const router = Router()
import axios from 'axios'

router.get("/", async (req: Request, res: Response) => {


    try {
      const cryptoList = await axios('https://api.coingecko.com/api/v3/coins/list?include_platform=true')

    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

export default router;