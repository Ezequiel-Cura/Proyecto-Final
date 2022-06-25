import React from 'react'
import styles from "./ImageEditor.module.css"

export default function ImageEditor({setImageEditor}) {
  return (
    <div className={styles.wrapper}>
        <div>
            hola
        </div>
        <button className={styles.closeButton} onClick={() => setImageEditor(false)}><i className='material-icons'>close</i></button>
    </div>
  )
}
