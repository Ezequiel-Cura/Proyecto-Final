import React, { useEffect } from 'react';
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
import { useAppDispatch } from 'redux/hooks';
import { getUserInfo } from 'redux/reducers/userReducer';
import SavesLanding from 'components/Saves/SavesLanding';
import Saves from 'components/Saves/Saves';

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
      <Route path='/home/ingresos' element={<Input/>}/>
      <Route path='/home/ingresos/add' element={<InputTable/>}/>
      <Route path='/home/gastos' element={<Expenses/>}/>
      <Route path='/home/gastos/add' element={<ExpensesTable/>}/>
      <Route path='/home/saving' element={<SavesLanding/>}/>
      <Route path='/home/saving/add' element={<Saves/>}/>
      <Route path='/home/detalles' element={<Detalles/>}/>
    </Routes>
  );
}

export default App;
