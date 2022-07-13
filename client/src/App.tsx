import React, { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

// COMPONENTS
import Home from 'components/Home/Home';
import Login from 'components/Login';
import Profile from 'components/Profile/Profile';
import Input from 'components/Ingreso/Input';
import InputTable from 'components/Ingreso/InputTable';
import Expenses from 'components/Gastos/Expenses';
import ExpensesTable from 'components/Gastos/ExpensesTable';
import Detalles from 'components/Detalles/Detalles';
import { useAppDispatch, useAppSelector } from 'redux/hooks';
import { getUserInfo } from 'redux/reducers/userReducer/actions/getUserInfo';
import { ProtectedRoute } from 'utils/ProtectedRoutes';
import LostPage from 'components/LostPage/LostPage';
import ControlPanel from 'components/Admin/ControlPanel/ControlPanel';
import Novedades from 'components/Novedades/Novedades';
import SavesLanding from 'components/Saves/SavesLanding';
import Saves from 'components/Saves/Saves';
import SavesDetail from 'components/Saves/SavesDetail';
import Landing from 'components/Landing/Landing';
import VerifyEmail from 'components/VerifyEmail/VerifyEmail';
import UserCard from 'components/Admin/UserCard/UserCard';
import ReportsPanel from 'components/Admin/ReportsPanel/ReportsPanel';
import CryptoLanding from 'components/CryptoInvest/CryptoLanding';
import CryptoInvest from 'components/CryptoInvest/CryptoInvest';
import MessagesPanel from 'components/Admin/MessagesPanel/MessagesPanel';

function App() {
  const dispatch = useAppDispatch()
  useEffect(() => {
    if (localStorage.getItem("logged")) dispatch(getUserInfo())
  }, [])

  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/users/:id/verify/:verifyToken" element={<VerifyEmail/>}/>
      <Route element={<ProtectedRoute isAllowed={localStorage.getItem("logged")} redirectPath={"/login"} state={{registered: true}}/>}>
        <Route path='/home' element={<Home/>}/>
        <Route path='/profile' element={<Profile/>}/>
        <Route path='/home/ingresos' element={<Input/>}/>
        <Route path='/home/ingresos/add' element={<InputTable/>}/>
        <Route path='/home/gastos' element={<Expenses/>}/>
        <Route path='/home/gastos/add' element={<ExpensesTable/>}/>
        <Route path='/home/saving' element={<SavesLanding/>}/>
        <Route path='/home/saving/add' element={<Saves/>}/>
        <Route path='/home/saving/add/:id' element={<SavesDetail/>}/>
        <Route path='/home/detalles' element={<Detalles/>}/>
        <Route path="/home/novedades" element={<Novedades/>} />
        <Route path="/home/crypto/currency" element={<CryptoInvest />} />
        <Route path="/home/crypto" element={<CryptoLanding />} />
      </Route>
      <Route path='/admin' element={<ProtectedRoute  redirectPath={"/login"} state={{registered: true}} isAllowed={localStorage.getItem("admin")}/>}>
        <Route path="/admin/controlPanel" element={<ControlPanel/>}/>
        <Route path="/admin/userCard" element={<UserCard/>}/>
        <Route path="/admin/reports" element={<ReportsPanel/>}/>
        <Route path="/admin/messagesPanel" element={<MessagesPanel/>}/>
      </Route>
      <Route path="*" element={<LostPage />} />
    </Routes>
  );
}

export default App;
