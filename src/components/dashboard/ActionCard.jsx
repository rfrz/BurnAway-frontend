import { Link } from 'react-router-dom'

export default function ActionCard() {
  return (
    <div className="bg-slate-200 rounded-3xl p-8 h-64 flex flex-col items-center justify-center text-center shadow-sm">
      <h3 className="text-xl font-bold text-slate-800 mb-2">
        Bagikan Aktivitasmu!
      </h3>
      <p className="text-xs text-slate-500 max-w-52">
        Catat jam tidur, stres, dan produktivitasmu hari ini.
      </p>
      <Link 
        to="/predict"
        className="mt-6 px-10 py-3 bg-slate-500 text-white font-bold rounded-xl hover:bg-slate-600 transition-all shadow-md hover:shadow-lg"
      >
        Catat
      </Link>
    </div>
  )
}