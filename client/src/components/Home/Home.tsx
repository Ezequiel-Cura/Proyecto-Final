import styles from "./Home.module.css"
import Nav from "components/Nav/Nav"
import { Link } from 'react-router-dom'
import { useAppSelector } from "redux/hooks"//eslint-disable-line

export default function Home() {
  // const usuario = useAppSelector((state)=> state.user.usuario)
  // const date = `${new Date().getFullYear()}-${String(new Date().getMonth()).length < 2 ? "0" + String(new Date().getMonth() + 1) : String(new Date().getMonth())}`
  // const datos = ()=>{
  //   const ingresosFijos = usuario.monthly.input.length > 0 ? usuario.monthly.input.reduce((prev:any, actual:any) => {
  //     return prev + actual.amount;
  //   }, 0) : 0
  //   const ingresos =  usuario.extra.input.length > 0 ? usuario.extra.input.find( (e: any) => e.date === date) : {}
  //   const ingresosEntries = ingresos.entries.length > ? ingresos.entries.reduce((prev:any, actual:any) => {
  //     return prev + actual.amount;
  //   }, 0) : 0
  //   const allInputs = ingresosFijos + ingresosEntries
  //   const gastosFijos =  usuario.monthly.output.reduce((prev:any, actual:any) => {
  //     return prev + actual.amount;
  //   }, 0);
  //   const gastos = usuario.extra.output.find( (e: any) => e.date === date)
  //   const gastosEntries = gastos ? gastos.entries.reduce((prev:any, actual:any) => {
  //     return prev + actual.amount;
  //   }, 0) : 0
  //   const allGastos = gastosEntries + gastosFijos
  //   return {allInputs,allGastos}
  // }
  // console.log(datos().allGastos)
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
                    <h2 className={styles.h2}>INGRESOS</h2> 
                    {/* <span>Monto actual: ${datos().allInputs} </span> */}
                </div>
              </Link>
          </div>
          <div>
            <Link to="/home/gastos">
              <div className={styles.gastos_link}>
                  <h2 className={styles.h2}>GASTOS</h2>
                  {/* <span>Monto actual: ${datos().allGastos} </span> */}
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

        </div>
      </div>
    </div>
  )
}
