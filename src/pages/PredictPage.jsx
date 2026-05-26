import { useState } from 'react'
import { Link } from 'react-router-dom'

export default function PredictPage() {
  // Menginisialisasi state untuk menampung seluruh data input
  const [formData, setFormData] = useState({
    sleepHours: '',
    stressLevel: '',
    workHours: ''
  })

  // Fungsi untuk memperbarui state secara dinamis saat user mengetik
  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Fungsi yang dieksekusi saat tombol submit ditekan
  const handleSubmit = (e) => {
    e.preventDefault() // Mencegah browser me-refresh halaman
    console.log("Payload data siap dikirim ke API:", formData)
    alert("Data berhasil direkam! Silakan buka Inspect Element -> Console untuk melihat struktur datanya.")
  }

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-xl p-8 relative">
        
        {/* Tombol Navigasi Kembali */}
        <Link 
          to="/dashboard" 
          className="absolute top-6 left-6 text-slate-400 hover:text-slate-600 font-bold transition-colors"
        >
          &larr; Kembali
        </Link>

        <div className="text-center mb-8 mt-6">
          <h2 className="text-2xl font-bold text-slate-800">Catat Metrik Harian</h2>
          <p className="text-sm text-slate-500 mt-2">
            Masukkan data historis untuk dianalisis oleh sistem.
          </p>
        </div>

        {/* Formulir Input Terkontrol */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1 block">Jam Tidur (Jam)</label>
            <input 
              type="number" 
              name="sleepHours"
              value={formData.sleepHours}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500 outline-none transition-all"
              placeholder="Contoh: 7"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1 block">Tingkat Stres (1-10)</label>
            <input 
              type="number" 
              name="stressLevel"
              min="1" max="10"
              value={formData.stressLevel}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500 outline-none transition-all"
              placeholder="Skala 1 s/d 10"
              required
            />
          </div>

          <div>
            <label className="text-sm font-semibold text-slate-700 mb-1 block">Durasi Kerja/Belajar (Jam)</label>
            <input 
              type="number" 
              name="workHours"
              value={formData.workHours}
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-slate-500 outline-none transition-all"
              placeholder="Contoh: 8"
              required
            />
          </div>

          <button 
            type="submit"
            className="w-full mt-4 bg-slate-800 text-white font-bold py-3 rounded-lg hover:bg-slate-900 transition-colors shadow-md"
          >
            Analisis Data
          </button>
        </form>
      </div>
    </div>
  )
}