import React, { ReactElement, useEffect, useState } from 'react';
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
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getUserInfo } from 'redux/reducers/userReducer';
import { ProtectedRoute } from 'utils/ProtectedRoutes';
import LostPage from 'components/LostPage/LostPage';

export interface IMyProps {
  logged?: boolean
}

function App() {
  const dispatch = useAppDispatch()
  const usuario = useAppSelector((({user}) => user))
  const [logged, setLogged] = useState(false)

  useEffect(()=> {
    if(localStorage.getItem("logged")) dispatch(getUserInfo()).then(() => setLogged(true))
  },[])

  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path='/home' element={<ProtectedRoute logged={logged}><Home/></ProtectedRoute>}/>
      <Route path='/profile' element={<ProtectedRoute logged={logged}><Profile/></ProtectedRoute>} />
      <Route path='/home/ingresos' element={<ProtectedRoute logged={logged}><Ingreso/></ProtectedRoute>}/>
      <Route path='/home/ingresos/add' element={<ProtectedRoute logged={logged}><ConDatos/></ProtectedRoute>}/>
      <Route path='/home/gastos' element={<ProtectedRoute logged={logged}><Gastos/></ProtectedRoute>}/>
      <Route path='/home/gastos/add' element={<ProtectedRoute logged={logged}><ConDatosGastos/></ProtectedRoute>}/>
      <Route path='/home/detalles' element={<ProtectedRoute logged={logged}><Detalles/></ProtectedRoute>}/>
      <Route path="*" element={<LostPage/>}/>
    </Routes>
  );
}

export default App;
