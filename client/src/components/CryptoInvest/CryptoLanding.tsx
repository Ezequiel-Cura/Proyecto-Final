import Nav from 'components/Nav/Nav';
import React from 'react';
import { Link } from "react-router-dom"
import styles from './Crypto.module.css'
import img from './../../assets/imgCrypto.svg'

export default function CryptoLanding() {

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"178px 1fr"}}>
          <Nav/>
          <div className={styles.wrapperText}>
            <h1>Estás pensando invertir en criptomonedas?</h1>
            <div className={styles.wrapperLink}>
              <p>¡Mira las distintas opciones que ofrece el mercado actual!</p>
              <Link to="/home/crypto/currency">
                <button>+</button>
              </Link>
            </div>
            <img src={img} alt="not found"/>
          </div>
          </div>
    </div>
  )
}
