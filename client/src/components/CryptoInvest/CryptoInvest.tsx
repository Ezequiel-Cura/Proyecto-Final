import Nav from 'components/Nav/Nav';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks';
import { getCryptoList } from 'redux/reducers/userReducer/actions/getCryptoList';
import styles from './Crypto.module.css'

export default function CryptoInvest() {

  const { cryptoList,  status, cryptoData } = useAppSelector(state => state.user);

  const dispatch = useDispatch()
  const [cryptoRender, setCryptoRender] = useState([])

  const [form, setForm] = useState({
    id: '',
    to: '',
    amount: 0
  })


  interface Crypto{
    name: string,
    id: string,
    symbol: string,
    image: {
      large: string
    },
    market_data: {
      current_price: {
        ars: string,
        usd: string,
        btc: string,
        eur: string
      }
    }
  }

  useEffect(() => {
    console.log('entre')
    if(status === 'success'){
      dispatch(getCryptoList())
    }
  }, [])

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    e.preventDefault()
  }

  return (
    <div>
      <div style={{display:"grid",gridTemplateColumns:"178px 1fr"}}>
          <Nav/>
          <ul>
          {
            cryptoList.length > 0 
            ? cryptoList.slice(0, 50).map( (crypto: Crypto, i: any) => {
              return(
              <li className={styles.cryptoList} key={i}>
                <img src={crypto.image.large} alt="Not found" />
                <p>Nombre: {crypto.name}</p>
                <p>Símbolo: {crypto.symbol}</p>
                <p>Id: {crypto.id}</p>
                <span className={styles.cryptoPrice}>
                  <p>Precio actual</p>
                  <p>En peso argentino: {crypto.market_data.current_price.ars}</p>
                  <p>En dólares: {crypto.market_data.current_price.usd}</p>
                  <p>En euros: {crypto.market_data.current_price.eur}</p>
                  <p>En bitcoin: {crypto.market_data.current_price.btc}</p>
                </span>
                {/* {crypto.platforms ? 
                 Object.entries(crypto.platforms).forEach(([key]) => {
                  return(
                    <p>{key}</p>
                  )
                })
                 : <p>No tiene plataformas</p>
            } */}
              </li>
              )
            })
            : <li>Loading...</li>
          }
          <li className={styles.cryptoList}>
          <p>Nombre: 01Coin</p>
                <p>Símbolo: zoc</p>
                <p>Id: idCoin</p>
                </li>
          </ul>
          <form onSubmit={handleSubmit}>
            <select name="selectCoin" id="selectCoin">
              {
              cryptoList.map( (crypto: Crypto) => {
                return(
                  <option value={crypto.name}>{crypto.name}</option>
                )
              })
              }
            </select>
          </form>
          </div>
    </div>
  )
}