export default function AIInsightCard({ advice }) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 md:p-8 shadow-sm border border-slate-200 dark:border-slate-700 transition-colors duration-300">
      
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
          <i className="fa-solid fa-wand-magic-sparkles"></i>
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">Saran AI Hari Ini</h2>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900/50 rounded-2xl p-6 border border-slate-100 dark:border-slate-700/50 relative">
        <div className="absolute top-6 left-6 text-slate-200 dark:text-slate-800 text-4xl">
          <i className="fa-solid fa-quote-left"></i>
        </div>
        <p className="text-slate-700 dark:text-slate-300 relative z-10 pl-8 text-lg font-medium leading-relaxed italic">
          {advice || "Belum ada prediksi yang dilakukan. Yuk, cek tingkat stres kerjamu sekarang!"}
        </p>
      </div>

    </div>
  )
}
