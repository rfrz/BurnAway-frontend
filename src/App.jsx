import { Routes, Route } from 'react-router-dom'

// Import Halaman
import LandingPage from './pages/LandingPage'
import AuthPage from './pages/AuthPage'
import Dashboard from './pages/Dashboard'
import PredictPage from './pages/PredictPage'
import ProfilePage from './pages/ProfilePage'
import NotFound from './pages/NotFound'

// Import Layouts
import ProtectedLayout from './layouts/ProtectedLayout'
import PublicLayout from './layouts/PublicLayout'

export default function App() {
  return (
    // Tambahan: Pembungkus global agar fondasi seluruh aplikasi merespons mode gelap/terang secara mulus
    <div className="min-h-screen w-full bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <Routes>
        {/* Rute Bebas Murni (Landing Page tetap bisa diakses siapa saja) */}
        <Route path="/" element={<LandingPage />} />

        {/* Rute Publik Terbatas (Hanya untuk yang BELUM login) */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<AuthPage />} />
          <Route path="/register" element={<AuthPage />} />
        </Route>

        {/* Rute Terkunci (Hanya untuk yang SUDAH login) */}
        <Route element={<ProtectedLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/predict" element={<PredictPage />} />
          <Route path="/profile" element={<ProfilePage />} />
        </Route>

        {/* Penangkap URL Nyasar */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </div>
  )
}
