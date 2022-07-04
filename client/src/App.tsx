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
import Novedades from 'components/Novedades/Novedades';
import SavesLanding from 'components/Saves/SavesLanding';
import Saves from 'components/Saves/Saves';



function App() {
  const dispatch = useAppDispatch()
  const { usuario } = useAppSelector((({user}) => user))
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
        <Route path="/home/novedades" element={<Novedades/>} />
        <Route path='/home/saving' element={<SavesLanding/>}/>
        <Route path='/home/saving/add' element={<Saves/>}/>
      </Route>
      <Route path='/admin' element={<ProtectedRoute isAllowed={logged && usuario.role === "admin"}/>}>
        <Route path="/admin/controlPanel" element={<ControlPanel/>}/>
      </Route>
      
      <Route path="*" element={<LostPage/>}/>
    </Routes>
  );
}

export default App;
