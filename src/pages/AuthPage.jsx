import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

export default function AuthPage() {
  // State untuk melacak tab mana yang sedang aktif
  const [activeTab, setActiveTab] = useState('login')

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-[#0f172a] p-4 transition-colors duration-300">
      
      {/* 2. Kotak Form (Card) */}
      <div className="w-full max-w-md bg-white dark:bg-slate-800 rounded-2xl shadow-xl dark:shadow-none border border-transparent dark:border-slate-700 p-8 transition-colors duration-300">
        
        {/* 3. Latar Tab (Toggle)*/ }
        <div className="flex bg-slate-100 dark:bg-slate-900/50 p-1 rounded-xl mb-6 transition-colors">
          <button
            onClick={() => setActiveTab('login')}
            className={`w-1/2 py-2 text-center rounded-lg font-bold transition-all ${
              activeTab === 'login' 
                ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Masuk
          </button>
          
          <button
            onClick={() => setActiveTab('register')}
            className={`w-1/2 py-2 text-center rounded-lg font-bold transition-all ${
              activeTab === 'register' 
                ? 'bg-white dark:bg-slate-700 shadow-sm text-slate-800 dark:text-white' 
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200'
            }`}
          >
            Daftar
          </button>
        </div>

        {/* Conditional Rendering: Render form sesuai isi state */}
        {activeTab === 'login' ? <LoginForm /> : <RegisterForm />}

      </div>
    </div>
  )
}
