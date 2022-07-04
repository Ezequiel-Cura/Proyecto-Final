import styles from "./Home.module.css"
import Nav from "components/Nav/Nav"
import { Link } from 'react-router-dom'

export default function Home() {

  return (
    <div className={styles.wrapper}>
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
                </div>
              </Link>
          </div>
          <div>
            <Link to="/home/gastos">
              <div className={styles.gastos_link}>
                  <h2>GASTOS</h2>
              </div>
            </Link>
          </div>
          <div>
            <Link to="/home/saving">
              <div className={styles.ahorros_link}>
                  <h2>AHORROS</h2>
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
        </div>
      </div>
    </div>
  )
}
