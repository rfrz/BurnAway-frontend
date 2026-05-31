export default function ResultCard({ data, onReset }) {
  if (!data) return null

  // Backend returns: { id, burnout_level, stress_level, advice, ... }
  // Provide fallback just in case
  const level = data.burnout_level || "Unknown"
  const advice = data.advice || "Saran tidak tersedia."
  
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
          title: "Risiko Tinggi"
        }
      case "Medium":
      case "Moderate":
        return {
          bg: "bg-amber-50 dark:bg-amber-500/10",
          border: "border-amber-200 dark:border-amber-500/20",
          text: "text-amber-700 dark:text-amber-400",
          icon: "fa-circle-exclamation",
          ring: "ring-amber-100 dark:ring-amber-500/20",
          title: "Risiko Sedang"
        }
      case "Low":
        return {
          bg: "bg-emerald-50 dark:bg-emerald-500/10",
          border: "border-emerald-200 dark:border-emerald-500/20",
          text: "text-emerald-700 dark:text-emerald-400",
          icon: "fa-circle-check",
          ring: "ring-emerald-100 dark:ring-emerald-500/20",
          title: "Risiko Rendah"
        }
      default:
        return {
          bg: "bg-slate-50 dark:bg-slate-800",
          border: "border-slate-200 dark:border-slate-700",
          text: "text-slate-700 dark:text-slate-300",
          icon: "fa-circle-info",
          ring: "ring-slate-100 dark:ring-slate-800",
          title: "Tidak Diketahui"
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
            Berdasarkan analisis pola kerja dan gaya hidupmu.
          </p>
        </div>

        {/* Saran AI / Detail */}
        <div className="bg-white dark:bg-slate-900/50 rounded-2xl p-6 border border-black/5 dark:border-white/5 shadow-sm">
          <h3 className="text-sm font-bold text-slate-800 dark:text-slate-200 uppercase tracking-wider mb-4 flex items-center gap-2">
            <i className="fa-solid fa-wand-magic-sparkles text-brand"></i>
            Saran & Tindakan Preventif
          </h3>
          <div className="prose prose-slate dark:prose-invert max-w-none">
            <p className="text-slate-700 dark:text-slate-300 leading-relaxed font-medium">
              {advice}
            </p>
          </div>
        </div>

      </div>

      <button 
        onClick={onReset}
        className="w-full bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 font-bold py-4 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700 transition-all shadow-sm flex items-center justify-center gap-2 text-lg cursor-pointer"
      >
        <i className="fa-solid fa-rotate-right"></i>
        Uji Ulang Prediksi
      </button>
    </div>
  )
}
