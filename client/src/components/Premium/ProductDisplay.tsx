import Nav from 'components/Nav/Nav';
import React from 'react';

import img from "../../assets/premium.svg";
import styles from "./ProductDisplay.module.css"
import { useAppSelector } from 'redux/hooks';

export function ProductDisplay() {
  const { usuario } = useAppSelector(state => state.user)
  const disabled = usuario.premium
  
  return (
    <section style={{ display: "grid", gridTemplateColumns: "178px 1fr" }}>
        <Nav/>
        <div className={styles.background}>
          <div className={styles.wrapperAll}>
            <div>
              <img src={img} alt="not found"/>
            </div>
            <div className={styles.wrapperText}>
              <div>
                <h1>{disabled ? 'Usted es un usuario premium' : 'Adquiere una cuenta premium'}</h1>
              </div>
              <div>
                <h3>Que beneficios obtienes:</h3>
                <p>Podras...</p>
                <p>- Acceder al detalle de tus ingresos y gastos</p>
                <p>- Tener casilla de ahorros ilimitado</p>
                <p>- Obtener el valor de criptomonedas en distintas monedas</p>
                <p>- Dejar una reseña sobre nuestra página</p>
              </div>
                 <form action={`${process.env.REACT_APP_API}user/buyPremium/create-order`} method='GET'>
                <button className={styles.premiumButton} disabled={disabled} type="submit">Consigue premium a través de PayPal!</button>
                </form>
              <form action={`${process.env.REACT_APP_API}user/premium/buy`} method='POST'>
                <button className={styles.premiumButton} disabled={disabled} type="submit">Consigue premium!</button>
              </form>
            </div>
          </div>
        </div>
    </section>
    )
}