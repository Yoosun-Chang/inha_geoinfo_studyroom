import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Reservation from "./page/reservation";
import Infrom from "./component/main/inform";
import Confirm from "./component/reservation/confirm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/main" element={<Infrom />} />
        <Route path="/reservation" element={<Reservation />} />
        <Route path="/confirm" element={<Confirm />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
