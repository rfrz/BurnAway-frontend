export default function MetricForm({ formData, onChange, onSubmit }) {
  

  const renderInput = (key, label, type, placeholder, icon, min, max) => (
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
        min={min} max={max}
        placeholder={placeholder}
        required
        className="w-full px-4 py-3 rounded-xl border border-slate-300 dark:border-slate-700 bg-transparent text-slate-900 dark:text-white focus:ring-2 focus:ring-[#23b1f5] dark:focus:ring-emerald-500 outline-none transition-all placeholder:text-slate-400"
      />
    </div>
  )

  return (
    <form onSubmit={onSubmit} className="max-w-2xl mx-auto space-y-6 bg-white dark:bg-slate-800/50 p-8 md:p-10 rounded-[2rem] border border-slate-200 dark:border-slate-700/50 shadow-sm">
      
      {/* Input berbaris ke bawah */}
      {renderInput("age", "Umur (Tahun)", "number", "Contoh: 30", "fa-user")}
      {renderInput("experience_years", "Pengalaman (Tahun)", "number", "Contoh: 5", "fa-briefcase")}
      {renderInput("daily_work_hours", "Durasi Kerja (Jam)", "number", "Contoh: 8", "fa-clock")}
      {renderInput("sleep_hours", "Durasi Tidur (Jam)", "number", "Contoh: 7", "fa-moon")}
      {renderInput("caffeine_intake", "Asupan Kafein (Cangkir)", "number", "Contoh: 2", "fa-coffee")}
      {renderInput("screen_time", "Screen Time (Jam)", "number", "Contoh: 10", "fa-laptop")}
      {renderInput("bugs_per_day", "Rata-rata Bug (Per Hari)", "number", "Contoh: 5", "fa-bug")}
      {renderInput("commits_per_day", "Total Commit (Per Hari)", "number", "Contoh: 10", "fa-code-branch")}
      {renderInput("meetings_per_day", "Total Meeting (Per Hari)", "number", "Contoh: 3", "fa-people-group")}
      {renderInput("exercise_hours", "Olahraga (Jam Per Hari)", "number", "Contoh: 1", "fa-heart-pulse")}
      
      {/* Input Khusus Stress Level */}
      <div className="pt-4 pb-2 border-t border-slate-100 dark:border-slate-800 mt-8">
        <div className="flex items-center justify-between gap-3 mb-4">
          <label htmlFor="stress_level" className="text-sm font-semibold text-slate-700 dark:text-slate-300 flex items-center gap-2">
            <i className="fa-solid fa-gauge-high text-slate-400"></i>
            Persepsi Tingkat Stres Anda (0 - 100)
          </label>
          <span className="text-2xl font-black text-[#23b1f5] dark:text-emerald-400">
            {formData.stress_level || 0}
          </span>
        </div>
        <input 
          type="range" 
          name="stress_level"
          id="stress_level"
          value={formData.stress_level || 0}
          onChange={onChange}
          min="0" max="100"
          step="1"
          required
          className="w-full h-2 rounded-lg appearance-none cursor-pointer accent-[#23b1f5] dark:accent-emerald-500 bg-slate-200 dark:bg-slate-700"
        />
      </div>

      <div className="pt-6">
        <button 
          type="submit"
          className="w-full bg-slate-900 text-white dark:bg-emerald-500 dark:text-slate-950 font-bold py-4 rounded-xl hover:bg-slate-800 dark:hover:bg-emerald-400 transition-all shadow-md text-lg cursor-pointer"
        >
          Cek Hasil
        </button>
      </div>
    </form>
  )
}
