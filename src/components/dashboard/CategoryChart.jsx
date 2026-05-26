export default function CategoryChart() {
  return (
    <div className="bg-slate-200 rounded-3xl p-8 h-80 flex flex-col justify-between shadow-sm">
      <h4 className="font-bold text-slate-700 text-sm">Distribusi Faktor Burnout</h4>
      {/* Simulasi Grafik Batang Sederhana */}
      <div className="w-full h-48 border-b-2 border-l-2 border-slate-400 flex items-end justify-around px-4 mt-4">
        <div className="w-8 bg-slate-500 h-32 rounded-t-sm"></div>
        <div className="w-8 bg-slate-500 h-20 rounded-t-sm"></div>
        <div className="w-8 bg-slate-500 h-24 rounded-t-sm"></div>
        <div className="w-8 bg-slate-500 h-12 rounded-t-sm"></div>
      </div>
    </div>
  )
}