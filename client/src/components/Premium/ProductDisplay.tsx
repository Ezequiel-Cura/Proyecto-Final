import Nav from 'components/Nav/Nav';
import React from 'react';

export const ProductDisplay = () => (
    <section style={{ display: "grid", gridTemplateColumns: "178px 1fr" }}>
        <Nav/>
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
        <form action="/create-checkout-session" method="POST">
            <button type="submit">Checkout</button>
        </form>
    </section>
);