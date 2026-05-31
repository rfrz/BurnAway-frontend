export default function MetricForm({ formData, onChange, onSubmit, isLoading }) {
  
  const renderInput = (key, label, type, placeholder, icon, min, max, step) => (
    <div>
      <label htmlFor={key} className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-2 flex items-center gap-2">
        <i className={`fa-solid ${icon} text-slate-400`}></i>
        {label}
      </label>
      <input 
        type={type} 
        name={key}
        id={key}
        value={formData[key]}
        onChange={onChange}
        min={min} 
        max={max}
        step={step}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-brand dark:focus:ring-brand/50 outline-none transition-all placeholder:text-slate-400"
      />
    </div>
  )

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-6 bg-white dark:bg-slate-800 p-8 md:p-10 rounded-[2rem] border border-slate-200 dark:border-slate-700 shadow-sm">
      
      {/* Input berbaris ke bawah */}
      {renderInput("daily_work_hours", "Durasi Kerja (Jam)", "number", "Contoh: 8", "fa-clock", 0, 24, 0.5)}
      {renderInput("sleep_hours", "Durasi Tidur (Jam)", "number", "Contoh: 7", "fa-moon", 0, 24, 0.5)}
      {renderInput("caffeine_intake", "Asupan Kafein (Cangkir)", "number", "Contoh: 2", "fa-coffee", 0, 20, 1)}
      {renderInput("screen_time", "Screen Time (Jam)", "number", "Contoh: 10", "fa-laptop", 0, 24, 0.5)}
      {renderInput("bugs_per_day", "Rata-rata Bug (Per Hari)", "number", "Contoh: 5", "fa-bug", 0, 100, 1)}
      {renderInput("commits_per_day", "Total Commit (Per Hari)", "number", "Contoh: 10", "fa-code-branch", 0, 100, 1)}
      {renderInput("meetings_per_day", "Total Meeting (Per Hari)", "number", "Contoh: 3", "fa-people-group", 0, 20, 1)}
      {renderInput("exercise_hours", "Olahraga (Jam Per Hari)", "number", "Contoh: 1", "fa-heart-pulse", 0, 24, 0.5)}
      
      {/* Input Khusus Stress Level */}
      <div className="pt-4 pb-2 border-t border-slate-100 dark:border-slate-700 mt-8">
        <div className="flex items-center justify-between gap-3 mb-4">
          <label htmlFor="stress_level" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <i className="fa-solid fa-gauge-high text-slate-400"></i>
            Persepsi Tingkat Stres Anda (0 - 10)
          </label>
          <span className="text-2xl font-black text-brand">
            {formData.stress_level || 0}
          </span>
        </div>
        <input 
          type="range" 
          name="stress_level"
          id="stress_level"
          value={formData.stress_level || 0}
          onChange={onChange}
          min="0" max="10"
          step="1"
          required
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-brand bg-slate-200 dark:bg-slate-700"
        />
        <div className="flex justify-between text-xs text-slate-400 mt-2">
          <span>0 (Sangat Santai)</span>
          <span>10 (Sangat Stres)</span>
        </div>
      </div>

      <div className="pt-6">
        <button 
          type="submit"
          disabled={isLoading}
          className="w-full bg-brand text-white font-bold py-4 rounded-xl hover:bg-brand-hover active:scale-[0.98] transition-all shadow-md flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed text-lg"
        >
          {isLoading ? (
            <>
              <i className="fa-solid fa-circle-notch fa-spin"></i>
              Menganalisis...
            </>
          ) : (
            <>
              <i className="fa-solid fa-wand-magic-sparkles"></i>
              Cek Hasil
            </>
          )}
        </button>
      </div>
    </form>
  )
}
