import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'components/Home/Home';
import Login from 'components/Login';
import Profile from 'components/Profile/Profile';
import Input from 'components/Ingreso/Input';
import InputTable from 'components/Ingreso/InputTable';
import Expenses from 'components/Gastos/Expenses';
import ExpensesTable from 'components/Gastos/ExpensesTable';
import Detalles from 'components/Detalles/Detalles';
import { useAppDispatch } from 'redux/hooks';
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
import Banned from 'components/Banned/Banned';
import UnVerified from 'components/UnVerified/UnVerified';
import {ProductDisplay} from 'components/Premium/ProductDisplay';

function App() {
  const dispatch = useAppDispatch()

  
  useEffect(() => {
    if (localStorage.getItem("logged")) dispatch(getUserInfo())
  }, [])// eslint-disable-line

  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/users/:id/verify/:verifyToken" element={<VerifyEmail/>}/>
      <Route path="/banned" element={<Banned/>}/>
      <Route path="/unVerified" element={<UnVerified/>}/>
      <Route element={<ProtectedRoute isAllowed={{boolean : localStorage.getItem("logged"), 
      reason: localStorage.getItem("banned") ? "banned" : localStorage.getItem("unVerified") ? "unVerified" : ""}}/>}>
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
      <Route path="/home/premium" element={<ProductDisplay />}/> 
      </Route>
      <Route path='/admin' element={<ProtectedRoute isAllowed={{boolean: localStorage.getItem("admin")}}/>}>
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
