import React from "react";
import Nav from "components/Nav/Nav";
import styles from "./Detalles.module.css";
import { useAppSelector } from "redux/hooks";

export default function Detalles() {
  const usuario = useAppSelector((state) => state.user.usuario);
  console.log(usuario);
  let border1 = "2px solid white";

  const styleBar = {
    border: border1,
    borderRadius: "10px",
    overflow: "hidden",
    display: "flex",
  };

  function calculate() {
    const ingresos = usuario.Account.extraInput.reduce(
      (prev, actual) => {
        return prev + actual.amount
      },
      0
    );
    const gastos = usuario.Account;
    return ingresos;
  }
  console.log(calculate());
  function random() {
    return Math.floor(Math.random() * 100);
  }

  const incomes = {
    background: "green",
    width: random() + "%",
    height: "100px",
  };

  const gastos = {
    background: "red",
    width: random() + 100 + "%",
    height: "100px",
  };

  return (
    <div>
      <Nav />
      <div className={styles.detalles_wrapper}>
        <h1>Detalles</h1>

        <div style={styleBar}>
          <div style={incomes}>{} </div>
          <div style={gastos}>{} </div>
        </div>
      </div>
    </div>
  );
}

// npm install @mui/icons-material

// npm i @types/mui

// npm i @types/material-ui
