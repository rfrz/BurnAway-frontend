import { Link } from 'react-router-dom'

export default function ActionCard() {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-3xl p-6 shadow-sm border border-slate-200 dark:border-slate-700 h-full flex flex-col justify-center items-center text-center transition-colors duration-300">
      
      <div className="w-16 h-16 bg-brand/10 dark:bg-brand/20 text-brand rounded-full flex items-center justify-center text-2xl mb-4">
        <i className="fa-solid fa-heart-circle-check"></i>
      </div>
      
      <h3 className="text-lg font-bold text-slate-900 dark:text-white mb-2">Cek Stres Sekarang</h3>
      <p className="text-slate-500 dark:text-slate-400 text-sm mb-6">
        Jawab beberapa pertanyaan singkat untuk mengetahui kondisi burnout-mu hari ini.
      </p>
      
      <Link 
        to="/predict" 
        className="w-full bg-brand hover:bg-brand-hover text-white font-bold py-3 px-6 rounded-xl transition-all shadow-md active:scale-95 flex items-center justify-center gap-2"
      >
        <span>Mulai Prediksi</span>
        <i className="fa-solid fa-arrow-right text-sm"></i>
      </Link>
    </div>
  )
}
