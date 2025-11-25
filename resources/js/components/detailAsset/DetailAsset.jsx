import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './DetailAsset.css'

function DetailInventaris() {
  const navigate = useNavigate()
  const { id, perangkatId } = useParams()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [filterPerangkat, setFilterPerangkat] = useState('all')
  const [filterStatus, setFilterStatus] = useState('all')
  const [activeMenuId, setActiveMenuId] = useState(null)
  const [allItems, setAllItems] = useState([])
  const [formData, setFormData] = useState({
    nama: '',
    lokasi: '',
    status: 'aktif'
  })
  const [currentData, setCurrentData] = useState(null)

  // Data Detail per perangkat (struktur: '1-1' = lokasi 1, perangkat 1)
  const DetailData = {
    '1-1': { // Stasiun Lempuyangan - CCTV IP Camera
      perangkatNama: 'CCTV IP Camera',
      lokasiNama: 'Stasiun Lempuyangan',
      total: 20,
      aktif: 18,
      nonAktif: 2,
      items: [
        { id: 1, nama: 'CCTV_01', lokasi: 'Pintu Masuk Utara 1', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 2, nama: 'CCTV_02', lokasi: 'Pintu Masuk Utara 2', status: 'tidak_aktif', jenis: 'CCTV IP Camera' },
        { id: 3, nama: 'CCTV_03', lokasi: 'Pintu Masuk Barat', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 4, nama: 'CCTV_04', lokasi: 'Peron 1', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 5, nama: 'CCTV_05', lokasi: 'Peron 2', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 6, nama: 'CCTV_06', lokasi: 'Peron 3', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 7, nama: 'CCTV_07', lokasi: 'Ruang Tunggu', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 8, nama: 'CCTV_08', lokasi: 'Loket Tiket', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 9, nama: 'CCTV_09', lokasi: 'Area Kantor', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 10, nama: 'CCTV_10', lokasi: 'Koridor Utama', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 11, nama: 'CCTV_11', lokasi: 'Tangga Darurat 1', status: 'tidak_aktif', jenis: 'CCTV IP Camera' },
        { id: 12, nama: 'CCTV_12', lokasi: 'Tangga Darurat 2', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 13, nama: 'CCTV_13', lokasi: 'Area Parkir', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 14, nama: 'CCTV_14', lokasi: 'Pintu Keluar', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 15, nama: 'CCTV_15', lokasi: 'Basement', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 16, nama: 'CCTV_16', lokasi: 'Ruang Mesin', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 17, nama: 'CCTV_17', lokasi: 'Area Outdoor 1', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 18, nama: 'CCTV_18', lokasi: 'Area Outdoor 2', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 19, nama: 'CCTV_19', lokasi: 'Peron 4', status: 'tidak_aktif', jenis: 'CCTV IP Camera' },
        { id: 20, nama: 'CCTV_20', lokasi: 'Peron 5', status: 'aktif', jenis: 'CCTV IP Camera' }
      ]
    },
    '1-2': { // Stasiun Lempuyangan - NVR Server
      perangkatNama: 'NVR Server',
      lokasiNama: 'Stasiun Lempuyangan',
      total: 2,
      aktif: 2,
      nonAktif: 0,
      items: [
        { id: 1, nama: 'NVR_SL_01', lokasi: 'Ruang Server 1', status: 'aktif', jenis: 'NVR Server' },
        { id: 2, nama: 'NVR_SL_02', lokasi: 'Ruang Server 2', status: 'aktif', jenis: 'NVR Server' }
      ]
    },
    '1-3': { // Stasiun Lempuyangan - Core Switch
      perangkatNama: 'Core Switch',
      lokasiNama: 'Stasiun Lempuyangan',
      total: 1,
      aktif: 1,
      nonAktif: 0,
      items: [
        { id: 1, nama: 'CS_SL_01', lokasi: 'Ruang Server', status: 'aktif', jenis: 'Core Switch' }
      ]
    },
    '1-4': { // Stasiun Lempuyangan - Access Point WiFi
      perangkatNama: 'Access Point WiFi',
      lokasiNama: 'Stasiun Lempuyangan',
      total: 6,
      aktif: 5,
      nonAktif: 1,
      items: [
        { id: 1, nama: 'AP_WiFi_SL_01', lokasi: 'Lantai 1', status: 'aktif', jenis: 'Access Point WiFi' },
        { id: 2, nama: 'AP_WiFi_SL_02', lokasi: 'Lantai 2', status: 'aktif', jenis: 'Access Point WiFi' },
        { id: 3, nama: 'AP_WiFi_SL_03', lokasi: 'Peron', status: 'aktif', jenis: 'Access Point WiFi' },
        { id: 4, nama: 'AP_WiFi_SL_04', lokasi: 'Ruang Tunggu', status: 'aktif', jenis: 'Access Point WiFi' },
        { id: 5, nama: 'AP_WiFi_SL_05', lokasi: 'Area Kantor', status: 'aktif', jenis: 'Access Point WiFi' },
        { id: 6, nama: 'AP_WiFi_SL_06', lokasi: 'Outdoor', status: 'tidak_aktif', jenis: 'Access Point WiFi' }
      ]
    },
    '2-1': { // Stasiun Tugu - CCTV IP Camera
      perangkatNama: 'CCTV IP Camera',
      lokasiNama: 'Stasiun Tugu Yogyakarta',
      total: 26,
      aktif: 24,
      nonAktif: 2,
      items: [
        { id: 1, nama: 'CCTV_ST_01', lokasi: 'Pintu Masuk Utama', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 2, nama: 'CCTV_ST_02', lokasi: 'Pintu Masuk Samping', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 3, nama: 'CCTV_ST_03', lokasi: 'Hall Utama', status: 'tidak_aktif', jenis: 'CCTV IP Camera' },
        { id: 4, nama: 'CCTV_ST_04', lokasi: 'Peron 1', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 5, nama: 'CCTV_ST_05', lokasi: 'Peron 2', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 6, nama: 'CCTV_ST_06', lokasi: 'Peron 3', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 7, nama: 'CCTV_ST_07', lokasi: 'Peron 4', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 8, nama: 'CCTV_ST_08', lokasi: 'Ruang Tunggu A', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 9, nama: 'CCTV_ST_09', lokasi: 'Ruang Tunggu B', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 10, nama: 'CCTV_ST_10', lokasi: 'Loket Tiket 1', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 11, nama: 'CCTV_ST_11', lokasi: 'Loket Tiket 2', status: 'tidak_aktif', jenis: 'CCTV IP Camera' },
        { id: 12, nama: 'CCTV_ST_12', lokasi: 'Area Kantor', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 13, nama: 'CCTV_ST_13', lokasi: 'Koridor Utama', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 14, nama: 'CCTV_ST_14', lokasi: 'Tangga Darurat 1', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 15, nama: 'CCTV_ST_15', lokasi: 'Tangga Darurat 2', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 16, nama: 'CCTV_ST_16', lokasi: 'Area Lift', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 17, nama: 'CCTV_ST_17', lokasi: 'Area Parkir Level 1', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 18, nama: 'CCTV_ST_18', lokasi: 'Area Parkir Level 2', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 19, nama: 'CCTV_ST_19', lokasi: 'Pintu Keluar', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 20, nama: 'CCTV_ST_20', lokasi: 'Basement 1', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 21, nama: 'CCTV_ST_21', lokasi: 'Basement 2', status: 'tidak_aktif', jenis: 'CCTV IP Camera' },
        { id: 22, nama: 'CCTV_ST_22', lokasi: 'Ruang Mesin', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 23, nama: 'CCTV_ST_23', lokasi: 'Area Outdoor 1', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 24, nama: 'CCTV_ST_24', lokasi: 'Area Outdoor 2', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 25, nama: 'CCTV_ST_25', lokasi: 'Peron 5', status: 'aktif', jenis: 'CCTV IP Camera' },
        { id: 26, nama: 'CCTV_ST_26', lokasi: 'Peron 6', status: 'aktif', jenis: 'CCTV IP Camera' }
      ]
    },
    // Data untuk semua perangkat per lokasi (tanpa perangkatId)
    '1': { // Stasiun Lempuyangan - Semua Perangkat
      perangkatNama: 'Semua Perangkat',
      lokasiNama: 'Stasiun Lempuyangan',
      items: [] // Akan digabungkan dari semua perangkat
    },
    'default': {
      perangkatNama: 'Perangkat',
      lokasiNama: 'Lokasi',
      total: 0,
      aktif: 0,
      nonAktif: 0,
      items: []
    }
  }

  // Initialize data dan items
  useEffect(() => {
    let data;
    let items = [];

    if (perangkatId) {
      // Jika ada perangkatId, ambil data perangkat spesifik
      data = DetailData[`${id}-${perangkatId}`] || DetailData.default
      items = data.items || []
    } else {
      // Jika tidak ada perangkatId, gabungkan semua perangkat dari lokasi
      const lokasiName = id === '1' ? 'Stasiun Lempuyangan' : 'Stasiun Tugu Yogyakarta'
      const allPerangkatKeys = Object.keys(DetailData).filter(key => key.startsWith(`${id}-`))
      
      // Gabungkan semua items dari semua perangkat
      items = allPerangkatKeys.flatMap(key => DetailData[key].items || [])
      
      data = {
        perangkatNama: 'Semua Perangkat',
        lokasiNama: lokasiName,
        items: items
      }
    }

    // Hitung total, aktif, nonAktif dari items
    const total = items.length
    const aktif = items.filter(item => item.status === 'aktif').length
    const nonAktif = total - aktif

    setCurrentData({
      ...data,
      total,
      aktif,
      nonAktif
    })
    setAllItems(items)
  }, [id, perangkatId])

  // Extract unique jenis perangkat untuk filter
  const uniquePerangkat = [...new Set(allItems.map(item => item.jenis))].filter(Boolean)

  // Filter items berdasarkan search, perangkat, dan status
  const filteredItems = allItems.filter(item => {
    const matchSearch = item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        item.lokasi.toLowerCase().includes(searchQuery.toLowerCase())
    const matchPerangkat = filterPerangkat === 'all' || item.jenis === filterPerangkat
    const matchStatus = filterStatus === 'all' || item.status === filterStatus
    
    return matchSearch && matchPerangkat && matchStatus
  })

  const handleAddItem = () => {
    setFormData({ nama: '', lokasi: '', status: 'aktif' })
    setEditingItem(null)
    setShowAddModal(true)
  }

  const handleEditItem = (item) => {
    setFormData({ ...item })
    setEditingItem(item.id)
    setShowEditModal(true)
  }

  const handleSaveItem = () => {
    if (!formData.nama || !formData.lokasi) {
      alert('Semua field harus diisi!')
      return
    }

    if (editingItem) {
      setAllItems(allItems.map(item => 
        item.id === editingItem ? { ...formData, id: editingItem } : item
      ))
      console.log('Update item:', formData)
    } else {
      const newItem = {
        id: Math.max(...allItems.map(i => i.id), 0) + 1,
        ...formData
      }
      setAllItems([...allItems, newItem])
      console.log('Add item:', newItem)
    }

    setShowAddModal(false)
    setShowEditModal(false)
    setFormData({ nama: '', lokasi: '', status: 'aktif' })
  }

  const handleDeleteItem = (itemId) => {
    if (window.confirm('Apakah Anda yakin ingin menghapus item ini?')) {
      setAllItems(allItems.filter(item => item.id !== itemId))
      console.log('Delete item:', itemId)
    }
  }

  if (!currentData) {
    return (
      <div className="detail-Detail-container">
        <div className="Detail-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <span>&lt;</span>
          </button>
          <h1 className="Detail-title">Memuat data...</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-Detail-container">
      {/* Header */}
      <div className="Detail-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <div className="header-info">
          <h1 className="Detail-title">{currentData.perangkatNama}</h1>
          <p className="Detail-subtitle">{currentData.lokasiNama}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="Detail-content">
        {/* Stats Section */}
        <div className="Detail-stats-section">
          <div className="Detail-stat-card">
            <div className="Detail-stat-icon total">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="Detail-stat-info">
              <p className="Detail-stat-label">Total</p>
              <p className="Detail-stat-value">{currentData.total}</p>
            </div>
          </div>

          <div className="Detail-stat-card">
            <div className="Detail-stat-icon aktif">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="Detail-stat-info">
              <p className="Detail-stat-label">Aktif</p>
              <p className="Detail-stat-value">{currentData.aktif}</p>
            </div>
          </div>

          <div className="Detail-stat-card">
            <div className="Detail-stat-icon nonaktif">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="Detail-stat-info">
              <p className="Detail-stat-label">Non-Aktif</p>
              <p className="Detail-stat-value">{currentData.nonAktif}</p>
            </div>
          </div>
        </div>

        {/* List Section */}
        <div className="Detail-list-section">
          <div className="list-header">
            <h2 className="list-title">Daftar Item</h2>
            <button className="add-btn" onClick={handleAddItem}>
              <span className="plus-icon">+</span>
              <span className="add-text">Tambah</span>
            </button>
          </div>

          {/* Filter Controls */}
          <div className="filter-controls">
            <div className="filter-group">
              <label className="filter-label">Cari</label>
              <input
                type="text"
                placeholder="Cari nama atau lokasi..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="filter-input"
              />
            </div>
            
            {!perangkatId && uniquePerangkat.length > 0 && (
              <div className="filter-group">
                <label className="filter-label">Jenis Perangkat</label>
                <select
                  value={filterPerangkat}
                  onChange={(e) => setFilterPerangkat(e.target.value)}
                  className="filter-select"
                >
                  <option value="all">Semua Perangkat</option>
                  {uniquePerangkat.map(jenis => (
                    <option key={jenis} value={jenis}>{jenis}</option>
                  ))}
                </select>
              </div>
            )}
            
            <div className="filter-group">
              <label className="filter-label">Status</label>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="filter-select"
              >
                <option value="all">Semua Status</option>
                <option value="aktif">Aktif</option>
                <option value="tidak_aktif">Tidak Aktif</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="table-wrapper">
            <table className="Detail-table">
              <thead>
                <tr>
                  <th>Nama Perangkat</th>
                  <th>Lokasi</th>
                  <th>Status</th>
                  <th>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {filteredItems.length > 0 ? (
                  filteredItems.map(item => (
                    <tr key={item.id}>
                      <td className="nama-cell">{item.nama}</td>
                      <td className="lokasi-cell">{item.lokasi}</td>
                      <td className="status-cell">
                        <span className={`status-badge ${item.status}`}>
                          {item.status === 'aktif' ? 'Aktif' : 'Tidak Aktif'}
                        </span>
                      </td>
                      <td className="aksi-cell">
                        {/* Desktop: 2 buttons */}
                        <div className="action-buttons-desktop">
                          <button 
                            className="action-btn edit-btn"
                            onClick={() => handleEditItem(item)}
                            title="Edit"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <path d="M12 20h9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Edit</span>
                          </button>
                          <button 
                            className="action-btn delete-btn"
                            onClick={() => handleDeleteItem(item.id)}
                            title="Hapus"
                          >
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                              <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Hapus</span>
                          </button>
                        </div>

                        {/* Mobile: 1 button with dropdown */}
                        <div className="action-menu-wrapper">
                          <button 
                            className="action-menu-btn"
                            onClick={() => setActiveMenuId(activeMenuId === item.id ? null : item.id)}
                          >
                            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                              <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                              <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Edit</span>
                          </button>
                          
                          {activeMenuId === item.id && (
                            <div className="action-dropdown">
                              <button 
                                className="dropdown-item edit-item"
                                onClick={() => {
                                  handleEditItem(item)
                                  setActiveMenuId(null)
                                }}
                              >
                                Edit
                              </button>
                              <button 
                                className="dropdown-item delete-item"
                                onClick={() => {
                                  handleDeleteItem(item.id)
                                  setActiveMenuId(null)
                                }}
                              >
                                Hapus
                              </button>
                            </div>
                          )}
                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="empty-state">Tidak ada data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="Detail-modal-overlay" onClick={() => {
          setShowAddModal(false)
          setShowEditModal(false)
        }}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{editingItem ? 'Edit Item' : 'Tambah Item'}</h2>
              <button 
                className="modal-close"
                onClick={() => {
                  setShowAddModal(false)
                  setShowEditModal(false)
                }}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              <div className="form-group">
                <label>Nama Perangkat</label>
                <input
                  type="text"
                  placeholder="Masukkan nama perangkat"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label> Perangkat</label>
                <input
                  type="text"
                  placeholder="Masukkan jenis perangkat"
                  value={formData.jenis}
                  onChange={(e) => setFormData({ ...formData, jenis: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Lokasi</label>
                <input
                  type="text"
                  placeholder="Masukkan lokasi"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  className="form-input"
                />
              </div>

              <div className="form-group">
                <label>Status</label>
                <select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  className="form-select"
                >
                  <option value="aktif">Aktif</option>
                  <option value="tidak_aktif">Tidak Aktif</option>
                </select>
              </div>
            </div>

            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => {
                  setShowAddModal(false)
                  setShowEditModal(false)
                }}
              >
                Batal
              </button>
              <button 
                className="btn-save"
                onClick={handleSaveItem}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailInventaris
