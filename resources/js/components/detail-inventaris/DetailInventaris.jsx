import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './DetailInventaris.css'

function DetailInventaris() {
  const navigate = useNavigate()
  const { id, perangkatId } = useParams()
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editingItem, setEditingItem] = useState(null)
  const [searchQuery, setSearchQuery] = useState('')
  const [allItems, setAllItems] = useState([])
  const [formData, setFormData] = useState({
    nama: '',
    lokasi: '',
    status: 'aktif'
  })

  // Data inventaris per perangkat (struktur: '1-1' = lokasi 1, perangkat 1)
  const inventarisData = {
    '1-1': { // Stasiun Lempuyangan - CCTV IP Camera
      perangkatNama: 'CCTV IP Camera',
      lokasiNama: 'Stasiun Lempuyangan',
      total: 20,
      aktif: 18,
      nonAktif: 2,
      items: [
        { id: 1, nama: 'CCTV_01', lokasi: 'Pintu Masuk Utara 1', status: 'aktif' },
        { id: 2, nama: 'CCTV_02', lokasi: 'Pintu Masuk Utara 2', status: 'tidak_aktif' },
        { id: 3, nama: 'CCTV_03', lokasi: 'Pintu Masuk Barat', status: 'aktif' },
        { id: 4, nama: 'CCTV_04', lokasi: 'Peron 1', status: 'aktif' },
        { id: 5, nama: 'CCTV_05', lokasi: 'Peron 2', status: 'aktif' },
        { id: 6, nama: 'CCTV_06', lokasi: 'Peron 3', status: 'aktif' },
        { id: 7, nama: 'CCTV_07', lokasi: 'Ruang Tunggu', status: 'aktif' },
        { id: 8, nama: 'CCTV_08', lokasi: 'Loket Tiket', status: 'aktif' },
        { id: 9, nama: 'CCTV_09', lokasi: 'Area Kantor', status: 'aktif' },
        { id: 10, nama: 'CCTV_10', lokasi: 'Koridor Utama', status: 'aktif' },
        { id: 11, nama: 'CCTV_11', lokasi: 'Tangga Darurat 1', status: 'tidak_aktif' },
        { id: 12, nama: 'CCTV_12', lokasi: 'Tangga Darurat 2', status: 'aktif' },
        { id: 13, nama: 'CCTV_13', lokasi: 'Area Parkir', status: 'aktif' },
        { id: 14, nama: 'CCTV_14', lokasi: 'Pintu Keluar', status: 'aktif' },
        { id: 15, nama: 'CCTV_15', lokasi: 'Basement', status: 'aktif' },
        { id: 16, nama: 'CCTV_16', lokasi: 'Ruang Mesin', status: 'aktif' },
        { id: 17, nama: 'CCTV_17', lokasi: 'Area Outdoor 1', status: 'aktif' },
        { id: 18, nama: 'CCTV_18', lokasi: 'Area Outdoor 2', status: 'aktif' },
        { id: 19, nama: 'CCTV_19', lokasi: 'Peron 4', status: 'tidak_aktif' },
        { id: 20, nama: 'CCTV_20', lokasi: 'Peron 5', status: 'aktif' }
      ]
    },
    '1-2': { // Stasiun Lempuyangan - NVR Server
      perangkatNama: 'NVR Server',
      lokasiNama: 'Stasiun Lempuyangan',
      total: 2,
      aktif: 2,
      nonAktif: 0,
      items: [
        { id: 1, nama: 'NVR_SL_01', lokasi: 'Ruang Server 1', status: 'aktif' },
        { id: 2, nama: 'NVR_SL_02', lokasi: 'Ruang Server 2', status: 'aktif' }
      ]
    },
    '1-3': { // Stasiun Lempuyangan - Core Switch
      perangkatNama: 'Core Switch',
      lokasiNama: 'Stasiun Lempuyangan',
      total: 1,
      aktif: 1,
      nonAktif: 0,
      items: [
        { id: 1, nama: 'CS_SL_01', lokasi: 'Ruang Server', status: 'aktif' }
      ]
    },
    '1-4': { // Stasiun Lempuyangan - Access Point WiFi
      perangkatNama: 'Access Point WiFi',
      lokasiNama: 'Stasiun Lempuyangan',
      total: 6,
      aktif: 5,
      nonAktif: 1,
      items: [
        { id: 1, nama: 'AP_WiFi_SL_01', lokasi: 'Lantai 1', status: 'aktif' },
        { id: 2, nama: 'AP_WiFi_SL_02', lokasi: 'Lantai 2', status: 'aktif' },
        { id: 3, nama: 'AP_WiFi_SL_03', lokasi: 'Peron', status: 'aktif' },
        { id: 4, nama: 'AP_WiFi_SL_04', lokasi: 'Ruang Tunggu', status: 'aktif' },
        { id: 5, nama: 'AP_WiFi_SL_05', lokasi: 'Area Kantor', status: 'aktif' },
        { id: 6, nama: 'AP_WiFi_SL_06', lokasi: 'Outdoor', status: 'tidak_aktif' }
      ]
    },
    '2-1': { // Stasiun Tugu - CCTV IP Camera
      perangkatNama: 'CCTV IP Camera',
      lokasiNama: 'Stasiun Tugu Yogyakarta',
      total: 26,
      aktif: 24,
      nonAktif: 2,
      items: [
        { id: 1, nama: 'CCTV_ST_01', lokasi: 'Pintu Masuk Utama', status: 'aktif' },
        { id: 2, nama: 'CCTV_ST_02', lokasi: 'Pintu Masuk Samping', status: 'aktif' },
        { id: 3, nama: 'CCTV_ST_03', lokasi: 'Hall Utama', status: 'tidak_aktif' },
        { id: 4, nama: 'CCTV_ST_04', lokasi: 'Peron 1', status: 'aktif' },
        { id: 5, nama: 'CCTV_ST_05', lokasi: 'Peron 2', status: 'aktif' },
        { id: 6, nama: 'CCTV_ST_06', lokasi: 'Peron 3', status: 'aktif' },
        { id: 7, nama: 'CCTV_ST_07', lokasi: 'Peron 4', status: 'aktif' },
        { id: 8, nama: 'CCTV_ST_08', lokasi: 'Ruang Tunggu A', status: 'aktif' },
        { id: 9, nama: 'CCTV_ST_09', lokasi: 'Ruang Tunggu B', status: 'aktif' },
        { id: 10, nama: 'CCTV_ST_10', lokasi: 'Loket Tiket 1', status: 'aktif' },
        { id: 11, nama: 'CCTV_ST_11', lokasi: 'Loket Tiket 2', status: 'tidak_aktif' },
        { id: 12, nama: 'CCTV_ST_12', lokasi: 'Area Kantor', status: 'aktif' },
        { id: 13, nama: 'CCTV_ST_13', lokasi: 'Koridor Utama', status: 'aktif' },
        { id: 14, nama: 'CCTV_ST_14', lokasi: 'Tangga Darurat 1', status: 'aktif' },
        { id: 15, nama: 'CCTV_ST_15', lokasi: 'Tangga Darurat 2', status: 'aktif' },
        { id: 16, nama: 'CCTV_ST_16', lokasi: 'Area Lift', status: 'aktif' },
        { id: 17, nama: 'CCTV_ST_17', lokasi: 'Area Parkir Level 1', status: 'aktif' },
        { id: 18, nama: 'CCTV_ST_18', lokasi: 'Area Parkir Level 2', status: 'aktif' },
        { id: 19, nama: 'CCTV_ST_19', lokasi: 'Pintu Keluar', status: 'aktif' },
        { id: 20, nama: 'CCTV_ST_20', lokasi: 'Basement 1', status: 'aktif' },
        { id: 21, nama: 'CCTV_ST_21', lokasi: 'Basement 2', status: 'tidak_aktif' },
        { id: 22, nama: 'CCTV_ST_22', lokasi: 'Ruang Mesin', status: 'aktif' },
        { id: 23, nama: 'CCTV_ST_23', lokasi: 'Area Outdoor 1', status: 'aktif' },
        { id: 24, nama: 'CCTV_ST_24', lokasi: 'Area Outdoor 2', status: 'aktif' },
        { id: 25, nama: 'CCTV_ST_25', lokasi: 'Peron 5', status: 'aktif' },
        { id: 26, nama: 'CCTV_ST_26', lokasi: 'Peron 6', status: 'aktif' }
      ]
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

  const currentData = inventarisData[`${id}-${perangkatId}`] || inventarisData.default

  // Initialize items
  useEffect(() => {
    if (currentData && currentData.items) {
      setAllItems(currentData.items)
    } else {
      setAllItems([])
    }
  }, [id, perangkatId, currentData])

  const filteredItems = allItems.filter(item =>
    item.nama.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.lokasi.toLowerCase().includes(searchQuery.toLowerCase())
  )

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

  if (!currentData || currentData.items.length === 0) {
    return (
      <div className="detail-inventaris-container">
        <div className="inventaris-header">
          <button className="back-btn" onClick={() => navigate(-1)}>
            <span>&lt;</span>
          </button>
          <h1 className="inventaris-title">Data tidak ditemukan</h1>
        </div>
      </div>
    )
  }

  return (
    <div className="detail-inventaris-container">
      {/* Header */}
      <div className="inventaris-header">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <span>&lt;</span>
        </button>
        <div className="header-info">
          <h1 className="inventaris-title">{currentData.perangkatNama}</h1>
          <p className="inventaris-subtitle">{currentData.lokasiNama}</p>
        </div>
      </div>

      {/* Main Content */}
      <div className="inventaris-content">
        {/* Left Section - List */}
        <div className="inventaris-list-section">
          <div className="list-header">
            <h2 className="list-title">Daftar Item</h2>
            <button className="add-btn" onClick={handleAddItem}>
              <span className="plus-icon">+</span>
              <span className="add-text">Tambah</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Cari nama atau lokasi..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
          </div>

          {/* Table */}
          <div className="table-wrapper">
            <table className="inventaris-table">
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
                        <button 
                          className="action-btn edit-btn"
                          onClick={() => handleEditItem(item)}
                          title="Edit"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                        </button>
                        <button 
                          className="action-btn delete-btn"
                          onClick={() => handleDeleteItem(item.id)}
                          title="Delete"
                        >
                          <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                            <polyline points="3 6 5 6 21 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></polyline>
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <line x1="10" y1="11" x2="10" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
                            <line x1="14" y1="11" x2="14" y2="17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></line>
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="empty-state">Tidak ada data</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Section - Stats */}
        <div className="inventaris-stats-section">
          <div className="stat-card">
            <div className="stat-icon total">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <rect x="3" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="3" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                <rect x="14" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
                <rect x="3" y="14" width="7" height="7" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <div className="stat-info">
              <p className="stat-label">Total</p>
              <p className="stat-value">{currentData.total}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon aktif">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <polyline points="22 4 12 14.01 9 11.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <div className="stat-info">
              <p className="stat-label">Aktif</p>
              <p className="stat-value">{currentData.aktif}</p>
            </div>
          </div>

          <div className="stat-card">
            <div className="stat-icon nonaktif">
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                <line x1="12" y1="8" x2="12" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div className="stat-info">
              <p className="stat-label">Non-Aktif</p>
              <p className="stat-value">{currentData.nonAktif}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Add/Edit Modal */}
      {(showAddModal || showEditModal) && (
        <div className="modal-overlay" onClick={() => {
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
