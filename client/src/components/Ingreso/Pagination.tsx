import React from 'react';
import styles from './Pagination.module.css'

export default function Pagination() {

  return (
    <div className={styles.wrapperPag}>
      <button>Prev</button>
      <button>Next</button>
    </div>
  )
  }