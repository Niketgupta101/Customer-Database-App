import React from 'react'
import Home from './components/Home/Home';

import { BrowserRouter, Routes, Route } from "react-router-dom";

import './app.css';
import Orders from './components/Orders/Orders';
import Products from './components/Products/Products';

const App = () => {
  return (
    <div className='App'>
    <div className="Navbar">
      <h1>Appleute</h1>
    </div>
    <BrowserRouter>
      <div id="User" className="User">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/customers/:customerId" element={<Orders />} />
          <Route path="/orders/:orderId" element={<Products />} />
        </Routes>
      </div>
    </BrowserRouter>
    </div>
  )
}

export default App