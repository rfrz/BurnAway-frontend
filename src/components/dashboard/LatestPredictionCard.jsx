import { Link } from 'react-router-dom';
import MarkdownContent from '../common/MarkdownContent';
import { getBurnoutBadgeClass, getBurnoutLevelKey, normalizePrediction } from '../../utils/prediction';
import { useLanguage } from '../../hooks/useLanguage.js';

export default function LatestPredictionCard({ prediction }) {
  const { t } = useLanguage()
  const normalizedPrediction = normalizePrediction(prediction)

  if (!normalizedPrediction) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center text-slate-400 mb-4">
          <i className="fa-solid fa-clipboard-list text-2xl"></i>
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">{t('dashboard.latest_empty')}</p>
        <Link to="/predict" className="bg-brand text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-hover transition-colors shadow-md">
          {t('dashboard.latest_start')}
        </Link>
      </div>
    )
  }

  // Format prediction details...
  const burnoutLevel = normalizedPrediction.burnout_level || 'Unknown';
  const burnoutLabel = t(`burnout.${getBurnoutLevelKey(burnoutLevel)}`)

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-clock-rotate-left text-brand"></i>
          {t('dashboard.latest_title')}
        </h3>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getBurnoutBadgeClass(burnoutLevel)}`}>
          {burnoutLabel.toUpperCase()}
        </span>
      </div>

      <div className="flex-1 mb-4 max-h-28 overflow-hidden">
        <MarkdownContent
          text={normalizedPrediction.advice}
          fallback={t('dashboard.advice_unavailable')}
          compact
          className="text-slate-600 dark:text-slate-300"
        />
      </div>

      <div className="mt-auto flex gap-2">
        {normalizedPrediction.id ? (
          <Link to={`/history/${normalizedPrediction.id}`} className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2 px-4 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-center text-sm">
            {t('dashboard.latest_detail')}
          </Link>
        ) : (
          <span className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-400 dark:text-slate-500 font-bold py-2 px-4 rounded-xl text-center text-sm cursor-not-allowed">
            {t('dashboard.latest_detail_unavailable')}
          </span>
        )}
      </div>
    </div>
  )
}
