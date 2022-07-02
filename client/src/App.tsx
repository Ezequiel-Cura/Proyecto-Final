import React, { useEffect, useState } from 'react';
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
import ControlPanel from 'components/Admin/ControlPanel/ControlPanel';

function App() {
  const dispatch = useAppDispatch()
  const { usuario } = useAppSelector((({user}) => user))
  console.log("role: ", usuario.role === "admin")
  const [logged, setLogged] = useState(true)

  useEffect(()=> {
    if(localStorage.getItem("logged")) dispatch(getUserInfo())
    else setLogged(false)
  },[])

  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route element={<ProtectedRoute isAllowed={logged}/>}>
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/home/ingresos' element={<Ingreso/>}/>
        <Route path='/home/ingresos/add' element={<ConDatos/>}/>
        <Route path='/home/gastos' element={<Gastos/>}/>
        <Route path='/home/gastos/add' element={<ConDatosGastos/>}/>
        <Route path='/home/detalles' element={<Detalles/>}/>
      </Route>
      <Route path='/admin/controlPanel' element={
      <ProtectedRoute isAllowed={logged && usuario.role === "admin"}>
        <ControlPanel/>
      </ProtectedRoute>
      }/>
      <Route path="*" element={<LostPage/>}/>
    </Routes>
  );
}

export default App;
