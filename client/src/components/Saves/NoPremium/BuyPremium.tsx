import React from 'react';
import { Link } from 'react-router-dom';
import style from '../Css/PopUpForm.module.css'

export default function BuyPremium(props : any) {

  return (
    <div className={style.wrapperForm}>
        <p>Tienes un limite de 1 casilla de ahorro. Para crear mas convierte tu cuenta a premium</p>
        <Link to={'/home/premium'}>
            <button className={style.buttonForm}>Entendido</button>
        </Link>
    </div>
  )
}