import Nav from 'components/Nav/Nav';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks';
import { convertCrypto } from 'redux/reducers/userReducer/actions/convertCrypto';
import { getCryptoList } from 'redux/reducers/userReducer/actions/getCryptoList';
import styles from './Crypto.module.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';

export default function CryptoInvest() {

  const { cryptoList, status, cryptoData, usuario } = useAppSelector(state => state.user);

  const dispatch = useDispatch()

  //Pagination
  const [currentPage, setCurrentPage] = useState<number>(1)
  const maxCryptos = 3

  const lastCrypto = currentPage * maxCryptos
  const firstCrypto = lastCrypto - maxCryptos

  const currentCrypto = cryptoList.length > 2 ? cryptoList.slice(firstCrypto, lastCrypto) : cryptoList

  function prevPage(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    e.preventDefault();
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
    else {
      alert("No hay más páginas previas")
    }
  };
  function nextPage(e: React.MouseEvent<SVGSVGElement, MouseEvent>) {
    e.preventDefault();
    if (Math.ceil(cryptoList.length / 3) > currentPage) {
      setCurrentPage(currentPage + 1);
    }
    else {
      alert("No hay más páginas posteriores")
    }
  }

  interface Form {
    id: string,
    to: string,
    amount: number
  }

  const [form, setForm] = useState<Form>({
    id: '',
    to: '',
    amount: 0
  })

  interface CryptoConvertData {
    ask: number,
    totalAsk: number,
    bid: number,
    totalBid: number,
    time: number
  }

  // Validate

  const [valMsg, setMsg] = useState('')
  const [valDisable, setDisabled] = useState(true)

  useEffect(() => {
    !form.id ? setMsg('Proporcione la moneda que quiere convertir') :
      !form.to ? setMsg('Proporcione la moneda a la cual convertirá') :
        !form.amount ? setMsg('Proporcione un monto') :
          setMsg('')

  }, [form])

  useEffect(() => {
    setDisabled(valMsg === '' ? false : true)
  }, [valMsg])

  // SEARCH CRIPTO

  interface Crypto {
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
    if (status === 'success') {
      dispatch(getCryptoList())
      // .then((json: Crypto[]) => { setData(json); setLoading(false);});
    }
  }, [])

  function resetAll() {
    (document.getElementById("selectTo") as HTMLFormElement).value = '';
    (document.getElementById("selectCoin") as HTMLFormElement).value = '';
  }

  function handleSelectSearch(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setForm({
      ...form,
      amount: parseInt(e.target.value)
    })
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    if (usuario.premium) {
      dispatch(convertCrypto(form))
      resetAll()
      setForm({
        id: '',
        to: '',
        amount: 0
      })
    } else {
      return alert('Debes ser un usuario premium para poder convertir la moneda.')
    }
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
                {cryptoList.length > 0
                  ? cryptoList.map((crypto: Crypto) => {
                    return (
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
              <button type='submit' disabled={valDisable}>Valor actual</button>
            </form>
          </div>
          {
            cryptoData !== 'Invalid pair' && Object.keys(cryptoData).length > 0
              ? <div>
                <h1>{cryptoData.amount} de {cryptoData.id} a {cryptoData.to}</h1>
                {
                  Object.entries(cryptoData.convertData).map(([key, value]: any) => {
                    return (
                      <span>
                        <h4>Plataforma de compra y venta: {key}</h4>
                        <p>Ask: {value.ask} - Precio de compra reportado por el exchange, sin sumar comisiones.</p>
                        <p>TotalAsk: {value.totalAsk} - Precio de compra final incluyendo las comisiones de transferencia y trade.</p>
                        <p>Bid: {value.bid} - Precio de venta reportado por el exchange, sin restar comisiones.</p>
                        <p>TotalBid: {value.totalBid} - Precio de venta final incluyendo las comisiones de transferencia y trade.</p>
                        <p>Time: {value.time} - Timestamp del momento en que fue actualizada esta cotización.</p>
                      </span>
                    )
                  })
                }
              </div>
              :   // {/* Error Display */}
              <span id='validateError'>{valMsg}</span>
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
    <div>
    <ul className={styles.cryptos}>

<ArrowBackIosNewIcon onClick={(e) => prevPage(e)} cursor='pointer' />

{
  cryptoList.length > 0
    ? currentCrypto.slice(0, 50).map((crypto: Crypto, i: any) => {
      return (
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
</ul>
<ArrowForwardIosIcon onClick={(e) => nextPage(e)} cursor='pointer' />
    </div>
         
        </div>
      </div>
    </div>
  )
}
