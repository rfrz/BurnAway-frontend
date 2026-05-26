export default function LoginForm() {
  return (
    <form className="flex flex-col gap-5 mt-6">
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-1 block">Email</label>
        <input 
          type="email" 
          placeholder="Masukkan email"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
        />
      </div>
      <div>
        <label className="text-sm font-semibold text-slate-700 mb-1 block">Password</label>
        <input 
          type="password" 
          placeholder="Masukkan password"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:ring-2 focus:ring-sky-500 outline-none transition-all"
        />
      </div>
      <button 
        type="button"
        className="w-full mt-4 bg-slate-400 text-white font-bold py-3 rounded-lg hover:bg-slate-500 transition-colors"
      >
        Masuk
      </button>
    </form>
  )
}