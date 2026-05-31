import { Link } from 'react-router-dom'
import { useLanguage } from '../contexts/LanguageContext.jsx'
import { useAuth } from '../contexts/AuthContext.jsx'
import ThemeToggle from './ThemeToggle.jsx'

export default function Navbar() {
  const { t, changeLanguage, language } = useLanguage()
  const { isAuthenticated, logout } = useAuth()

  return (
    <nav className="flex justify-between items-center h-20 px-6 w-full max-w-7xl mx-auto">
      
      {/* KIRI: Logo */}
      <Link to="/" className="flex items-center gap-3 group" aria-label="BurnAway home">
        <img
          src="/assets/logo-burnaway.png"
          alt="BurnAway"
          className="w-10 h-10 object-contain shrink-0 drop-shadow-sm"
        />
        <div className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
          Burn<span className="text-brand">Away</span>
        </div>
      </Link>
      
      {/* TENGAH: Tautan Teks (Hanya muncul di layar laptop/lebar) */}
      <div className="hidden md:flex gap-8 items-center text-sm font-medium">
        <a href="#features" className="hover:text-brand transition-colors text-slate-600 dark:text-slate-300">Features</a>
        <a href="#how" className="hover:text-brand transition-colors text-slate-600 dark:text-slate-300">How it Works</a>
        <a href="#about" className="hover:text-brand transition-colors text-slate-600 dark:text-slate-300">About Us</a>
      </div>

      {/* KANAN: Pengaturan & Auth (SELALU MUNCUL di semua ukuran layar) */}
      <div className="flex items-center gap-3 md:gap-4 text-sm font-medium">
        
        {/* Tombol Tema & Bahasa ditaruh di sini agar tidak ikut tersembunyi */}
        <ThemeToggle />

        <select 
          value={language} 
          onChange={(e) => changeLanguage(e.target.value)}
          className="border border-slate-300 dark:border-slate-700 rounded-lg py-1.5 px-2 bg-transparent text-sm font-semibold text-slate-700 dark:text-slate-300 cursor-pointer outline-none"
        >
          <option value="en">EN</option>
          <option value="id">ID</option>
        </select>

        {/* Tombol Masuk & Daftar */}
        {isAuthenticated ? (
          <>
            <button 
              onClick={logout} 
              className="font-semibold text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 transition-colors"
            >
              {t('nav.logout')}
            </button>
            <Link 
              to="/dashboard" 
              className="bg-brand text-white font-bold px-4 py-2 rounded-xl hover:bg-brand-hover transition-colors shadow-md text-xs md:text-sm"
            >
              {t('nav.dashboard')}
            </Link>
          </>
        ) : (
          <>
            <Link to="/login" className="font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors">
              {t('nav.login')}
            </Link>
            <Link to="/register" className="bg-brand text-white font-bold px-4 py-2 rounded-xl hover:bg-brand-hover transition-colors shadow-md text-xs md:text-sm">
              {t('nav.register')}
            </Link>
          </>
        )}
      </div>
    </nav>
  )
}