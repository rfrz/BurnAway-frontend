export default function RegisterForm() {
  return (
    <form className="flex flex-col gap-5 mt-6">
      <div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block transition-colors">Nama Lengkap</label>
        <input 
          type="text" 
          placeholder="Masukkan nama lengkap"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 outline-none transition-all"
        />
      </div>
      
      <div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block transition-colors">Email</label>
        <input 
          type="email" 
          placeholder="Masukkan email"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 outline-none transition-all"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block transition-colors">Umur</label>
          <input 
            type="number" min="1"
            placeholder="Misal: 20"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 outline-none transition-all"
          />
        </div>
        <div>
          <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block transition-colors">Pengalaman (Thn)</label>
          <input 
            type="number" min="0"
            placeholder="0"
            className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 outline-none transition-all"
          />
        </div>
      </div>
      
      <div>
        <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 mb-1 block transition-colors">Password</label>
        <input 
          type="password" 
          placeholder="Buat password"
          className="w-full px-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-900/50 text-slate-900 dark:text-white placeholder-slate-400 dark:placeholder-slate-500 focus:ring-2 focus:ring-sky-500 dark:focus:ring-sky-400 outline-none transition-all"
        />
      </div>
      
      <button 
        type="button"
        className="w-full mt-4 bg-sky-600 dark:bg-sky-500 text-white font-bold py-3 rounded-lg hover:bg-sky-700 dark:hover:bg-sky-400 active:scale-95 transition-all shadow-md cursor-pointer"
      >
        Daftar
      </button>
    </form>
  )
}
