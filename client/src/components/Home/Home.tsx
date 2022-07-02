import styles from "./Home.module.css"
import Nav from "components/Nav/Nav"
import { Link } from 'react-router-dom'
import { useAppSelector } from "redux/hooks"

export default function Home() {
  const usuario = useAppSelector((state)=> state.user.usuario)
  console.log(usuario)
  return (
    <div className={styles.home_wrapper}>
      <Nav/>
      <div className={styles.text_wrapper}>

        <div className={styles.title_wrapper}>
          <h1>Administra tus finanzas</h1>
        </div>
        <div className={styles.links_wrapper}>

          <div >
              <Link to="/home/ingresos">
                <div className={styles.ingresoLink}>
                    <h2>INGRESOS</h2> 
                    <span>Monto actual: ${} </span>
                </div>
              </Link>
          </div>

          <div>
            <Link to="/home/gastos">
              <div className={styles.gastos_link}>
                  <h2>GASTOS</h2>
                  <span>Monto actual: ${} </span>
              </div>
            </Link>
          </div>

          <div>

            <Link to="/home">
              <div className={styles.ahorros_link}>
                  <h2>AHORROS</h2>
                  <span>Monto actual: ${} </span>
              </div>
            </Link>
          </div>

          <div>
              <Link to="/home/detalles">
                <div className={styles.detalles_link}>
                    <h2>DETALLES</h2>            
                </div>
              </Link>
          </div>

          <div className={styles.expand_columns}>
              <Link to="/home">
                <div className={styles.novedades_link}>
                    <h2>NOVEDADES</h2>            
                </div>
              </Link>
          </div>

        </div>
      </div>
    </div>
  )
}
