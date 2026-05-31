import { Link } from 'react-router-dom';

export default function LatestPredictionCard({ prediction }) {
  if (!prediction) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col items-center justify-center text-center h-full min-h-[200px]">
        <div className="w-16 h-16 bg-slate-100 dark:bg-slate-700/50 rounded-full flex items-center justify-center text-slate-400 mb-4">
          <i className="fa-solid fa-clipboard-list text-2xl"></i>
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium mb-4">Belum ada riwayat prediksi.</p>
        <Link to="/predict" className="bg-brand text-white font-bold py-2 px-6 rounded-lg hover:bg-brand-hover transition-colors shadow-md">
          Mulai Prediksi
        </Link>
      </div>
    )
  }

  // Format prediction details...
  const burnoutLevel = prediction.burnout_level || 'Normal';
  const getBadgeColor = (level) => {
    switch (level.toLowerCase()) {
      case 'high': return 'bg-red-100 text-red-600 dark:bg-red-500/20 dark:text-red-400 border-red-200 dark:border-red-500/30';
      case 'moderate': return 'bg-amber-100 text-amber-600 dark:bg-amber-500/20 dark:text-amber-400 border-amber-200 dark:border-amber-500/30';
      default: return 'bg-emerald-100 text-emerald-600 dark:bg-emerald-500/20 dark:text-emerald-400 border-emerald-200 dark:border-emerald-500/30';
    }
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 flex flex-col h-full">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <i className="fa-solid fa-clock-rotate-left text-brand"></i>
          Prediksi Terakhir
        </h3>
        <span className={`text-xs font-bold px-3 py-1 rounded-full border ${getBadgeColor(burnoutLevel)}`}>
          {burnoutLevel.toUpperCase()}
        </span>
      </div>

      <div className="flex-1">
        <p className="text-slate-600 dark:text-slate-300 text-sm mb-4 line-clamp-3">
          {prediction.advice || 'Tidak ada saran tersedia.'}
        </p>
      </div>

      <div className="mt-auto flex gap-2">
        <Link to={`/history/${prediction.id}`} className="flex-1 bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-300 font-bold py-2 px-4 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-600 transition-colors text-center text-sm">
          Detail Lengkap
        </Link>
      </div>
    </div>
  )
}
