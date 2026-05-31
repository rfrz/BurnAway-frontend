import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.js'
import { useLanguage } from '../../hooks/useLanguage.js'

export default function RegisterForm() {
  const navigate = useNavigate()
  const { register } = useAuth()
  const { t } = useLanguage()

  const [formData, setFormData] = useState({
    username: '',
    email: '',
    birth_date: '',
    experience_years: '',
    password: ''
  })
  
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    setError('')
    setIsLoading(true)

    const payload = {
      ...formData,
      experience_years: Number(formData.experience_years)
    }

    const result = await register(payload)
    
    setIsLoading(false)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error)
    }
  }

  const renderInput = (key, label, type, placeholder, icon, min, max) => (
    <div>
      <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block transition-colors">
        {label}
      </label>
      <div className="relative">
        {icon && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <i className={`fa-solid ${icon}`}></i>
          </div>
        )}
        <input 
          type={type} 
          name={key}
          value={formData[key]}
          onChange={handleChange}
          placeholder={placeholder}
          required 
          min={min}
          max={max}
          className={`w-full ${icon ? 'pl-11' : 'px-4'} pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all ${error ? 'form-input-error' : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-brand dark:focus:ring-brand/50'}`}
        />
      </div>
    </div>
  )

  return (
    <form onSubmit={handleRegister} className="flex flex-col gap-5 mt-6">
      
      {error && (
        <div className="alert-banner alert-error animate-fade-in">
          <i className="fa-solid fa-circle-exclamation"></i>
          {error}
        </div>
      )}

      {renderInput('username', 'Username', 'text', 'Masukkan username', 'fa-user')}
      {renderInput('email', 'Email', 'email', 'Masukkan email', 'fa-envelope')}
      
      <div className="grid grid-cols-2 gap-4">
        {renderInput('birth_date', 'Tanggal Lahir', 'date', '', 'fa-calendar', '1900-01-01', new Date().toISOString().split('T')[0])}
        {renderInput('experience_years', 'Pengalaman (Thn)', 'number', '0', 'fa-briefcase', '0', '80')}
      </div>
      
      <div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block transition-colors">
          Password
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <i className="fa-solid fa-lock"></i>
          </div>
          <input 
            type={showPassword ? 'text' : 'password'} 
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Buat password" 
            required 
            minLength={8}
            className={`w-full pl-11 pr-12 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all ${error ? 'form-input-error' : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-brand dark:focus:ring-brand/50'}`}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute inset-y-0 right-0 pr-4 flex items-center text-slate-400 hover:text-brand transition-colors"
          >
            <i className={`fa-solid ${showPassword ? 'fa-eye-slash' : 'fa-eye'}`}></i>
          </button>
        </div>
      </div>
      
      <button 
        type="submit"
        disabled={isLoading}
        className="w-full mt-4 bg-brand text-white font-bold py-3.5 rounded-xl hover:bg-brand-hover active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
      >
        {isLoading ? (
          <i className="fa-solid fa-circle-notch fa-spin"></i>
        ) : (
          <>
            {t('nav.register') || 'Daftar'}
            <i className="fa-solid fa-user-plus text-sm"></i>
          </>
        )}
      </button>
    </form>
  )
}
