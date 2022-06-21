import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from 'components/Home/Home';
import Landing from 'components/Landing/Landing';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Landing/>}/>
    </Routes>
  );
}

export default App;
