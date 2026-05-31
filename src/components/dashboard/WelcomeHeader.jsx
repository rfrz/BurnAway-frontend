import { useAuth } from '../../hooks/useAuth.js'
import { useLanguage } from '../../hooks/useLanguage.js'

export default function WelcomeHeader() {
  const { user } = useAuth()
  const { t } = useLanguage()
  const name = user?.username || t('common.default_user')

  return (
    <div className="bg-gradient-to-r from-brand to-blue-600 dark:from-brand/80 dark:to-blue-800 rounded-3xl p-8 text-white shadow-lg relative overflow-hidden">
      <div className="relative z-10">
        <h1 className="text-3xl font-bold mb-2">{t('dashboard.greeting', { name })}</h1>
        <p className="text-blue-100 max-w-xl text-sm md:text-base">
          {t('dashboard.welcome_subtitle')}
        </p>
      </div>
      
      {/* Decorative background elements */}
      <div className="absolute right-0 top-0 w-64 h-64 bg-white/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
      <div className="absolute right-40 bottom-0 w-32 h-32 bg-brand-hover/40 rounded-full blur-2xl translate-y-1/2"></div>
    </div>
  )
}
