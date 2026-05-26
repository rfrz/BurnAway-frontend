export default function TrendChart() {
  return (
    <div className="bg-slate-200 rounded-3xl p-8 h-80 flex flex-col justify-between shadow-sm">
      <h4 className="font-bold text-slate-700 text-sm">Tren Tingkat Stres Mingguan</h4>
      {/* Simulasi Grafik Garis Sederhana menggunakan Border */}
      <div className="w-full h-48 border-b-2 border-l-2 border-slate-400 relative mt-4">
        <div className="absolute bottom-12 left-10 w-4/5 h-20 border-t-2 border-slate-500 -rotate-12 transform origin-left"></div>
      </div>
    </div>
  )
}