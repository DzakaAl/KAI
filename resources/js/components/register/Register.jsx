import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './Register.css'

function Register() {
  const navigate = useNavigate()
  const [formData, setFormData] = useState({
    nama: '',
    email: '',
    nomorHp: '',
    password: '',
    confirmPassword: ''
  })

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    
    if (formData.password !== formData.confirmPassword) {
      alert('Password dan konfirmasi password tidak cocok!')
      return
    }

    console.log('Register attempt:', formData)
    // Di sini bisa tambahkan logika registrasi
    alert('Registrasi berhasil!')
    navigate('/')
  }

  return (
    <div className="register-container">
      <div className="image-section">
        <img src="/image/bg-login.png" alt="Train" />
      </div>
      <div className="register-box">
        <div className="logo-section">
          <div className="logo">
            <img src="/image/logo.png" alt="Train Logo" />
          </div>
        </div>

        <form onSubmit={handleSubmit} className="register-form">
          
          <div className="form-group">
            <label htmlFor="nama">Nama Lengkap</label>
            <input
              type="text"
              id="nama"
              name="nama"
              placeholder="Masukkan nama lengkap"
              value={formData.nama}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="nama@email.com"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="nomorHp">Nomor HP</label>
            <input
              type="tel"
              id="nomorHp"
              name="nomorHp"
              placeholder="08xxxxxxxxxx"
              value={formData.nomorHp}
              onChange={handleChange}
              pattern="[0-9]{10,13}"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Masukkan password"
              value={formData.password}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="confirmPassword">Konfirmasi Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              placeholder="Ulangi password"
              value={formData.confirmPassword}
              onChange={handleChange}
              minLength="6"
              required
            />
          </div>

          <button type="submit" className="register-button">
            Daftar
          </button>

          <div className="login-link">
            <p>Sudah punya akun? <a href="/" onClick={(e) => { e.preventDefault(); navigate('/') }}>Login di sini</a></p>
          </div>
        </form>

        <footer className="footer">
          <p>© 2025 KAI</p>
        </footer>
      </div>
    </div>
  )
}

export default Register
