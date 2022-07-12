
import { Router, Request, Response } from "express"
const router = Router()
import axios from 'axios'

router.get("/", async (req: Request, res: Response) => {
    const { id, to, amount } = req.body;
    try {
      const convertCrypto = await axios(`https://criptoya.com/api/${id}/${to}/${amount}`)
      res.status(200).send(convertCrypto.data)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

export default router;