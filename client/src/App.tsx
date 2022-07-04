import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// COMPONENTS
import Home from 'components/Home/Home';
import Landing from 'components/Landing/Landing';
import Profile from 'components/Profile/Profile';
import Input from 'components/Ingreso/Input';
import InputTable from 'components/Ingreso/InputTable';
import Expenses from 'components/Gastos/Expenses';
import ExpensesTable from 'components/Gastos/ExpensesTable';
import Detalles from 'components/Detalles/Detalles';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getUserInfo } from 'redux/modules/getUserInfo';
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
        <Route path='/home/ingresos' element={<Input/>}/>
        <Route path='/home/ingresos/add' element={<InputTable/>}/>
        <Route path='/home/gastos' element={<Expenses/>}/>
        <Route path='/home/gastos/add' element={<ExpensesTable/>}/>
        <Route path='/home/detalles' element={<Detalles/>}/>
        <Route path="/home/novedades" element={<Novedades/>} />
      </Route>
      <Route path='/admin' element={<ProtectedRoute isAllowed={logged && usuario.role === "admin"}/>}>
        <Route path="/admin/controlPanel" element={<ControlPanel/>}/>
      </Route>
      
      <Route path="*" element={<LostPage/>}/>
    </Routes>
  );
}

export default App;
