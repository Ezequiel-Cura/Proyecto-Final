import React from 'react';
import { Route, Routes } from 'react-router-dom';

// COMPONENTS
import Home from 'components/Home/Home';
import Landing from 'components/Landing/Landing';
import Profile from 'components/Profile/Profile';
import Ingreso from 'components/Ingreso/Ingreso';
import ConDatos from 'components/Ingreso/ConDatos';

function App() {
  return (
    
    <Routes>
      <Route path="/" element={<Landing/>}/>
      <Route path='/home' element={<Home/>}/>
      <Route path='/profile' element={<Profile/>} />
      <Route path='/home/ingresos' element={<Ingreso/>}/>
      <Route path='/home/ingresos/add' element={<ConDatos/>}/>
    </Routes>
  );
}

export default App;
