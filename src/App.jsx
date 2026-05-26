import { Routes, Route } from 'react-router-dom'

// Import semua cangkang halaman yang sudah kita buat sebelumnya
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import PredictPage from './pages/PredictPage'
import NotFound from './pages/NotFound'

export default function App() {
  return (
    <Routes>
      {/* Rute Publik */}
      <Route path="/" element={<LandingPage />} />
      <Route path="/login" element={<AuthPage />} />
      <Route path="/register" element={<AuthPage />} />

      {/* Rute Aplikasi Utama */}
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/predict" element={<PredictPage />} />

      {/* Rute 404 - Akan menangkap URL acak yang tidak terdaftar di atas */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}