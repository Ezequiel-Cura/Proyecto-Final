import Home from 'components/Home/Home';
import React from 'react';
import { Route, Routes } from 'react-router-dom';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Home/>}/>
    </Routes>
  );
}

export default App;
