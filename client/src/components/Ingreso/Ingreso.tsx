import React, { useEffect } from 'react';
import Nav from "../Nav/Nav";
import ConDatos from "./ConDatos";
import SinDatos from './SinDatos';
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function Ingreso() {
  const ingresoUsuario = useAppSelector( state => state.userReducer); //traigo el estado global, con el  dispatch(ej Erik) cargado
  const dispatch = useAppDispatch();

  console.log(ingresoUsuario, "DATOS DEL REDUCER");

  return (
    <>
      <Nav/>
      {ingresoUsuario.usuario ? <SinDatos/> : <ConDatos/>}  
    </>
  )
  }