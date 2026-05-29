import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function LoginForm() {
  const navigate = useNavigate()
  
  // Memori untuk menyimpan ketikan user
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault() // Mencegah layar refresh
    
    // Menyuntikkan token ke memori browser
    localStorage.setItem('dummy_token', 'ini-token-rahasia-123')
    
    // Teleportasi ke Dashboard
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-6">
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-1 block">Email</label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan email" 
          required 
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none transition-all" 
        />
      </div>
      
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-1 block">Password</label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukkan password" 
          required 
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none transition-all" 
        />
      </div>

      <button 
        type="submit"
        className="w-full mt-4 bg-sky-600 text-white font-bold py-3 rounded-lg hover:bg-sky-700 active:scale-95 transition-all shadow-md cursor-pointer"
      >
        Masuk
      </button>
    </form>
  )
}
