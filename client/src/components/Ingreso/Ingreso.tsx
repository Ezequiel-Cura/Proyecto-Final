import React from 'react';
import ConDatos from "./ConDatos";
import SinDatos from './SinDatos';
import { useAppSelector } from "../../redux/hooks";

export default function Ingreso() {
  const { allInputs } = useAppSelector(state => state.user);

  return (
    <div>
      { allInputs.length > 0 ? <ConDatos/> : <SinDatos/>}
    </div>
  )
}