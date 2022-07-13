
import { Router, Request, Response } from "express"
const router = Router()
import axios from 'axios'

router.get("/", async (req: Request, res: Response) => {
    const { id, to, amount } = req.query;
    try {
      if(!id || !to || !amount){
        return res.status(404).send('Faltan parámetros válidos.')
      }
      const convertCrypto = await axios("https://criptoya.com/api/"+id+"/"+to+"/"+amount)
      const convertData = convertCrypto.data
      res.status(200).send({convertData, id, to, amount })
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
})

export default router;