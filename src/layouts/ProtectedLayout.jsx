import { Navigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import DashboardLayout from './DashboardLayout'

export default function ProtectedLayout() {
  const { isAuthenticated, isLoading } = useAuth()

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-900 transition-colors duration-300">
        <div className="w-8 h-8 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />
  }

  // Jika sudah login, render DashboardLayout
  return <DashboardLayout />
}
