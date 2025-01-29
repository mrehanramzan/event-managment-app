import React from 'react';
import Home from './pages/Home';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Event from './pages/Event';
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';


function App() {
  return (
    <>
    <ToastContainer/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/signup" element={<Signup/>}/>
      <Route path="/event" element={<Event/>}/>
    </Routes>
    </>
  )
}

export default App