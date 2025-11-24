import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Login.css'

function Login({ onLogin }) {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Login attempt:', { email, password })
    // Extract username from email (part before @)
    const username = email.split('@')[0]
    onLogin({ email, username })
  }

  return (
    <div className="login-container">
      <div className="login-box">
        <div className="logo-section">
          <div className="logo">
            <img src="/image/logo.png" alt="Train Logo" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              placeholder="nama@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              placeholder="Masukkan password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div className="forgot-password">
            <a href="#forgot">Lupa Password?</a>
          </div>

          <button type="submit" className="login-button">
            Login
          </button>

          <div className="register-link">
            <p>Belum punya akun? <a href="/register" onClick={(e) => { e.preventDefault(); navigate('/register') }}>Daftar di sini</a></p>
          </div>
        </form>

        <footer className="footer">
          <p>© 2025 KAI</p>
        </footer>
      </div>

      <div className="image-section">
        <img src="/image/bg-login.png" alt="Train" />
      </div>
    </div>
  )
}

export default Login
