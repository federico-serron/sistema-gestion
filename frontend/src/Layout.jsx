import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './views/Home';
import injectContext from './js/store/appContext.jsx';
import './index.css';
import Register from './views/Register.jsx';
import Login from './views/Login.jsx';

const Layout = () => {
  const basename = import.meta.env.VITE_BASENAME || "";
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route exact path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default injectContext(Layout);