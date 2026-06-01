import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth.js'
import ConfirmModal from '../components/common/ConfirmModal'
import { useLanguage } from '../hooks/useLanguage.js'

const getProfileFormData = (user) => ({
  username: user?.username || '',
  email: user?.email || '',
  birth_date: user?.birth_date ? new Date(user.birth_date).toISOString().split('T')[0] : '',
  experience_years: user?.experience_years?.toString() || ''
})

export default function ProfilePage() {
  const navigate = useNavigate()
  const { user, updateUser, updatePassword, deleteAccount } = useAuth()
  const { t } = useLanguage()
  
  const [formData, setFormData] = useState(null)
  const visibleFormData = formData || getProfileFormData(user)
  const [isLoading, setIsLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [error, setError] = useState('')

  const [passwordData, setPasswordData] = useState({
    current_password: '',
    new_password: '',
    confirm_new_password: ''
  })
  const [isPasswordLoading, setIsPasswordLoading] = useState(false)
  const [passwordMessage, setPasswordMessage] = useState('')
  const [passwordError, setPasswordError] = useState('')

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  const handleChange = (e) => {
    setFormData(prev => ({ ...(prev || visibleFormData), [e.target.name]: e.target.value }))
  }

  const handleSave = async (e) => {
    e.preventDefault()
    setIsLoading(true)
    setMessage('')
    setError('')
    
    try {
      const payload = {
        ...visibleFormData,
        experience_years: Number(visibleFormData.experience_years)
      }
      const result = await updateUser(payload)
      
      if (result.success) {
        setMessage(t('profile.success'))
      } else {
        setError(result.error || t('errors.update_failed'))
      }
    } catch {
      setError(t('profile.save_error'))
    } finally {
      setIsLoading(false)
    }
  }

  const handlePasswordChange = (e) => {
    setPasswordData(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handlePasswordSubmit = async (e) => {
    e.preventDefault()
    setIsPasswordLoading(true)
    setPasswordMessage('')
    setPasswordError('')
    
    if (passwordData.new_password !== passwordData.confirm_new_password) {
      setPasswordError(t('errors.password_mismatch'))
      setIsPasswordLoading(false)
      return
    }
    
    try {
      const result = await updatePassword({
        current_password: passwordData.current_password,
        new_password: passwordData.new_password
      })
      
      if (result.success) {
        setPasswordMessage(t('profile.password_success'))
        setPasswordData({ current_password: '', new_password: '', confirm_new_password: '' })
      } else {
        setPasswordError(result.error || t('errors.password_update_failed'))
      }
    } catch {
      setPasswordError(t('profile.password_error'))
    } finally {
      setIsPasswordLoading(false)
    }
  }

  const handleDelete = async () => {
    const result = await deleteAccount()
    if (!result.success) {
      setError(result.error || t('errors.account_delete_failed'))
    } else {
      navigate('/login')
    }
  }

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 md:px-8 transition-colors duration-300">
      <div className="max-w-3xl mx-auto">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/dashboard" className="text-slate-500 hover:text-brand font-semibold transition-colors flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> {t('common.back')}
          </Link>
          <div className="text-right">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-white">
              {t('profile.title')}
            </h1>
          </div>
        </div>

        {message && (
          <div className="alert-banner alert-success mb-6">
            <i className="fa-solid fa-circle-check"></i>
            {message}
          </div>
        )}

        {error && (
          <div className="alert-banner alert-error mb-6">
            <i className="fa-solid fa-circle-exclamation"></i>
            {error}
          </div>
        )}

        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
            <i className="fa-solid fa-user-pen text-brand"></i>
            {t('profile.basic_info')}
          </h2>
          
          <form onSubmit={handleSave} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">{t('auth.username')}</label>
              <input 
                type="text" 
                name="username"
                value={visibleFormData.username}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand/50 outline-none transition-all"
              />
            </div>
            
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">{t('auth.email')}</label>
              <input 
                type="email" 
                name="email"
                value={visibleFormData.email}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand/50 outline-none transition-all"
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">{t('profile.birth_date')}</label>
                <input 
                  type="date" 
                  name="birth_date"
                  value={visibleFormData.birth_date}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand/50 outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">{t('profile.experience_years')}</label>
                <input 
                  type="number" 
                  name="experience_years"
                  value={visibleFormData.experience_years}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button 
                type="submit"
                disabled={isLoading}
                className="bg-brand text-white font-bold py-3 px-8 rounded-xl hover:bg-brand-hover active:scale-95 transition-all shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-save"></i>}
                {t('profile.save')}
              </button>
            </div>
          </form>
        </div>

        {/* Password Update Section */}
        <div className="bg-white dark:bg-slate-800 rounded-3xl p-8 border border-slate-200 dark:border-slate-700 shadow-sm mb-8">
          <h2 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
            <i className="fa-solid fa-lock text-brand"></i>
            {t('profile.change_password')}
          </h2>

          {passwordMessage && (
            <div className="alert-banner alert-success mb-6">
              <i className="fa-solid fa-circle-check"></i>
              {passwordMessage}
            </div>
          )}

          {passwordError && (
            <div className="alert-banner alert-error mb-6">
              <i className="fa-solid fa-circle-exclamation"></i>
              {passwordError}
            </div>
          )}
          
          <form onSubmit={handlePasswordSubmit} className="space-y-5">
            <div>
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">{t('profile.current_password')}</label>
              <input 
                type="password" 
                name="current_password"
                value={passwordData.current_password}
                onChange={handlePasswordChange}
                required
                className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand/50 outline-none transition-all"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">{t('profile.new_password')}</label>
                <input 
                  type="password" 
                  name="new_password"
                  value={passwordData.new_password}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand/50 outline-none transition-all"
                />
              </div>
              
              <div>
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block">{t('profile.confirm_new_password')}</label>
                <input 
                  type="password" 
                  name="confirm_new_password"
                  value={passwordData.confirm_new_password}
                  onChange={handlePasswordChange}
                  required
                  minLength={8}
                  className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900/50 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand/50 outline-none transition-all"
                />
              </div>
            </div>

            <div className="pt-4 border-t border-slate-100 dark:border-slate-700 flex justify-end">
              <button 
                type="submit"
                disabled={isPasswordLoading}
                className="bg-brand text-white font-bold py-3 px-8 rounded-xl hover:bg-brand-hover active:scale-95 transition-all shadow-md flex items-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
              >
                {isPasswordLoading ? <i className="fa-solid fa-circle-notch fa-spin"></i> : <i className="fa-solid fa-save"></i>}
                {t('profile.save')}
              </button>
            </div>
          </form>
        </div>

        {/* Danger Zone */}
        <div className="bg-red-50 dark:bg-red-500/10 rounded-3xl p-8 border border-red-200 dark:border-red-500/20 shadow-sm">
          <h2 className="text-xl font-bold mb-2 text-red-700 dark:text-red-400 flex items-center gap-2">
            <i className="fa-solid fa-triangle-exclamation"></i>
            {t('profile.danger_title')}
          </h2>
          <p className="text-red-600/80 dark:text-red-400/80 text-sm mb-6">
            {t('profile.danger_desc')}
          </p>
          
          <button 
            onClick={() => setIsDeleteModalOpen(true)}
            className="bg-red-600 text-white font-bold py-3 px-6 rounded-xl hover:bg-red-700 transition-all shadow-sm flex items-center gap-2"
          >
            <i className="fa-solid fa-trash-can"></i>
            {t('profile.delete_account')}
          </button>
        </div>

        <ConfirmModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title={t('profile.delete_modal_title')}
          message={t('profile.delete_modal_message')}
        />

      </div>
    </div>
  )
}
