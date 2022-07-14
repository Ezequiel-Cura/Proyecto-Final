import { Router, Request, Response } from "express";
import authorization from "../../middleware/authorization";
import dotenv from 'dotenv'
dotenv.config()

// This is your test secret API key.
const stripe = require('stripe')(process.env.STRIPE_API_KEY);
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
      success_url: `https://finanzas-personales-henry.herokuapp.com/user/premium/success`,
      cancel_url: `${process.env.FRONT_URL}/home/premium`,
    });
    res.redirect(303, session.url);
    console.log({session}, session.url, 'RESPUESTAA')
    // if(session.url === `http://localhost:3000/home`) {
    //   res.status(200).send('Premium')
    // } else{
    //   res.status(404).send('No es premium')
    // }

  } catch(err) {
    console.log(err)
  }
});

export default router