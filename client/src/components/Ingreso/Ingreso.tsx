import React, { useEffect } from 'react';
import Nav from "../Nav/Nav";
import ConDatos from "./ConDatos";
import SinDatos from './SinDatos';
//-------------
//redux: para que se autocomplete por el tipado + para poder utilizar otras funciones que no sean puras
import  { setUser }  from "../../redux/reducers/userReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function Ingreso() {
  const { todosLosUsuarios } = useAppSelector( state => state.userReducer); //traigo el estado global, con el  dispatch(ej Erik) cargado
  const dispatch = useAppDispatch();

  console.log(todosLosUsuarios, "INGRESO");

  useEffect(() => {
    //dispatch(setUser());      //carga de user(ej Erik)
  }, [])

  return (
    <div>
      {todosLosUsuarios ? <SinDatos/> : <ConDatos/>}  
    </div>
  )
  }