import { useNavigate } from 'react-router-dom'
// Fitur i18n dimatikan sementara untuk melacak error

export default function WelcomeHeader() {
  const navigate = useNavigate()

  const handleLogout = () => {
    localStorage.removeItem('dummy_token')
    navigate('/login')
  }

  return (
    <div className="w-full flex justify-between items-center bg-slate-200 rounded-full px-8 py-4 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800">
        Halo, Pengguna!
      </h2>
      
      <div className="flex items-center gap-4">
        {/* Tombol bahasa disembunyikan sementara */}
        
        <button 
          onClick={handleLogout}
          className="text-sm font-bold text-slate-800 hover:text-red-700 transition-colors"
        >
          Keluar
        </button>
        
        <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center font-bold text-white shadow-inner">
          U
        </div>
      </div>
    </div>
  )
}
