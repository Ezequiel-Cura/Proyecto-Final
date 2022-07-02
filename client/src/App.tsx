import React, { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';

// COMPONENTS
import Home from 'components/Home/Home';
import Landing from 'components/Landing/Landing';
import Profile from 'components/Profile/Profile';
import Ingreso from 'components/Ingreso/Ingreso';
import ConDatos from 'components/Ingreso/ConDatos';
import Gastos from 'components/Gastos/Gastos';
import ConDatosGastos from 'components/Gastos/ConDatosGastos';
import Detalles from 'components/Detalles/Detalles';
import { useAppDispatch } from 'redux/hooks';
import { getUserInfo } from 'redux/reducers/userReducer';
import Novedades from 'components/Novedades/Novedades';

function App() {
  const dispatch = useAppDispatch()
  useEffect(()=> {
    if(localStorage.getItem("logged")) dispatch(getUserInfo())
  },[])

  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>} />
      <Route path='/home/ingresos' element={<Ingreso/>}/>
      <Route path='/home/ingresos/add' element={<ConDatos/>}/>
      <Route path='/home/gastos' element={<Gastos/>}/>
      <Route path='/home/gastos/add' element={<ConDatosGastos/>}/>
      <Route path='/home/detalles' element={<Detalles/>}/>
      <Route path='/home/novedades' element={<Novedades/>}/>
    </Routes>
  );
}

export default App;
