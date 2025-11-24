import React, { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import './DetailAset.css'

function DetailAset() {
  const navigate = useNavigate()
  const { id } = useParams()
  const [showDetailModal, setShowDetailModal] = useState(false)
  const [showEditMenu, setShowEditMenu] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [editMode, setEditMode] = useState(null) // 'foto', 'jumlah', 'status'
  const [editData, setEditData] = useState({})
  const [localData, setLocalData] = useState(null)
  const [selectedPerangkat, setSelectedPerangkat] = useState(null)
  const [showPerangkatPopup, setShowPerangkatPopup] = useState(false)

  // Control body overflow ketika popup muncul
  useEffect(() => {
    if (showEditModal || showPerangkatPopup) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }

    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [showEditModal, showPerangkatPopup])

  // Data lokasi berdasarkan ID
  const locationData = {
    1: {
      name: 'Stasiun Lempuyangan',
      image: 'https://images.unsplash.com/photo-1561361513-e8d53f0e6f67?w=500&h=300&fit=crop',
      totalPerangkat: 200,
      aktif: 170,
      nonAktif: 30,
      perangkat: [
        { id: 1, nama: 'CCTV IP Camera', aktif: 18, tidakAktif: 2, status: 'aktif' },
        { id: 2, nama: 'NVR Server', aktif: 2, tidakAktif: 0, status: 'aktif' },
        { id: 3, nama: 'Core Switch', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 4, nama: 'Access Point WiFi', aktif: 5, tidakAktif: 1, status: 'aktif' },
        { id: 5, nama: 'Firewall UTM', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 6, nama: 'Server Lokal', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 7, nama: 'PIDS Monitor', aktif: 8, tidakAktif: 1, status: 'aktif' },
        { id: 8, nama: 'KP2T Vending Machine', aktif: 3, tidakAktif: 0, status: 'aktif' },
        { id: 9, nama: 'PC Ticketing', aktif: 5, tidakAktif: 1, status: 'aktif' },
        { id: 10, nama: 'IP Phone VoIP', aktif: 12, tidakAktif: 2, status: 'aktif' },
        { id: 11, nama: 'Laptop Operasional', aktif: 8, tidakAktif: 2, status: 'aktif' },
        { id: 12, nama: 'Printer & Scanner', aktif: 6, tidakAktif: 1, status: 'aktif' },
        { id: 13, nama: 'HT Digital', aktif: 10, tidakAktif: 3, status: 'aktif' },
        { id: 14, nama: 'UPS System', aktif: 4, tidakAktif: 1, status: 'aktif' },
        { id: 15, nama: 'Router / Gateway', aktif: 2, tidakAktif: 2, status: 'tidak_aktif' }
      ]
    },
    2: {
      name: 'Stasiun Tugu Yogyakarta',
      image: 'https://images.unsplash.com/photo-1561361513-e8d53f0e6f67?w=500&h=300&fit=crop',
      totalPerangkat: 250,
      aktif: 210,
      nonAktif: 40,
      perangkat: [
        { id: 1, nama: 'CCTV IP Camera', aktif: 24, tidakAktif: 2, status: 'aktif' },
        { id: 2, nama: 'NVR Server', aktif: 2, tidakAktif: 0, status: 'aktif' },
        { id: 3, nama: 'Core Switch', aktif: 2, tidakAktif: 0, status: 'aktif' },
        { id: 4, nama: 'Access Point WiFi', aktif: 8, tidakAktif: 1, status: 'aktif' },
        { id: 5, nama: 'Firewall UTM', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 6, nama: 'Server Lokal', aktif: 2, tidakAktif: 0, status: 'aktif' },
        { id: 7, nama: 'PIDS Monitor', aktif: 10, tidakAktif: 1, status: 'aktif' },
        { id: 8, nama: 'KP2T Vending Machine', aktif: 5, tidakAktif: 1, status: 'aktif' },
        { id: 9, nama: 'PC Ticketing', aktif: 8, tidakAktif: 1, status: 'aktif' },
        { id: 10, nama: 'IP Phone VoIP', aktif: 16, tidakAktif: 2, status: 'aktif' },
        { id: 11, nama: 'Laptop Operasional', aktif: 11, tidakAktif: 3, status: 'aktif' },
        { id: 12, nama: 'Printer & Scanner', aktif: 8, tidakAktif: 2, status: 'aktif' },
        { id: 13, nama: 'HT Digital', aktif: 14, tidakAktif: 4, status: 'aktif' },
        { id: 14, nama: 'UPS System', aktif: 5, tidakAktif: 1, status: 'aktif' },
        { id: 15, nama: 'Modem LTE Backup', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 16, nama: 'Router / Gateway', aktif: 3, tidakAktif: 4, status: 'tidak_aktif' }
      ]
    },
    3: {
      name: 'Kantor Daop 6 Yogyakarta',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&h=300&fit=crop',
      totalPerangkat: 120,
      aktif: 100,
      nonAktif: 20,
      perangkat: [
        { id: 1, nama: 'Server Central', aktif: 2, tidakAktif: 0, status: 'aktif' },
        { id: 2, nama: 'Server Virtualisasi', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 3, nama: 'Storage NAS', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 4, nama: 'Firewall UTM', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 5, nama: 'Core Switch L3', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 6, nama: 'UPS Besar', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 7, nama: 'CCTV Monitoring', aktif: 8, tidakAktif: 1, status: 'aktif' },
        { id: 8, nama: 'NVR Monitoring', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 9, nama: 'PC Staf', aktif: 18, tidakAktif: 2, status: 'aktif' },
        { id: 10, nama: 'Laptop Manajemen', aktif: 8, tidakAktif: 1, status: 'aktif' },
        { id: 11, nama: 'Printer & Scanner', aktif: 5, tidakAktif: 1, status: 'aktif' },
        { id: 12, nama: 'IP Phone PBX', aktif: 10, tidakAktif: 1, status: 'aktif' },
        { id: 13, nama: 'Digital Signage', aktif: 2, tidakAktif: 0, status: 'aktif' },
        { id: 14, nama: 'Access Control', aktif: 4, tidakAktif: 1, status: 'aktif' },
        { id: 15, nama: 'Server Monitoring', aktif: 1, tidakAktif: 1, status: 'tidak_aktif' }
      ]
    },
    4: {
      name: 'Gudang Logistik Yogyakarta',
      image: 'https://images.unsplash.com/photo-1553531088-2f6b1d69f962?w=500&h=300&fit=crop',
      totalPerangkat: 85,
      aktif: 70,
      nonAktif: 15,
      perangkat: [
        { id: 1, nama: 'CCTV Indoor / Outdoor', aktif: 12, tidakAktif: 1, status: 'aktif' },
        { id: 2, nama: 'NVR System', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 3, nama: 'Barcode Scanner', aktif: 5, tidakAktif: 1, status: 'aktif' },
        { id: 4, nama: 'Thermal Label Printer', aktif: 3, tidakAktif: 0, status: 'aktif' },
        { id: 5, nama: 'PC Operasional', aktif: 5, tidakAktif: 1, status: 'aktif' },
        { id: 6, nama: 'Switch Jaringan', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 7, nama: 'Access Point WiFi', aktif: 2, tidakAktif: 0, status: 'aktif' },
        { id: 8, nama: 'Router', aktif: 1, tidakAktif: 1, status: 'tidak_aktif' },
        { id: 9, nama: 'Handheld Tablet', aktif: 4, tidakAktif: 0, status: 'aktif' },
        { id: 10, nama: 'Timbangan Digital', aktif: 3, tidakAktif: 1, status: 'aktif' },
        { id: 11, nama: 'Door Access Control', aktif: 2, tidakAktif: 0, status: 'aktif' },
        { id: 12, nama: 'UPS System', aktif: 2, tidakAktif: 0, status: 'aktif' },
        { id: 13, nama: 'Printer Dokumen', aktif: 2, tidakAktif: 1, status: 'tidak_aktif' }
      ]
    },
    5: {
      name: 'Stasiun Maguwo',
      image: 'https://images.unsplash.com/photo-1561361513-e8d53f0e6f67?w=500&h=300&fit=crop',
      totalPerangkat: 95,
      aktif: 80,
      nonAktif: 15,
      perangkat: [
        { id: 1, nama: 'CCTV IP Camera', aktif: 12, tidakAktif: 1, status: 'aktif' },
        { id: 2, nama: 'NVR Server', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 3, nama: 'Core Switch', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 4, nama: 'Access Point WiFi', aktif: 3, tidakAktif: 0, status: 'aktif' },
        { id: 5, nama: 'Firewall UTM', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 6, nama: 'PIDS Monitor', aktif: 5, tidakAktif: 1, status: 'aktif' },
        { id: 7, nama: 'PC Ticketing', aktif: 4, tidakAktif: 0, status: 'aktif' },
        { id: 8, nama: 'IP Phone VoIP', aktif: 7, tidakAktif: 1, status: 'aktif' },
        { id: 9, nama: 'Laptop Operasional', aktif: 6, tidakAktif: 1, status: 'aktif' },
        { id: 10, nama: 'Printer & Scanner', aktif: 4, tidakAktif: 1, status: 'aktif' },
        { id: 11, nama: 'HT Digital', aktif: 9, tidakAktif: 2, status: 'aktif' },
        { id: 12, nama: 'UPS System', aktif: 3, tidakAktif: 1, status: 'aktif' },
        { id: 13, nama: 'Router / Gateway', aktif: 2, tidakAktif: 2, status: 'tidak_aktif' }
      ]
    },
    6: {
      name: 'PJL Lempuyangan',
      image: 'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=500&h=300&fit=crop',
      totalPerangkat: 60,
      aktif: 50,
      nonAktif: 10,
      perangkat: [
        { id: 1, nama: 'CCTV Perlintasan', aktif: 6, tidakAktif: 1, status: 'aktif' },
        { id: 2, nama: 'CCTV PTZ', aktif: 2, tidakAktif: 0, status: 'aktif' },
        { id: 3, nama: 'Radio Komunikasi HT', aktif: 8, tidakAktif: 2, status: 'aktif' },
        { id: 4, nama: 'IP Phone', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 5, nama: 'Controller Box PLC', aktif: 1, tidakAktif: 0, status: 'aktif' },
        { id: 6, nama: 'Modem/ONT Fiber', aktif: 1, tidakAktif: 1, status: 'tidak_aktif' },
        { id: 7, nama: 'Mini UPS Palang', aktif: 3, tidakAktif: 0, status: 'aktif' },
        { id: 8, nama: 'Lampu & Sensor', aktif: 8, tidakAktif: 1, status: 'aktif' },
        { id: 9, nama: 'Panel Kontrol', aktif: 2, tidakAktif: 0, status: 'aktif' },
        { id: 10, nama: 'Smart Controller', aktif: 2, tidakAktif: 1, status: 'tidak_aktif' }
      ]
    }
  }

  const data = localData || locationData[id] || locationData[1]

  const handleEditClick = (mode) => {
    setEditMode(mode)
    setShowEditModal(true)
    setShowEditMenu(false)
    
    if (mode === 'foto') {
      setEditData({ image: data.image })
    } else if (mode === 'jumlah') {
      setEditData({ 
        totalPerangkat: data.totalPerangkat,
        aktif: data.aktif,
        nonAktif: data.nonAktif
      })
    } else if (mode === 'status') {
      setEditData({ 
        perangkat: data.perangkat.map(p => ({ ...p }))
      })
    }
  }

  const handleSaveEdit = () => {
    const updatedData = { ...data, ...editData }
    if (editMode === 'jumlah') {
      updatedData.perangkat = data.perangkat
    }
    setLocalData(updatedData)
    setShowEditModal(false)
    setEditMode(null)
  }

  const handleInputChange = (field, value) => {
    setEditData(prev => ({
      ...prev,
      [field]: value
    }))
  }

  const handlePerangkatChange = (perangkatId, field, value) => {
    setEditData(prev => ({
      ...prev,
      perangkat: prev.perangkat.map(p => 
        p.id === perangkatId ? { ...p, [field]: value } : p
      )
    }))
  }

  const handlePerangkatClick = (perangkat) => {
    setSelectedPerangkat(perangkat)
    setShowPerangkatPopup(true)
  }

  return (
    <div className="detail-aset-container">
      {/* Header */}
      <div className="detail-aset-header">
        <button className="back-button" onClick={() => navigate('/home')}>
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <path d="M15 18l-6-6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </button>
        <h1>{data.name}</h1>
        
        {/* Edit Menu Button */}
        <div className="header-menu-container">
          <button 
            className="menu-button"
            onClick={() => setShowEditMenu(!showEditMenu)}
            title="Edit"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <circle cx="12" cy="5" r="2" fill="currentColor"/>
              <circle cx="12" cy="12" r="2" fill="currentColor"/>
              <circle cx="12" cy="19" r="2" fill="currentColor"/>
            </svg>
          </button>
          
          {showEditMenu && (
            <div className="dropdown-menu">
              <button onClick={() => handleEditClick('foto')} className="menu-item">
                <span>📷</span> Update Foto
              </button>
              <button onClick={() => handleEditClick('jumlah')} className="menu-item">
                <span>📦</span> Edit Jumlah Perangkat
              </button>
              <button onClick={() => handleEditClick('status')} className="menu-item">
                <span>✓</span> Edit Status
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Main Content */}
      <div className="detail-aset-content">
        {/* Image and Stats Section */}
        <div className="image-stats-section">
          <div className="image-container">
            <img src={data.image} alt={data.name} />
            <div className="image-overlay">
            </div>
          </div>

          <div className="stats-section">
            <div className="stat-card total">
              <div className="stat-icon">📦</div>
              <div className="stat-info">
                <div className="stat-label">Total Perangkat</div>
                <div className="stat-value">{data.totalPerangkat}</div>
              </div>
            </div>

            <div className="stat-card aktif">
              <div className="stat-icon">✓</div>
              <div className="stat-info">
                <div className="stat-label">Aktif</div>
                <div className="stat-value">{data.aktif}</div>
              </div>
            </div>

            <div className="stat-card non-aktif">
              <div className="stat-icon">⚠</div>
              <div className="stat-info">
                <div className="stat-label">Non-Aktif</div>
                <div className="stat-value">{data.nonAktif}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Daftar Perangkat Section */}
        <div className="daftar-perangkat-section">
          <div className="section-header">
            <h2>Daftar Perangkat</h2>
            <button 
              className="detail-button"
              onClick={() => setShowDetailModal(!showDetailModal)}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
              Lihat Detail
            </button>
          </div>

          <div className="perangkat-grid">
            {data.perangkat.map(item => (
              <div 
                key={item.id} 
                className="perangkat-card"
              >
                <div className="perangkat-name">{item.nama}</div>
                <div className="perangkat-jumlah">{item.aktif + item.tidakAktif} unit</div>
                <div className="perangkat-actions">
                  <button 
                    className="detail-btn"
                    onClick={() => navigate(`/location/${id}/perangkat/${item.id}`)}
                    title="Lihat Detail Inventaris"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                      <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button 
                    className="popup-btn"
                    onClick={() => {
                      setSelectedPerangkat(item)
                      setShowPerangkatPopup(true)
                    }}
                    title="Info Perangkat"
                  >
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
                      <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2"/>
                      <line x1="12" y1="16" x2="12" y2="12" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                      <line x1="12" y1="8" x2="12.01" y2="8" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      {showEditModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>
                {editMode === 'foto' && 'Update Foto'}
                {editMode === 'jumlah' && 'Edit Jumlah Perangkat'}
                {editMode === 'status' && 'Edit Status Perangkat'}
              </h2>
              <button 
                className="modal-close"
                onClick={() => setShowEditModal(false)}
              >
                ✕
              </button>
            </div>

            <div className="modal-body">
              {editMode === 'foto' && (
                <div className="edit-form">
                  <div className="form-group">
                    <label>URL Foto</label>
                    <input 
                      type="text"
                      value={editData.image || ''}
                      onChange={(e) => handleInputChange('image', e.target.value)}
                      placeholder="Masukkan URL foto..."
                    />
                  </div>
                  <div className="image-preview">
                    <img src={editData.image || data.image} alt="Preview" />
                  </div>
                </div>
              )}

              {editMode === 'jumlah' && (
                <div className="edit-form">
                  <div className="form-group">
                    <label>Total Perangkat</label>
                    <input 
                      type="number"
                      value={editData.totalPerangkat || 0}
                      onChange={(e) => handleInputChange('totalPerangkat', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Aktif</label>
                    <input 
                      type="number"
                      value={editData.aktif || 0}
                      onChange={(e) => handleInputChange('aktif', parseInt(e.target.value))}
                    />
                  </div>
                  <div className="form-group">
                    <label>Non-Aktif</label>
                    <input 
                      type="number"
                      value={editData.nonAktif || 0}
                      onChange={(e) => handleInputChange('nonAktif', parseInt(e.target.value))}
                    />
                  </div>
                </div>
              )}

              {editMode === 'status' && (
                <div className="edit-form">
                  <div className="perangkat-edit-list">
                    {editData.perangkat && editData.perangkat.map(item => (
                      <div key={item.id} className="perangkat-edit-item">
                        <div className="form-group">
                          <label>{item.nama}</label>
                          <div className="edit-controls">
                            <input 
                              type="number"
                              value={item.jumlah || 0}
                              onChange={(e) => handlePerangkatChange(item.id, 'jumlah', parseInt(e.target.value))}
                              placeholder="Jumlah"
                            />
                            <select 
                              value={item.status || 'aktif'}
                              onChange={(e) => handlePerangkatChange(item.id, 'status', e.target.value)}
                            >
                              <option value="aktif">Aktif</option>
                              <option value="tidak_aktif">Tidak Aktif</option>
                            </select>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            <div className="modal-footer">
              <button 
                className="btn-cancel"
                onClick={() => setShowEditModal(false)}
              >
                Batal
              </button>
              <button 
                className="btn-save"
                onClick={handleSaveEdit}
              >
                Simpan
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Perangkat Detail Popup */}
      {showPerangkatPopup && selectedPerangkat && (
        <div className="modal-overlay" onClick={() => setShowPerangkatPopup(false)}>
          <div className="perangkat-popup" onClick={(e) => e.stopPropagation()}>
            <div className="popup-header">
              <h3>{selectedPerangkat.nama}</h3>
              <button 
                className="popup-close"
                onClick={() => setShowPerangkatPopup(false)}
              >
                ✕
              </button>
            </div>
            
            <div className="popup-body">
              <div className="popup-detail-item">
                <div className="detail-label">Total Unit</div>
                <div className="detail-value">{selectedPerangkat.aktif + selectedPerangkat.tidakAktif}</div>
              </div>

              <div className="popup-detail-grid">
                <div className="popup-detail-item">
                  <div className="detail-label">Aktif</div>
                  <div className="detail-value aktif-count">{selectedPerangkat.aktif}</div>
                </div>
                <div className="popup-detail-item">
                  <div className="detail-label">Tidak Aktif</div>
                  <div className="detail-value nonaktif-count">{selectedPerangkat.tidakAktif}</div>
                </div>
              </div>

              <div className="popup-detail-item">
                <div className="detail-label">Persentase Aktif</div>
                <div className="progress-bar">
                  <div 
                    className={`progress-fill aktif`}
                    style={{ width: `${((selectedPerangkat.aktif / (selectedPerangkat.aktif + selectedPerangkat.tidakAktif)) * 100)}%` }}
                  ></div>
                </div>
                <div className="progress-text">
                  {Math.round((selectedPerangkat.aktif / (selectedPerangkat.aktif + selectedPerangkat.tidakAktif)) * 100)}% aktif
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default DetailAset
