import React from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';


//import LandingPage from './components/pages/LandingPage'
import LoginPage from './components/Login'
import HomePage from './components/Home'
// import RegisterPage from './components/pages/RegisterPage'
// import ForgetPasswordPage from './components/pages/ForgetPasswordPage'
// import HomePage from './components/pages/HomePage'

import './App.css'


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/home" element={<HomePage />} />
      </Routes>
    </Router>
)
}

export default App;
