import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'
import { useLanguage } from '../hooks/useLanguage.js'

export default function AuthPage() {
  const location = useLocation()
  const { t } = useLanguage()
  
  // State untuk melacak tab mana yang sedang aktif
  const [activeTab, setActiveTab] = useState(location.pathname === '/register' ? 'register' : 'login')

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0f172a] p-4 transition-colors duration-300">
      
      {/* Logo Link to Home */}
      <Link to="/" className="flex items-center gap-3 mb-8 hover:scale-105 transition-transform" aria-label="BurnAway home">
        <img
          src={`${import.meta.env.BASE_URL}assets/logo-burnaway.png`}
          alt="BurnAway"
          className="w-12 h-12 md:w-14 md:h-14 object-contain shrink-0 drop-shadow-lg"
        />
        <div className="text-3xl font-bold tracking-tighter text-slate-900 dark:text-white">
          Burn<span className="text-brand">Away</span>
        </div>
      </Link>

      {/* Kotak Form (Card) */}
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-3xl shadow-xl dark:shadow-none border border-transparent dark:border-slate-700 p-8 transition-colors duration-300">
        
        {/* Latar Tab (Toggle)*/ }
        <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1.5 rounded-2xl mb-6 transition-colors">
          <button
            onClick={() => setActiveTab('login')}
            className={`w-1/2 py-2 text-center rounded-xl font-bold transition-all ${
              activeTab === 'login' 
                ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {t('nav.login') || 'Masuk'}
          </button>
          
          <button
            onClick={() => setActiveTab('register')}
            className={`w-1/2 py-2 text-center rounded-xl font-bold transition-all ${
              activeTab === 'register' 
                ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            {t('nav.register') || 'Daftar'}
          </button>
        </div>

        {/* Conditional Rendering: Render form sesuai isi state */}
        {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}

      </div>
    </div>
  )
}
