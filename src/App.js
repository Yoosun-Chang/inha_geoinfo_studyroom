import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Main from './page/main';
import Reservation from './page/reservation';

function App() {
  return (
    <BrowserRouter>
      <Routes> 
        <Route path="/main" element={<Main />} /> 
        <Route path="/reservation" element={<Reservation />} /> 
      </Routes>
    </BrowserRouter>
  );
}

export default App;
