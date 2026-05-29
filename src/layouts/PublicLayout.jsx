import { Navigate, Outlet } from 'react-router-dom'

export default function PublicLayout() {
  // Mengecek apakah ada token login tiruan di memori browser
  const isAuthenticated = localStorage.getItem('dummy_token') !== null

  // Jika user SUDAH login, paksa ke dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  // Jika belum login, silakan lihat halaman publik (Login/Register/Landing)
  return <Outlet />
}
