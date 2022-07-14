import Nav from 'components/Nav/Nav';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useAppSelector } from 'redux/hooks';
import { convertCrypto } from 'redux/reducers/userReducer/actions/convertCrypto';
import { getCryptoList } from 'redux/reducers/userReducer/actions/getCryptoList';
import styles from './Crypto.module.css'
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import { resetCryptoData, resetCryptoList, searchCryptoByName } from 'redux/reducers/userReducer/userReducer';
import numeral from 'numeral';

export default function CryptoInvest() {

  const { cryptoList, status, cryptoData, usuario } = useAppSelector(state => state.user);// eslint-disable-line

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

  // Validate

  const [valMsg, setMsg] = useState('')
  const [valDisable, setDisabled] = useState(true)

  useEffect(() => {
    !form.id || form.id === 'default' ? setMsg('Proporcione la moneda que quiere convertir') :
      !form.to || form.id === 'default' ? setMsg('Proporcione la moneda a la cual convertirá') :
        !form.amount ? setMsg('Proporcione un monto') :
          setMsg('')

  }, [form])

  useEffect(() => {
    setDisabled(valMsg === '' ? false : true)
  }, [valMsg])

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
    if (status === 'success') {
      dispatch(getCryptoList())
    };
    const foo = async () => { await resetPage() }; foo();
  }, [])// eslint-disable-line

  function resetPage(){
      setButtonForm(false)
      resetAll()
      setForm({
        id: '',
        to: '',
        amount: 0
      })
      dispatch(resetCryptoData())
      dispatch(resetCryptoList())
  }

  function handleRefresh(){
    setButtonForm(false)
    resetAll()
    setForm({
      id: '',
      to: '',
      amount: 0
    })
    setSearch({
      name: ''
    })
    dispatch(resetCryptoData())
    dispatch(getCryptoList())
}

  // Search by Name

  const [search, setSearch] = useState({
    name: ''
  })

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {	
    setSearch({
      name: e.target.value
    })
  }

  // Convert crypto

  function searchByName(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault()
    dispatch(searchCryptoByName(search.name))
  }

  function resetAll() {
    (document.getElementById("selectTo") as HTMLFormElement).value = 'default';
    (document.getElementById("selectCoin") as HTMLFormElement).value = 'default';
  }

  function handleSelectSearch(e: React.ChangeEvent<HTMLSelectElement>) {
    e.preventDefault()
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  function refreshForm(e: React.MouseEvent<HTMLButtonElement, MouseEvent>){
    e.preventDefault()
    setButtonForm(false)
    resetAll()
    setForm({
      id: '',
      to: '',
      amount: 0
    })
    dispatch(resetCryptoData())
  }

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    e.preventDefault()
    setForm({
      ...form,
      amount: parseInt(e.target.value)
    })
  }
  const [buttonForm, setButtonForm] = useState<boolean>(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // if (usuario.premium) {
      dispatch(convertCrypto(form))
      setButtonForm(true)
    // } else {
    //   return alert('Debes ser un usuario premium para poder convertir la moneda.')
    // }
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
          {/* Search by name */}
          <div className={styles.searchCrypto}>
            <label>Encuentra tu criptomoneda</label>
            <input type="text" 
            value={search.name}
            placeholder='Buscar por nombre'
            onChange={handleChange}
            /> <button onClick={(e) => searchByName(e)}>Buscar</button>
            <button onClick={handleRefresh}>Refresh</button>
          </div>
          {/* Search form */}
          <div className={styles.formCrypto}>
            <form onSubmit={handleSubmit}>
              {
                buttonForm &&
                <button onClick={(e) => refreshForm(e)}>X</button>
              }
              <select id="selectCoin" name='id' onChange={(e) => handleSelectSearch(e)}>
                <option value="default">Criptomoneda</option>
                {cryptoList.length > 0
                  ? cryptoList.map((crypto: Crypto) => {
                    return (
                      <option value={crypto.symbol}>{crypto.name}</option>
                    )
                  })
                  : <option>Loading...</option>
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
              ? <div className={styles.allCryptoData}>
                <div className={styles.infoCrypto}>
                <p>Ask: Precio de compra reportado por el exchange, sin sumar comisiones.</p>
                        <p>TotalAsk: Precio de compra final incluyendo las comisiones de transferencia y trade.</p>
                        <p>Bid: Precio de venta reportado por el exchange, sin restar comisiones.</p>
                        <p>TotalBid: Precio de venta final incluyendo las comisiones de transferencia y trade.</p>
                </div>
                  <h1>Plataformas de compra y venta:</h1>
                <div className={styles.platformConteiner}>
                {
                  Object.entries(cryptoData.convertData).map(([key, value]: any) => {
                    return (
                      <div className={styles.platformsData}>
                        <h4>{key.toUpperCase()}</h4>
                        <p>Ask: {numeral(value.ask).format('$0,0.00')} </p>
                        <p>TotalAsk: {numeral(value.totalAsk).format('$0,0.00')}.</p>
                        <p>Bid: {numeral(value.bid).format('$0,0.00')} </p>
                        <p>TotalBid: {numeral(value.totalBid).format('$0,0.00')}.</p>
                      </div>
                    )
                  })
                }
                </div>
              </div>
              :   // {/* Error Display */}
              <span id='validateError' className={styles.formCrypto}>{valMsg}</span>
          }

    <div>
      <div className={styles.carrouselPretty}>
<ArrowBackIosNewIcon onClick={(e) => prevPage(e)} cursor='pointer' className={styles.carrouselButton}/>
    <ul className={styles.cryptos}>


{
  cryptoList.length > 0
    ? currentCrypto.slice(0, 50).map((crypto: Crypto, i: number) => {
      return (
        <li className={styles.cryptoList} key={i}>
          <img src={crypto.image.large} alt="Not found" />
          <p>Nombre: {crypto.name}</p>
          <p>Símbolo: {crypto.symbol}</p>
          <span className={styles.cryptoPrice}>
            <p className={styles.price}>Precio actual</p>
            <p>En peso argentino: {numeral(crypto.market_data.current_price.ars).format('$0,0.00')}</p>
            <p>En dólar: {numeral(crypto.market_data.current_price.usd).format('$0,0.00')}</p>
            <p>En euro: {numeral(crypto.market_data.current_price.eur).format('$0,0.00')}</p>
            <p>En bitcoin: {numeral(crypto.market_data.current_price.btc).format('$0,0.00')}</p>
          </span>
        </li>
      )
    })
    : <li>Loading...</li>
}
</ul>
<ArrowForwardIosIcon onClick={(e) => nextPage(e)} cursor='pointer' className={styles.carrouselButton} />

      </div>
    </div>
         
        </div>
      </div>
    </div>
  )
}
