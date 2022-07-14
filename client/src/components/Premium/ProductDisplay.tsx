import Nav from 'components/Nav/Nav';
import React from 'react';
import axios from 'axios'

const logo = require('../../assets/favicon.ico')
export const ProductDisplay = () => (
    <section style={{ display: "grid", gridTemplateColumns: "178px 1fr" }}>
        <Nav/>
        <div className="product">
            <img
                src={logo}
                alt="The cover of Stubborn Attachments"
            />
            <div className="description">
                <h3>Premium</h3>
                <h5>$500</h5>
            </div>
        <form action='http://localhost:3001/user/premium/buy' method='POST'>
            <button type="submit">Consigue premium</button>
        </form>
        </div>
    </section>
);