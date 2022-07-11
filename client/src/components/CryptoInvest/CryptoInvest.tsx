import Nav from 'components/Nav/Nav';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks';
import { convertCrypto } from 'redux/reducers/userReducer/actions/convertCrypto';
import { getCryptoList } from 'redux/reducers/userReducer/actions/getCryptoList';
import styles from './Crypto.module.css'

export default function CryptoInvest() {

  const { cryptoList,  status, cryptoData } = useAppSelector(state => state.user);

  const dispatch = useDispatch()
  //Pagination
  const [ currentPage, setCurrentPage ] = useState<Crypto[]>([])


  interface Form{
    id: string,
    to: string,
    amount: number
  }

  const [form, setForm] = useState<Form>({
    id: '',
    to: '',
    amount: 0
  })

  interface CryptoConvertData{
    ask: number,
    totalAsk: number,
    bid: number,
    totalBid: number,
    time: number
  }

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
      // .then((json: Crypto[]) => { setData(json); setLoading(false);});
    }
  }, [])

  function handleSelectSearch(e: React.ChangeEvent<HTMLSelectElement>){
    console.log(e.target.value, 'selecttttt form')
    e.preventDefault()
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>){
    console.log(e.target.value, "valueee")
    e.preventDefault()
    setForm({
      ...form,
      amount: parseInt(e.target.value)
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>){
    console.log('FORMMMMMM', {form})
    e.preventDefault()
    dispatch(convertCrypto(form))
  }

  return (
    <div style={{ display: "grid", gridTemplateColumns: "178px 1fr" }}>
    <Nav />
    <div className={styles.background}>
      <div className={styles.wrapperAllCrypto}>
        {/* Title */}
        <div className={styles.title}>
          <h1>Finanzas Digitales </h1>
        </div>
          {/* Search form */}
          <div >
          <form onSubmit={handleSubmit}>
            <select id="selectCoin" name='id' onChange={(e) => handleSelectSearch(e)}>
            <option value="default">Criptomoneda</option>
              { cryptoList.length > 0
              ?cryptoList.map( (crypto: Crypto) => {
                return(
                  <option value={crypto.symbol}>{crypto.name}</option>
                )
              })
              : <p>Loading...</p>
              }
            </select>
            <select id="selectTo" name='to' onChange={(e) => handleSelectSearch(e)}>
            <option value="default">Convertir</option>
            <option value="ars">Peso Argentino</option>     
            <option value="brl">Real Brasileño</option>     
            <option value="clp">Peso Chileno</option>     
            <option value="cop">Peso Colombiano</option>     
            <option value="mxn">Peso Mexicano</option>     
            <option value="pen">Sol Peruano</option>     
            <option value="usd">Dólar</option>           
            </select>
            <input
                  type='number'
                  name='amount'
                  value={form.amount}
                  placeholder='Agrega un monto'
                  onChange={handleInputChange}
                />
                 <button type='submit'>Valor actual</button>
          </form>
          </div>
          {
            cryptoData !== 'Invalid pair' && Object.keys(cryptoData).length > 0
            ? <div>
                <h1>{cryptoData.amount} de {cryptoData.id} a {cryptoData.to}</h1> 
                {Object.keys(cryptoData.convertData).map(( platforms: any) => {
                  return(
                    <span>
                      <p>{platforms.ask}</p>
                    </span>
                  )})  
                }
            </div>
            : <></>
          }
                    {/* <div>
        <h2>Criptomonedas</h2>
        {!loading ? <Pagination {...paginationAttributes} 
                          onPrevClick={onPrevClick} 
                          onNextClick={onNextClick}
                          onPageChange={onPageChange}/>
        : <div> Loading... </div>
        }
    </div> */}
          <ul className={styles.cryptos}>
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
              </li>
              )
            })
            : <li>Loading...</li>
          }
          <li className={styles.cryptoList}>
          <p>Nombre: 01Coin</p>
                <p>Símbolo: zoc</p>
                <p>Id: idCoin</p>
                <span className={styles.cryptoPrice}>
                  <p>Precio actual</p></span>
                </li>
          </ul>
          </div>
          </div>
    </div>
  )
}

// Possible coins: ["btc", "eth", "dai", "usdc",
// "usdt", "busd", "ust", "usdp",
//  "xrp", "bch", "ltc", "ada",
//   "link", "eos", "tusd", "bnb",
//    "xlm", "uni", "matic", "sol", 
//    "dot", "luna", "avax", "ftm", 
//    "axs", "slp", "mana", "ubi", "bat", "trx", "doge"]

// es un objeto con props. no un array, ver funciones
// <p>Ask: {cryptoData.convertData[platforms].ask} - Precio de compra reportado por el exchange, sin sumar comisiones.</p>
// <p>TotalAsk: {platforms.totalAsk} - Precio de compra final incluyendo las comisiones de transferencia y trade.</p>
// <p>Bid: {platforms.bid} - Precio de venta reportado por el exchange, sin restar comisiones.</p>
// <p>TotalBid: {platforms.totalBid} - Precio de venta final incluyendo las comisiones de transferencia y trade.</p>
// <p>Time: {platforms.time} - Timestamp del momento en que fue actualizada esta cotización.</p>