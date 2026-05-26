import { Link } from 'react-router-dom'

export default function LandingPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 gap-6">
      <h1 className="text-3xl font-bold text-slate-800">
        Ini Halaman Landing Page
      </h1>
      
      {/* Tombol Navigasi Pintas */}
      <div className="flex gap-4">
        <Link 
          to="/login" 
          className="px-6 py-2 bg-sky-950 text-white rounded-lg hover:bg-sky-800 transition"
        >
          Masuk ke Login
        </Link>
        <Link 
          to="/dashboard" 
          className="px-6 py-2 bg-slate-300 text-slate-800 rounded-lg hover:bg-slate-400 transition"
        >
          Masuk ke Dashboard
        </Link>
      </div>
    </div>
  )
}