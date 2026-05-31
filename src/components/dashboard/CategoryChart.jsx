export default function CategoryChart() {
  return (

    <div className="bg-slate-200 dark:bg-slate-800 rounded-3xl p-8 h-80 flex flex-col justify-between shadow-sm dark:shadow-none transition-colors duration-300">
      
      <h4 className="font-bold text-slate-700 dark:text-white text-sm transition-colors">
        Distribusi Faktor Burnout
      </h4>
      
      <div className="w-full h-48 border-b-2 border-l-2 border-slate-400 dark:border-slate-600 flex items-end justify-around px-4 mt-4 transition-colors">
        
        <div className="w-8 bg-slate-500 dark:bg-slate-400 h-32 rounded-t-sm transition-colors hover:dark:bg-emerald-400"></div>
        <div className="w-8 bg-slate-500 dark:bg-slate-400 h-20 rounded-t-sm transition-colors hover:dark:bg-emerald-400"></div>
        <div className="w-8 bg-slate-500 dark:bg-slate-400 h-24 rounded-t-sm transition-colors hover:dark:bg-emerald-400"></div>
        <div className="w-8 bg-slate-500 dark:bg-slate-400 h-12 rounded-t-sm transition-colors hover:dark:bg-emerald-400"></div>
      </div>
    </div>
  )
}
