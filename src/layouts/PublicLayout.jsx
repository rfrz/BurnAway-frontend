import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../contexts/AuthContext'

export default function PublicLayout() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // Jika user SUDAH login, paksa ke dashboard
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />
  }

  // Jika belum login, silakan lihat halaman publik (Login/Register/Landing)
  return <Outlet />
}
