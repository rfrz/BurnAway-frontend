import { useNavigate } from 'react-router-dom'
import { useState } from 'react'

export default function LoginForm() {
  const navigate = useNavigate()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = (e) => {
    e.preventDefault() 
    
    localStorage.setItem('dummy_token', 'ini-token-rahasia-123')
    
    const extractedName = email.split('@')[0]
    localStorage.setItem('user_name', extractedName) 
    
    navigate('/dashboard')
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-6">
      <div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block transition-colors">
          Email
        </label>
        <input 
          type="email" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Masukkan email" 
          required 
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 outline-none transition-all" 
        />
      </div>
      
      <div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block transition-colors">
          Password
        </label>
        <input 
          type="password" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Masukkan password" 
          required 
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 outline-none transition-all" 
        />
      </div>

      <button 
        type="submit"
        className="w-full mt-4 bg-sky-600 dark:bg-sky-500 text-white font-bold py-3 rounded-lg hover:bg-sky-700 dark:hover:bg-sky-400 active:scale-95 transition-all shadow-md cursor-pointer"
      >
        Masuk
      </button>
    </form>
  )
}
