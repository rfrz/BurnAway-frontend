import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function WelcomeHeader() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Pengguna')

  useEffect(() => {
    const storedName = localStorage.getItem('user_name')
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('dummy_token')
    localStorage.removeItem('user_name')
    navigate('/login')
  }

  const initial = userName.charAt(0).toUpperCase()

  return (
    <div className="w-full flex justify-between items-center bg-slate-200 dark:bg-slate-800 rounded-full px-8 py-4 shadow-sm transition-colors duration-300">
      
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">
        Halo, {userName}!
      </h2>
      
      <div className="flex items-center gap-4">
        
        <button 
          onClick={handleLogout}
          className="text-sm font-bold text-red-500 hover:text-red-700 transition-colors cursor-pointer"
        >
          Keluar
        </button>
        
        {/* Pastikan bagian ini menggunakan tag <Link> dari react-router-dom dan mengarah ke /profile */}
        <Link 
          to="/profile" 
          className="w-10 h-10 bg-slate-400 dark:bg-slate-600 rounded-full flex items-center justify-center font-bold text-white shadow-inner hover:scale-105 active:scale-95 transition-transform cursor-pointer block"
          title="Lihat Profil"
        >
          {initial}
        </Link>
      </div>
    </div>
  )
}
