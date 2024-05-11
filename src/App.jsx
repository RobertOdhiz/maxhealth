import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Landing from './components/landing'
import Login from './components/authentication/login'
import Registration from './components/authentication/registration'
import Cart from './components/orderManagement/cart'
import Footer from './components/semiComponents/footer'
import Navbar from './components/semiComponents/navbar'

function App() {
  

  return (
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />}></Route>
          <Route path='/login' element={<Login />}></Route>
          <Route path='/register' element={<Registration />}></Route>
          <Route path='/cart' element={<Cart />}></Route>
        </Routes>
        <Footer />
        <Navbar />
      </BrowserRouter>
  )
}

export default App
