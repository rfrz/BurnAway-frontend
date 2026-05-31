import { useTheme } from '../contexts/ThemeContext.jsx'

export default function ThemeToggle() {
  const { isDark, toggleTheme } = useTheme()

  return (
    <button 
      onClick={toggleTheme}
      // Tambahan border-2 border-red-500 agar tombolnya sangat terlihat jika memang ada di layar
      className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors shadow-inner cursor-pointer border-2 border-gray-500 text-xl"
      title={isDark ? "Ganti ke Mode Terang" : "Ganti ke Mode Gelap"}
    >

      {isDark ? '🌙' : '☀️'}
    </button>
  )
}