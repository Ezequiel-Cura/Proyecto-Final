import { Router, Request, Response } from "express"
import axios from "axios";
import { URLSearchParams } from "url";
import { isPropertyAccessChain } from "typescript";

const router = Router()



router.get("/create-order", async (req: Request, res: Response) => {
  try{
    const order = {
        intent: "CAPTURE",
        purchase_units: [
            { 
            amount: {
            currency_code: "EUR",
            value: "5"
            },
            description: "Actualizar a modo Premium"
        }
        ],
        application_context: {
            brand_name: "Proyecto Final Henry",
            landing_page: "LOGIN",
            user_action: "PAY_NOW",
            return_url: "http://localhost:3001/user/buypremium/capture-order",
            cancel_url: "http://localhost:3001/user/buypremium/cancel-order",
        }
    };

    const params = new URLSearchParams()
    params.append("grant_type", "client_credentials")

    const {data: {access_token}} = await axios.post("https://api-m.sandbox.paypal.com/v1/oauth2/token", params, {
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        auth:{
            username: process.env.PAYPAL_API_CLIENT,
            password: process.env.PAYPAL_API_SECRET
        }
    })

    const response = await axios.post("https://api-m.sandbox.paypal.com/v2/checkout/orders", order, {
       headers: {
        Authorization: `Bearer ${access_token}`
       }
    })

    res.json(response.data)
  }catch(error){
    return res.status(500).send("Something goes wrong!")
  }

})

router.get("/capture-order", async (req: Request, res: Response) => {
    ///v2/checkout/orders/{id}/capture

    const {token, PayerID} = req.query

    const response = await axios.post(`https://api-m.sandbox.paypal.com/v2/checkout/orders/${token}/capture`, {}, {
        auth: {
            username: process.env.PAYPAL_API_CLIENT,
            password: process.env.PAYPAL_API_SECRET
        }
    })

    console.log("TOKEN", token, "PAYERID", PayerID)
    console.log(response.data)
    console.log("Capturing Order")

    res.status(200)
})

router.get("/cancel-order", async (req: Request, res: Response) => {
    console.log("Canceled Order")
})
// router.get("/ping", (req: Request, res: Response) => {
//     res.send("pong")
// })

export default router