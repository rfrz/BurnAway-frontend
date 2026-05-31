import { Link } from 'react-router-dom'

export default function ActionCard() {
  return (
    <div className="bg-slate-200 dark:bg-slate-800 rounded-3xl p-8 h-64 flex flex-col items-center justify-center text-center shadow-sm dark:shadow-none transition-colors duration-300">
      
      <h3 className="text-xl font-bold text-slate-800 dark:text-white mb-2 transition-colors">
        Bagikan Aktivitasmu!
      </h3>
      
      <p className="text-xs text-slate-500 dark:text-slate-400 max-w-52 transition-colors">
        Catat jam tidur, stres, dan produktivitasmu hari ini.
      </p>
      
      <Link 
        to="/predict"
        className="mt-6 px-10 py-3 bg-slate-500 dark:bg-slate-600 text-white font-bold rounded-xl hover:bg-slate-600 dark:hover:bg-slate-500 transition-all shadow-md dark:shadow-none hover:shadow-lg hover:-translate-y-1"
      >
        Catat
      </Link>
    </div>
  )
}
