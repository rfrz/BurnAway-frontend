import { useState, useEffect } from 'react'
import { Link, useParams, useNavigate } from 'react-router-dom'
import api from '../services/api'
import ResultCard from '../components/predict/ResultCard'
import ConfirmModal from '../components/common/ConfirmModal'
import { useLanguage } from '../hooks/useLanguage.js'

const metricKeys = [
  { key: 'daily_work_hours', icon: 'fa-clock' },
  { key: 'sleep_hours', icon: 'fa-moon' },
  { key: 'caffeine_intake', icon: 'fa-coffee' },
  { key: 'screen_time', icon: 'fa-laptop' },
  { key: 'bugs_per_day', icon: 'fa-bug' },
  { key: 'commits_per_day', icon: 'fa-code-branch' },
  { key: 'meetings_per_day', icon: 'fa-people-group' },
  { key: 'exercise_hours', icon: 'fa-heart-pulse' },
  { key: 'stress_level', icon: 'fa-gauge-high' }
]

export default function PredictionDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { t, localeCode } = useLanguage()
  const [prediction, setPrediction] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState('')
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false)

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const data = await api.getPrediction(id)
        setPrediction(data)
      } catch {
        setError(t('history.detail_missing'))
      } finally {
        setIsLoading(false)
      }
    }
    fetchDetail()
  }, [id, t])

  const handleDelete = async () => {
    try {
      await api.deletePrediction(id)
      navigate('/history')
    } catch {
      alert(t('history.delete_error'))
    }
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-brand border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  if (error || !prediction) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <p className="text-red-500 font-bold">{error}</p>
        <Link to="/history" className="text-brand hover:underline">{t('common.back_history')}</Link>
      </div>
    )
  }

  return (
    <div className="w-full min-h-screen py-8 px-4 sm:px-6 md:px-8 transition-colors duration-300">
      <div className="max-w-4xl mx-auto">
        <div className="flex justify-between items-center mb-8 pb-6 border-b border-slate-200 dark:border-slate-800">
          <Link to="/history" className="text-slate-500 hover:text-brand font-semibold transition-colors flex items-center gap-2">
            <i className="fa-solid fa-arrow-left"></i> {t('common.back_history')}
          </Link>
          <div className="flex gap-2">
            <button 
              onClick={() => setIsDeleteModalOpen(true)}
              className="bg-red-50 dark:bg-red-500/10 text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-500/20 font-bold py-2 px-4 rounded-lg transition-colors border border-red-200 dark:border-red-500/30 flex items-center gap-2 text-sm"
            >
              <i className="fa-solid fa-trash"></i> {t('common.delete')}
            </button>
          </div>
        </div>

        <div className="mb-6 text-center">
          <p className="text-slate-500 font-medium">
            {t('history.analyzed_at', { date: new Date(prediction.created_at).toLocaleDateString(localeCode, {
              weekday: 'long', day: 'numeric', month: 'long', year: 'numeric', hour: '2-digit', minute: '2-digit'
            }) })}
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full">
          <ResultCard 
            data={prediction} 
            className="w-full"
          />

          <aside className="bg-white dark:bg-slate-800 rounded-[2rem] p-6 border border-slate-200 dark:border-slate-700 shadow-sm w-full">
            <div className="mb-5">
              <h2 className="text-xl font-black text-slate-900 dark:text-white flex items-center gap-2">
                <i className="fa-solid fa-list-check text-brand"></i>
                {t('history.input_title')}
              </h2>
              <p className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {t('history.input_subtitle')}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
              {metricKeys.map((item) => (
                <div key={item.key} className="flex items-center justify-between gap-4 rounded-2xl bg-slate-50 dark:bg-slate-900/50 p-4">
                  <div className="flex items-center gap-3 min-w-0">
                    <div className="w-9 h-9 rounded-xl bg-brand/10 dark:bg-brand/20 text-brand flex items-center justify-center shrink-0">
                      <i className={`fa-solid ${item.icon}`}></i>
                    </div>
                    <span className="text-sm font-semibold text-slate-600 dark:text-slate-300 truncate">
                      {t(`predict.fields.${item.key}`)}
                    </span>
                  </div>
                  <span className="text-base font-black text-slate-900 dark:text-white shrink-0">
                    {prediction[item.key] ?? t('common.unavailable')}
                  </span>
                </div>
              ))}
            </div>
          </aside>

          <button 
            onClick={() => navigate('/predict')}
            className="w-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold py-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm flex items-center justify-center gap-2 text-lg cursor-pointer"
          >
            <i className="fa-solid fa-rotate-right"></i>
            {t('predict.reset')}
          </button>
        </div>
        
        <ConfirmModal 
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          onConfirm={handleDelete}
          title={t('history.delete_prediction_title')}
          message={t('history.modal_message')}
        />
      </div>
    </div>
  )
}
