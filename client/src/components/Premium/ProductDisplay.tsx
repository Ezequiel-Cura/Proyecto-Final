import { CardElement, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import Nav from 'components/Nav/Nav';
import React from 'react';
import style from './ProductDisplay.module.css'

export default function ProductDisplay(){

  const stripePromise = loadStripe('codigo de conexion para el pago')

  return (
    <section style={{ display: "grid", gridTemplateColumns: "178px 1fr" }}>
        <Nav/>
        <Elements stripe={stripePromise}>
          {/* <form>
            <CardElement></CardElement>
          </form> */}
        <div className="product">
            <img
                src="https://i.imgur.com/EHyR2nP.png"
                alt="The cover of Stubborn Attachments"
            />
            <div className="description">
                <h3>Stubborn Attachments</h3>
                <h5>$20.00</h5>
            </div>
        </div>
        <form action="/create-checkout-session" method="POST" className={style.buttonCheckout}>
            <button type="submit">Checkout</button>
        </form>
        </Elements>
    </section>
  
  )

}