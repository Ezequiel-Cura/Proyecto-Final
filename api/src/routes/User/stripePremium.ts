import { Router, Request, Response } from "express";
import authorization from "../../middleware/authorization";
import dotenv from 'dotenv'
dotenv.config()

// This is your test secret API key.
const stripe = require('stripe')('sk_test_51LLEF3JqdJUgQbC1PKIVo0uUmubjgnhvsX0pQuDJUEesap4t2rCtM3Ee7CJ0pP2CfmhVlOE23cMbJWzSRtMKbKE4008A8xCL13');
const router = Router();  

router.post('/', async (req, res) => {
  try{
    const session = await stripe.checkout.sessions.create({
      line_items: [
        {
          // Provide the exact Price ID (for example, pr_1234) of the product you want to sell
          price: 'price_1LLFFYJqdJUgQbC1lQMWLxfP',
          quantity: 1,
        },
      ],
      mode: 'payment',
      success_url: `https://localhost:3001/premium/buy?success=true`,
      cancel_url: `https://localhost:3000/home/premium`,
    });
  
    res.redirect(303, session.url);

  } catch(err) {
    console.log(err)
  }
});

export default router