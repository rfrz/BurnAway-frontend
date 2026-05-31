export default function TrendChart() {
  return (
    <div className="bg-slate-200 dark:bg-slate-800 rounded-3xl p-8 h-80 flex flex-col justify-between shadow-sm dark:shadow-none transition-colors duration-300">
      
      <h4 className="font-bold text-slate-700 dark:text-white text-sm transition-colors">
        Tren Tingkat Stres Mingguan
      </h4>

      <div className="w-full h-48 border-b-2 border-l-2 border-slate-400 dark:border-slate-600 relative mt-4 transition-colors">
        
        <div className="absolute bottom-12 left-10 w-4/5 h-20 border-t-2 border-slate-500 dark:border-emerald-400 -rotate-12 transform origin-left transition-colors drop-shadow-sm dark:drop-shadow-[0_0_8px_rgba(52,211,153,0.5)]"></div>
        
        <div className="absolute bottom-[88px] right-[8%] w-3 h-3 bg-slate-500 dark:bg-emerald-400 rounded-full transition-colors shadow-sm dark:shadow-[0_0_10px_rgba(52,211,153,0.8)]"></div>
      </div>
    </div>
  )
}
