import React, { useEffect } from 'react';
import Nav from "../Nav/Nav";
import ConDatos from "./ConDatos";
import SinDatos from './SinDatos';
//-------------
//redux: para que se autocomplete por el tipado + para poder utilizar otras funciones que no sean puras
import { loadMockUser } from "../../redux/reducers/userReducer";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";

export default function Ingreso() {
  const ingresoUsuario = useAppSelector( state => state.userReducer); //traigo el estado global, con el  dispatch(ej Erik) cargado
  const dispatch = useAppDispatch();

  console.log(ingresoUsuario, "DATOS DEL REDUCER");

  useEffect(() => {
    dispatch(loadMockUser());      //carga de user(ej Erik)
  }, [])
  //Falta en el condicional si existe el usuario con un ingreso. Solo verifica que haya un usuario(NO ESTOY USANDO EL loadMockUser())

  return (
    <div>
      <Nav/>
      {ingresoUsuario.usuario ? <SinDatos/> : <ConDatos/>}  
    </div>
  )
  }