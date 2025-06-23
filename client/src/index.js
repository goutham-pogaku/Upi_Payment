import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from './App';
import PaymentOptions from './PaymentOptions';

ReactDOM.render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/pay" element={<PaymentOptions />} />
    </Routes>
  </BrowserRouter>,
  document.getElementById('root')
);