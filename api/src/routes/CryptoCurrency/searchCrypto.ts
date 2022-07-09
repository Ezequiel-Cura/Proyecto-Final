
import { Router, Request, Response } from "express"
const router = Router()
import axios from 'axios'

router.get("/", async (req: Request, res: Response) => {
const { id, supported } = req.body

    try {
      const cryptoSearch = await axios(`https://api.coingecko.com/api/v3/simple/price?ids=${id}&vs_currencies=${supported}`)

    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

export default router;