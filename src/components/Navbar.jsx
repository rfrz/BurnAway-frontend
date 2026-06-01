import { Link, useNavigate, useLocation } from 'react-router-dom'
import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '../hooks/useLanguage.js'
import { useAuth } from '../hooks/useAuth.js'
import ThemeToggle from './ThemeToggle.jsx'

export default function Navbar() {
  const { t, changeLanguage, language } = useLanguage()
  const { isAuthenticated, logout } = useAuth()
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const languageMenuRef = useRef(null)
  const mobileMenuRef = useRef(null)
  const navigate = useNavigate()
  const location = useLocation()

  const handleScroll = (e, id) => {
    e.preventDefault()
    setIsMobileMenuOpen(false)
    if (location.pathname !== '/') {
      navigate('/')
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
      }, 100)
    } else {
      document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    }
  }

  const languages = [
    { value: 'en', label: 'EN' },
    { value: 'id', label: 'ID' },
  ]

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageMenuRef.current && !languageMenuRef.current.contains(event.target)) {
        setIsLanguageOpen(false)
      }
      if (mobileMenuRef.current && !mobileMenuRef.current.contains(event.target)) {
        setIsMobileMenuOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="flex justify-between items-center h-20 px-6 w-full max-w-7xl mx-auto relative z-50">
      
      {/* KIRI: Logo */}
      <Link to="/" className="flex items-center gap-3 group" aria-label="BurnAway home">
        <img
          src={`${import.meta.env.BASE_URL}assets/logo-burnaway.png`}
          alt="BurnAway"
          className="w-10 h-10 object-contain shrink-0 drop-shadow-sm"
        />
        <div className="text-2xl font-bold tracking-tighter text-slate-900 dark:text-white">
          Burn<span className="text-brand">Away</span>
        </div>
      </Link>
      
      {/* TENGAH: Tautan Teks (Hanya muncul di layar laptop/lebar) */}
      <div className="hidden md:flex gap-8 items-center text-sm font-medium">
        <button onClick={(e) => handleScroll(e, 'features')} className="hover:text-brand transition-colors text-slate-600 dark:text-slate-300">{t('nav.features')}</button>
        <button onClick={(e) => handleScroll(e, 'how')} className="hover:text-brand transition-colors text-slate-600 dark:text-slate-300">{t('nav.how')}</button>
        <button onClick={(e) => handleScroll(e, 'about')} className="hover:text-brand transition-colors text-slate-600 dark:text-slate-300">{t('nav.about')}</button>
      </div>

      {/* KANAN: Pengaturan & Auth (DESKTOP) */}
      <div className="hidden md:flex items-center gap-3 md:gap-4 text-sm font-medium">
        
        {/* Tombol Tema & Bahasa ditaruh di sini agar tidak ikut tersembunyi */}
        <ThemeToggle />

        <div className="relative" ref={languageMenuRef}>
          <button
            type="button"
            onClick={() => setIsLanguageOpen((open) => !open)}
            className="h-10 px-1.5 flex items-center gap-1.5 text-sm font-semibold text-slate-700 hover:text-[#23b1f5] dark:text-slate-300 dark:hover:text-[#23b1f5] transition-colors cursor-pointer"
            aria-haspopup="listbox"
            aria-expanded={isLanguageOpen}
            title={t('common.language_title')}
          >
            <i className="fa-solid fa-globe text-base"></i>
            <span>{language.toUpperCase()}</span>
            <i className={`fa-solid fa-chevron-down text-[10px] transition-transform ${isLanguageOpen ? 'rotate-180' : ''}`}></i>
          </button>

          {isLanguageOpen && (
            <div className="absolute right-0 top-full mt-2 min-w-24 overflow-hidden rounded-xl bg-white/95 py-1 shadow-xl shadow-slate-900/10 backdrop-blur-md dark:bg-slate-900/95 dark:shadow-black/30 z-50">
              {languages.map((item) => (
                <button
                  key={item.value}
                  type="button"
                  onClick={() => {
                    changeLanguage(item.value)
                    setIsLanguageOpen(false)
                  }}
                  className={`w-full px-4 py-2 text-left text-sm font-semibold transition-colors ${
                    language === item.value
                      ? 'bg-[#23b1f5]/10 text-[#23b1f5]'
                      : 'text-slate-700 hover:bg-slate-100 dark:text-slate-300 dark:hover:bg-slate-800'
                  }`}
                  role="option"
                  aria-selected={language === item.value}
                >
                  {item.label}
                </button>
              ))}
            </div>
          )}
        </div>

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

      {/* MOBILE BURGER MENU */}
      <div className="md:hidden flex items-center" ref={mobileMenuRef}>
        <button 
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} 
          className="text-slate-600 dark:text-slate-300 hover:text-brand transition-colors p-2"
          aria-label="Toggle menu"
        >
          <i className="fa-solid fa-bars text-2xl"></i>
        </button>

        {isMobileMenuOpen && (
          <div className="absolute top-20 right-4 w-64 p-5 rounded-2xl bg-white/70 dark:bg-slate-900/70 backdrop-blur-xl shadow-2xl border border-white/40 dark:border-white/10 flex flex-col gap-4 z-50">
            <div className="flex flex-col gap-4 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
              <button onClick={(e) => handleScroll(e, 'features')} className="text-left font-semibold text-slate-700 dark:text-slate-200 hover:text-brand transition-colors">{t('nav.features')}</button>
              <button onClick={(e) => handleScroll(e, 'how')} className="text-left font-semibold text-slate-700 dark:text-slate-200 hover:text-brand transition-colors">{t('nav.how')}</button>
              <button onClick={(e) => handleScroll(e, 'about')} className="text-left font-semibold text-slate-700 dark:text-slate-200 hover:text-brand transition-colors">{t('nav.about')}</button>
            </div>

            <div className="flex items-center justify-between py-2 border-b border-slate-200/50 dark:border-slate-700/50">
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{t('theme.title_system')}</span>
              <ThemeToggle />
            </div>

            <div className="flex flex-col gap-2 pb-4 border-b border-slate-200/50 dark:border-slate-700/50">
              <span className="font-semibold text-slate-700 dark:text-slate-200 text-sm">{t('common.language_title')}</span>
              <div className="flex gap-2">
                {languages.map((item) => (
                  <button
                    key={item.value}
                    onClick={() => {
                      changeLanguage(item.value)
                    }}
                    className={`flex-1 py-2 text-center rounded-lg text-sm font-bold transition-colors ${
                      language === item.value
                        ? 'bg-brand text-white shadow-md'
                        : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-3 pt-2">
              {isAuthenticated ? (
                <>
                  <Link 
                    to="/dashboard" 
                    className="text-center bg-brand text-white font-bold px-4 py-3 rounded-xl hover:bg-brand-hover transition-colors shadow-md w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.dashboard')}
                  </Link>
                  <button 
                    onClick={() => { logout(); setIsMobileMenuOpen(false); }}
                    className="text-center font-bold text-red-500 hover:bg-red-50 dark:hover:bg-red-500/10 py-3 rounded-xl transition-colors"
                  >
                    {t('nav.logout')}
                  </button>
                </>
              ) : (
                <>
                  <Link 
                    to="/login" 
                    className="text-center font-bold text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 py-3 rounded-xl transition-colors"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.login')}
                  </Link>
                  <Link 
                    to="/register" 
                    className="text-center bg-brand text-white font-bold px-4 py-3 rounded-xl hover:bg-brand-hover transition-colors shadow-md w-full"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {t('nav.register')}
                  </Link>
                </>
              )}
            </div>
          </div>
        )}
      </div>

    </nav>
  )
}
