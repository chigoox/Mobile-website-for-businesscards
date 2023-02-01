import { useState } from 'react'
import './App.css'
import Main from './Pages/MainPage'
import Layout from './Pages/Layout'
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from './Pages/LoginPage';
import ProfileEditPage from './Pages/ProfileEditPage';
import ShopPage from './Pages/ShopPage';
import ExchangeContact from './Pages/ExchangeContactPage';


function App() {
  
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Layout />}>
          <Route index element={<LoginPage />} />
          <Route path="/:id" element={<Main />} />
          <Route path="/:id/profileEdit" element={<ProfileEditPage />} />
          <Route path="/:id/ExContact" element={<ExchangeContact />} />
          <Route path="/Shop" element={<ShopPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    
  )
}

export default App
//<Route path="/smallpainting" element={<SmallPaintings />} />