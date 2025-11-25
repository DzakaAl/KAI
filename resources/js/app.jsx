import React, { useState } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import Login from './components/login/Login'
import Register from './components/register/Register'
import Home from './components/home/Home'
import DetailAset from './components/locationDetail/LocationDetail'
import DetailInventaris from './components/detailAsset/DetailAsset'
import './App.css'

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [userData, setUserData] = useState(null)

  const handleLogin = (user) => {
    setUserData(user)
    setIsAuthenticated(true)
  }

  const handleLogout = () => {
    setUserData(null)
    setIsAuthenticated(false)
  }

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isAuthenticated ? 
            <Navigate to="/home" /> : 
            <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/register" 
          element={
            isAuthenticated ? 
            <Navigate to="/home" /> : 
            <Register />
          } 
        />
        <Route 
          path="/home" 
          element={
            isAuthenticated ? 
            <Home user={userData} onLogout={handleLogout} /> : 
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/location/:id" 
          element={
            isAuthenticated ? 
            <DetailAset /> : 
            <Navigate to="/" />
          } 
        />
        <Route 
          path="/location/:id/inventory" 
          element={
            isAuthenticated ? 
            <DetailInventaris /> : 
            <Navigate to="/" />
          } 
        />
      </Routes>
    </Router>
  )
}

export default App
