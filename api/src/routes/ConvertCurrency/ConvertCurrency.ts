// var myHeaders = new Headers();
// myHeaders.append("apiKeyConvert", "t9Vou5wgBj8SIH0BAa3bzgAdpbnUBGXY");

import { Router, Request, Response } from "express"

// var requestOptions = {
//   method: 'GET',
//   redirect: 'follow',
//   headers: myHeaders
// };
const { apiKeyConvert } = process.env

const router = Router()

router.get("/",  async (req: Request, res: Response) => {
//   fetch("https://api.apilayer.com/exchangerates_data/convert?to={to}&from={from}&amount={amount}", requestOptions)
//   .then(response => response.text())
//   .then(result => console.log(result))
//   .catch(error => console.log('error', error));
})

export default router;
