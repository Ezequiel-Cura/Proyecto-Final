import { Link } from "react-router-dom"
import styles from "./Banned.module.css"

export default function Banned() {
  return (
    <div className={styles.wrapper}>
        <h1>Parece que has sido baneado, si crees que ha sido un baneo injustificado mandanos un email a "finanzaspersonaleshenry@gmail.com"</h1>
        <Link to="/" className={styles.link}>Vuelve al inicio</Link>
    </div>
  )
}

