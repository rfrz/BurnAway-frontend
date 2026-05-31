import { useNavigate, Link } from 'react-router-dom'
import { useState, useEffect } from 'react'

export default function WelcomeHeader() {
  const navigate = useNavigate()
  const [userName, setUserName] = useState('Pengguna')

  // Mengambil nama dari localStorage saat komponen dimuat
  useEffect(() => {
    const storedName = localStorage.getItem('user_name')
    if (storedName) {
      setUserName(storedName)
    }
  }, [])

  // Fungsi untuk menangani proses keluar secara menyeluruh
  const handleLogout = () => {
    localStorage.removeItem('dummy_token')
    localStorage.removeItem('user_name')
    navigate('/login')
  }

  // Mengambil huruf pertama untuk avatar
  const initial = userName.charAt(0).toUpperCase()

  return (
    <div className="w-full flex justify-between items-center bg-slate-200 dark:bg-slate-800 rounded-full px-8 py-4 shadow-sm transition-colors duration-300">
      
      <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100 transition-colors">
        Halo, {userName}!
      </h2>
      
      <div className="flex items-center gap-4">
        
        {/* PERBAIKAN: Menambahkan onClick={handleLogout} dan memperbaiki warna hover agar merah menyala */}
        <button 
          onClick={handleLogout}
          className="flex items-center gap-2 font-bold text-slate-600 dark:text-slate-300 hover:text-red-500 dark:hover:text-red-400 bg-white/50 dark:bg-slate-700/50 hover:bg-red-50 dark:hover:bg-red-500/10 px-5 py-2.5 rounded-xl transition-all w-max cursor-pointer"
        >
          <span>Keluar</span>
          <i className="fa-solid fa-arrow-right-from-bracket"></i>
        </button>
        
        {/* Tombol Profil (Sudah Sempurna) */}
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
