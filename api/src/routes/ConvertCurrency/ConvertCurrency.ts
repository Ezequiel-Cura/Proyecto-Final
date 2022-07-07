let myHeaders = new Headers();
// myHeaders.append("apiKeyConvert", "t9Vou5wgBj8SIH0BAa3bzgAdpbnUBGXY");

import { Router, Request, Response } from "express"

var requestOptions: RequestInit = {
  method: 'GET',
  redirect: 'follow',
  headers: myHeaders
};
const { apiKeyConvert } = process.env

const router = Router()

router.get("/",  async (req: Request, res: Response) => {
    const { to, from, amount } = req.query
    try {
        const apiData = await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)

        res.status(200).send(apiData)
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }

})

export default router;
