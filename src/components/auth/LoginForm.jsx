import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../../hooks/useAuth.js'
import { useLanguage } from '../../hooks/useLanguage.js'

export default function LoginForm() {
  const navigate = useNavigate()
  const { login } = useAuth()
  const { t } = useLanguage()
  
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [error, setError] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const handleLogin = async (e) => {
    e.preventDefault() 
    setError('')
    setIsLoading(true)

    const result = await login(email, password)
    
    setIsLoading(false)
    if (result.success) {
      navigate('/dashboard')
    } else {
      setError(result.error || t('errors.login_failed'))
    }
  }

  return (
    <form onSubmit={handleLogin} className="flex flex-col gap-5 mt-6">
      
      {error && (
        <div className="alert-banner alert-error animate-fade-in">
          <i className="fa-solid fa-circle-exclamation"></i>
          {error}
        </div>
      )}

      <div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block transition-colors">
          {t('auth.email')}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <i className="fa-solid fa-envelope"></i>
          </div>
          <input 
            type="email" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t('auth.email_placeholder')} 
            required 
            className={`w-full pl-11 pr-4 py-3 rounded-xl border bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 outline-none transition-all ${error ? 'form-input-error' : 'border-slate-300 dark:border-slate-700 focus:ring-2 focus:ring-brand dark:focus:ring-brand/50'}`}
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block transition-colors">
          {t('auth.password')}
        </label>
        <div className="relative">
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400">
            <i className="fa-solid fa-lock"></i>
          </div>
          <input 
            type={showPassword ? 'text' : 'password'} 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t('auth.password_placeholder')} 
            required 
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
            {t('nav.login') || 'Masuk'}
            <i className="fa-solid fa-arrow-right text-sm"></i>
          </>
        )}
      </button>
    </form>
  )
}
