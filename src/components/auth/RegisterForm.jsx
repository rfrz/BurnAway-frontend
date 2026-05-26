export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-5 mt-6">
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-1 block">Nama Lengkap</label>
        <input 
          type="text" 
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-1 block">Email</label>
        <input 
          type="email" 
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">Umur</label>
          <input 
            type="number" min="1"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 mb-1 block">Pengalaman (Thn)</label>
          <input 
            type="number" min="0"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
          />
        </div>
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-1 block">Password</label>
        <input 
          type="password" 
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none"
        />
      </div>
      <button 
        type="button"
        className="w-full mt-4 bg-sky-950 text-white font-bold py-3 rounded-lg hover:bg-sky-900 transition-colors"
      >
        Daftar
      </button>
    </form>
  )
}