import styles from "./Home.module.css"
import Nav from "components/Nav/Nav"
import { Link } from 'react-router-dom'
import { useAppSelector } from "redux/hooks"
import { useEffect } from "react"
import { renderInput, renderOutput, totalInput, totalOutput } from "redux/reducers/userReducer/userReducer"
import { useDispatch } from "react-redux"

export default function Home() {
  const { status, totalInputsMonth, totalOutputsMonth } = useAppSelector((state)=> state.user)
  const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`
  const dispatch = useDispatch()

  const { usuario } = useAppSelector( s => s.user)

  useEffect(() => {
     if(status === 'success'){ 
      dispatch(renderInput(date));
      dispatch(renderOutput(date))
      dispatch(totalInput());
      dispatch(totalOutput());
    }
  }, [date, dispatch, status])
  return (
    <div className={styles.wrapper}>
      <Nav/>
      <div className={styles.text_wrapper}>
      {
        usuario.premium && (
          <section>
          <p>Usted es un usuario Premium.</p>
        </section>
  ) 
  }
        <div className={styles.title_wrapper}>
          <h1>Administra tus finanzas</h1>
        </div>
        <div className={styles.links_wrapper}>
          <div >
              <Link to="/home/ingresos">
                <div className={styles.ingresoLink}>
                    <h2 className={styles.h2}>INGRESOS</h2> 
                    <span>Monto actual: ${totalInputsMonth} </span>
                </div>
              </Link>
          </div>
          <div>
            <Link to="/home/gastos">
              <div className={styles.gastos_link}>
                  <h2 className={styles.h2}>GASTOS</h2>
                    <span>Monto actual: ${totalOutputsMonth} </span>

              </div>
            </Link>
          </div>
          <div>
            <Link to="/home/saving">
              <div className={styles.ahorros_link}>
                  <h2 className={styles.h2}>AHORROS</h2>
                  {/* <span>Monto actual: ${} </span> */}
              </div>
            </Link>
          </div>
          <div>
              <Link to="/home/detalles">
                <div className={styles.detalles_link}>
                    <h2 className={styles.h2}>DETALLES</h2>            
                </div>
              </Link>
          </div>

          <div className={styles.expand_columns}>
              <Link to="/home/novedades">
                <div className={styles.novedades_link}>
                    <h2 className={styles.h2}>NOVEDADES</h2>            
                </div>
              </Link>
          </div>

          <div className={styles.expand_columns}>
              <Link to="/home/crypto">
                <div className={styles.novedades_link}>
                    <h2 className={styles.h2}>FINANZAS DIGITALES</h2>            
                </div>
              </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
