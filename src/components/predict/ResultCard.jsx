import MarkdownContent from '../common/MarkdownContent'
import { getBurnoutLevelKey, normalizePrediction } from '../../utils/prediction'
import { useLanguage } from '../../hooks/useLanguage.js'

export default function ResultCard({ data, onReset }) {
  const { t } = useLanguage()
  const normalizedData = normalizePrediction(data)
  if (!normalizedData) return null

  const level = normalizedData.burnout_level || "Unknown"
  const confidence = normalizedData.confidence
  const probabilities = normalizedData.probabilities
  const advice = normalizedData.advice || t('predict.advice_unavailable')
  const getBurnoutLabel = (value) => {
    return t(`burnout.${getBurnoutLevelKey(value)}`)
  }
  
  // Konfigurasi tampilan berdasarkan tingkat burnout
  const getStyleConfigs = (level) => {
    switch (level) {
      case "High":
        return {
          bg: "bg-red-50 dark:bg-red-500/10",
          border: "border-red-200 dark:border-red-500/20",
          text: "text-red-700 dark:text-red-400",
          icon: "fa-triangle-exclamation",
          ring: "ring-red-100 dark:ring-red-500/20",
          title: t('predict.risk_high')
        }
      case "Medium":
      case "Moderate":
        return {
          bg: "bg-amber-50 dark:bg-amber-500/10",
          border: "border-amber-200 dark:border-amber-500/20",
          text: "text-amber-700 dark:text-amber-400",
          icon: "fa-circle-exclamation",
          ring: "ring-amber-100 dark:ring-amber-500/20",
          title: t('predict.risk_medium')
        }
      case "Low":
        return {
          bg: "bg-emerald-50 dark:bg-[#23b1f5]/10",
          border: "border-emerald-200 dark:border-[#23b1f5]/20",
          text: "text-emerald-700 dark:text-[#23b1f5]",
          icon: "fa-circle-check",
          ring: "ring-emerald-100 dark:ring-[#23b1f5]/20",
          title: t('predict.risk_low')
        }
      default:
        return {
          bg: "bg-slate-50 dark:bg-slate-800",
          border: "border-slate-200 dark:border-slate-700",
          text: "text-slate-700 dark:text-slate-300",
          icon: "fa-circle-info",
          ring: "ring-slate-100 dark:ring-slate-800",
          title: t('predict.risk_unknown')
        }
    }
  }

  const style = getStyleConfigs(level)

  return (
    <div className="max-w-2xl mx-auto flex flex-col gap-6 animate-slide-up">
      <div className={`rounded-[2rem] border p-8 md:p-10 shadow-lg ${style.bg} ${style.border} transition-colors duration-300`}>
        
        {/* Header Hasil */}
        <div className="flex flex-col items-center text-center border-b border-black/5 dark:border-white/5 pb-8 mb-8">
          <div className={`w-24 h-24 rounded-full flex items-center justify-center bg-white dark:bg-slate-900 shadow-sm ring-8 ${style.ring} mb-6`}>
            <i className={`fa-solid ${style.icon} text-5xl ${style.text}`}></i>
          </div>
          <h2 className={`text-4xl font-black tracking-tight mb-2 ${style.text}`}>
            {style.title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 font-medium text-lg">
            {t('predict.result_basis')}
          </p>
        </div>

        {/* Saran AI / Detail */}
        {(confidence != null || probabilities) && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
            {confidence != null && (
              <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-1">
                  {t('predict.confidence')}
                </p>
                <p className="text-2xl font-black text-slate-900 dark:text-white">
                  {(Number(confidence) * 100).toFixed(1)}%
                </p>
              </div>
            )}
            {probabilities && (
              <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-5 border border-black/5 dark:border-white/5 shadow-sm">
                <p className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-2">
                  {t('predict.probability')}
                </p>
                <div className="space-y-1">
                  {Object.entries(probabilities).map(([label, value]) => (
                    <div key={label} className="flex justify-between text-sm font-semibold text-slate-700 dark:text-slate-300">
                      <span>{getBurnoutLabel(label)}</span>
                      <span>{(Number(value) * 100).toFixed(1)}%</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}

        <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-black/5 dark:border-white/5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
            <i className="fa-solid fa-wand-magic-sparkles text-brand"></i>
            {t('predict.advice_title')}
          </h3>
          <MarkdownContent text={advice} className="font-medium" />
        </div>

      </div>

      <button 
        onClick={onReset}
        className="w-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold py-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm flex items-center justify-center gap-2 text-lg cursor-pointer"
      >
        <i className="fa-solid fa-rotate-right"></i>
        {t('predict.reset')}
      </button>
    </div>
  )
}
