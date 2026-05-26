import { useState } from 'react'
import LoginForm from '../components/auth/LoginForm'
import RegisterForm from '../components/auth/RegisterForm'

export default function AuthPage() {
  // State untuk melacak tab mana yang sedang aktif
  const [activeTab, setActiveTab] = useState('login')

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 p-4">
      {/* Kotak Form (Card) */}
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8">
        
        {/* Tombol Tab (Toggle) */}
        <div className="flex bg-slate-100 p-1 rounded-xl mb-6">
          <button
            onClick={() => setActiveTab('login')}
            className={`w-1/2 py-2 text-center rounded-lg font-bold transition-all ${
              activeTab === 'login' 
                ? 'bg-white shadow-sm text-slate-800' 
                : 'text-slate-500 hover:text-slate-700'
            }`}
          >
            Masuk
          </button>
          <button
            onClick={() => setActiveTab('register')}
            className={`w-1/2 py-2 text-center rounded-lg font-bold transition-all ${
              activeTab === 'register' 
                ? 'bg-white shadow-sm text-slate-800' 
                : 'text-slate-500 hover:text-slate-700'
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