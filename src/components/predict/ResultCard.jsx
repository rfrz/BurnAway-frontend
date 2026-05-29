export default function ResultCard({ data, onReset }) {
  
  // Ambil data prediction dan advice dari objek utama yang dikirim
  const { prediction, advice } = data;

  const isHighRisk = prediction.burnout_level === "High"

  // Fungsi pembantu untuk membuat kartu metrik kecil
  const renderMetricCard = (title, value, unit, icon) => (
    <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm flex items-center gap-4">
      <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl shadow-inner ${isHighRisk ? 'bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400' : 'bg-emerald-50 dark:bg-emerald-950/30 text-emerald-600 dark:text-emerald-400'}`}>
        <i className={`fa-solid ${icon}`}></i>
      </div>
      <div>
        <p className="text-sm text-slate-500 dark:text-slate-400">{title}</p>
        <p className="text-2xl font-black text-slate-900 dark:text-white">
          {value}
          <span className="text-base font-medium text-slate-400 ml-1">{unit}</span>
        </p>
      </div>
    </div>
  )

  return (
    <div className="grid grid-cols-12 gap-8 animate-fade-in">
      
      {/* Sisi Kiri: Data Hasil Angka Simulasi */}
      <div className="col-span-12 lg:col-span-6 space-y-6">
        
        {/* Kartu Status Utama */}
        <div className={`p-8 rounded-3xl border ${isHighRisk ? 'bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900' : 'bg-emerald-50 dark:bg-emerald-950/20 border-emerald-200 dark:border-emerald-900'}`}>
           <p className="text-sm font-semibold uppercase tracking-widest text-slate-500 dark:text-slate-400">
             Indikasi Tingkat Burnout
           </p>
           
           <h2 className={`text-6xl font-black tracking-tighter mt-2 mb-3 ${isHighRisk ? 'text-red-600 dark:text-red-400' : 'text-emerald-600 dark:text-emerald-400'}`}>
             {prediction.burnout_level}
           </h2>
           
           <p className={`text-base max-w-sm ${isHighRisk ? 'text-red-700 dark:text-red-300' : 'text-emerald-700 dark:text-emerald-300'}`}>
             {isHighRisk 
               ? 'Perhatian: Metrik Anda menunjukkan risiko kelelahan tinggi. Segera tinjau saran AI.' 
               : 'Kabar Baik: Kondisi Anda terlihat stabil dan terkendali saat ini.'}
           </p>
        </div>

        {/* Grid Metrik Detail */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {renderMetricCard("Akurasi Prediksi", (prediction.confidence * 100).toFixed(0), "%", "fa-bullseye")}
            {renderMetricCard("Estimasi Stres", prediction.stress_estimate.toFixed(1), "/100", "fa-gauge-simple-high")}
        </div>
        
        {/* Placeholder Probabilitas Simulasi */}
        <div className="bg-white dark:bg-slate-900 p-6 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-sm">
           <p className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-4">Distribusi Probabilitas (Simulasi):</p>
           <div className="flex gap-2 h-8 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800 shadow-inner">
              <div style={{width: `${prediction.probabilities.Low * 100}%`}} className="bg-emerald-500 hover:opacity-90 transition-opacity" title="Low"></div>
              <div style={{width: `${prediction.probabilities.Medium * 100}%`}} className="bg-orange-500 hover:opacity-90 transition-opacity" title="Medium"></div>
              <div style={{width: `${prediction.probabilities.High * 100}%`}} className="bg-red-500 hover:opacity-90 transition-opacity" title="High"></div>
           </div>
        </div>

      </div>

      {/* Sisi Kanan: Placeholder Rekomendasi AI (Gemini) (6 Kolom) */}
      <div className="col-span-12 lg:col-span-6 flex flex-col">
        <div className="bg-slate-900/5 dark:bg-slate-900 p-10 rounded-3xl border border-slate-200 dark:border-slate-800 flex-grow shadow-inner">
          <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-xl bg-slate-900 dark:bg-emerald-500 flex items-center justify-center text-white dark:text-slate-950">
                <i className="fa-solid fa-sparkles"></i>
              </div>
              <h3 className="text-xl font-bold text-slate-800 dark:text-white">Saran AI (Powered by Gemini)</h3>
          </div>
          
          <div className="prose dark:prose-invert prose-slate prose-sm text-slate-700 dark:text-slate-400">
             {!advice ? (
               <div className="border-2 border-dashed border-slate-300 dark:border-slate-700 p-6 rounded-2xl text-center text-slate-500 dark:text-slate-600">
                 Teks saran khusus berdasarkan respon AI timmu akan muncul di sini (Tinggal Hubungkan ke Gemini API).
               </div>
             ) : (
               <>
                 {/* Teks Gemini yang sesungguhnya nanti di sini */}
                 {advice} 
               </>
             )}
          </div>
        </div>

        <button 
          onClick={onReset}
          className="w-full mt-8 bg-transparent border-2 border-slate-300 text-slate-600 dark:text-slate-400 dark:border-slate-700 font-bold py-4 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
        >
          &larr; Catat Ulang Metrik Hari Ini
        </button>
      </div>

    </div>
  )
}
