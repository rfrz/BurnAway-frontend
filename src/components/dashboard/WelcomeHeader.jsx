export default function WelcomeHeader() {
  return (
    <div className="w-full flex justify-between items-center bg-slate-200 rounded-full px-8 py-4 shadow-sm">
      <h2 className="text-xl font-bold text-slate-800">
        Halo, [User]!
      </h2>
      {/* Avatar Bulat Sederhana */}
      <div className="w-10 h-10 bg-slate-400 rounded-full flex items-center justify-center font-bold text-white shadow-inner">
        U
      </div>
    </div>
  )
}