
import { Router, Request, Response } from "express"
import fetch, { Headers, RequestInit } from 'node-fetch';
let myHeaders = new Headers();
const router = Router()
const { API_KEY_CONVERT } = process.env

if (API_KEY_CONVERT) {
    myHeaders.append("apiKey", API_KEY_CONVERT);
}

var requestOptions: RequestInit = {
    method: 'GET',
    redirect: 'follow',
    headers: myHeaders
};

router.get("/", async (req: Request, res: Response) => {
    const { to, from, amount } = req.query

    try {
        if (!to || !from || !amount) {
            res.status(400).send('Faltan parámetros.')
        }
        await fetch(`https://api.apilayer.com/exchangerates_data/convert?to=${to}&from=${from}&amount=${amount}`, requestOptions)
            .then((res: any) => res.json())
            .then((apiData: any) => {
                res.status(200).send(apiData)
            })
    } catch (error) {
        res.status(404).send(error)
    }
})

export default router;
