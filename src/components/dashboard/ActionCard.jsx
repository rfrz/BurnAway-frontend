import { Link } from 'react-router-dom'
import { useLanguage } from '../../hooks/useLanguage.js'

export default function ActionCard() {
  const { t } = useLanguage()

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-5 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center text-center transition-colors duration-300">
      
      <div className="w-12 h-12 bg-brand/10 dark:bg-brand/20 text-brand rounded-full flex items-center justify-center text-xl mb-3">
        <i className="fa-solid fa-heart-circle-check"></i>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">{t('dashboard.action_title')}</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-4">
        {t('dashboard.action_desc')}
      </p>
      
      <Link 
        to="/predict" 
        className="w-full bg-brand hover:bg-brand-hover text-white font-bold py-2.5 px-5 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
      >
        <span>{t('dashboard.action_button')}</span>
        <i className="fa-solid fa-arrow-right text-sm"></i>
      </Link>
    </div>
  )
}
