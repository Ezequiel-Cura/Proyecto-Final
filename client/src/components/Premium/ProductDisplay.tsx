import Nav from 'components/Nav/Nav';
import React from 'react';
import axios from 'axios'
import img from "../../assets/premium.svg";
import styles from "./ProductDisplay.module.css"

export const ProductDisplay = () => (
    <section style={{ display: "grid", gridTemplateColumns: "178px 1fr" }}>
        <Nav/>
        <div className={styles.background}>
          <div className={styles.wrapperAll}>
            <div>
              <img src={img} alt="not found"/>
            </div>
            <div className={styles.wrapperText}>
              <div>
                <h1>Adquiere una cuenta premium</h1>
              </div>
              <div>
                <h3>Que beneficios obtienes:</h3>
                <p>Podras...</p>
                <p>- Acceder al detalle de tus ingresos y gastos</p>
                <p>- Tener casilla de ahorros ilimitado</p>
                <p>- Obtener el valor de criptomonedas en distintas monedas</p>
                <p>- Dejar una reseña sobre nuestra página</p>
              </div>
              <form action='http://localhost:3001/user/premium/buy' method='POST'>
                <button type="submit">Consigue premium!</button>
              </form>
            </div>
          </div>
        </div>
    </section>
);