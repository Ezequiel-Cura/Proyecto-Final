import React from "react";
import Nav from "components/Nav/Nav";
import styles from "./Detalles.module.css";

export default function Detalles() {
  let border1 = "2px solid green";

  const styleBar = {
    border: border1,
    "border-radius": "10px",
    overflow: "hidden",
    display: "grid",
    "grid-template-columns": "1fr 1fr 1fr 1fr 1fr",
  };

  return (
    <div>
      <Nav />
      <div className={styles.detalles_wrapper}>
        <h1>Detalles</h1>
        <div style={styleBar}>
          <div className={styles.apples}>20</div>
          <div className={styles.bananas}>5</div>
          <div className={styles.peaches}>10</div>
          <div className={styles.cherries}>2</div>
          <div className={styles.grapes}>12</div>
        </div>
      </div>
    </div>
  );
}

// npm install @mui/icons-material

// npm i @types/mui

// npm i @types/material-ui
