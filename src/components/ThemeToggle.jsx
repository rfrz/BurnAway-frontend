import { useTheme } from '../contexts/ThemeContext.jsx'

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  const getIcon = () => {
    if (theme === 'light') return 'fa-sun';
    if (theme === 'dark') return 'fa-moon';
    return 'fa-desktop'; // System
  };

  const getTitle = () => {
    if (theme === 'light') return 'Mode Terang (Klik untuk Gelap)';
    if (theme === 'dark') return 'Mode Gelap (Klik untuk Sistem)';
    return 'Ikut Sistem (Klik untuk Terang)';
  };

  return (
    <button 
      onClick={toggleTheme}
      className="w-10 h-10 rounded-full flex items-center justify-center bg-slate-200 dark:bg-slate-700 hover:bg-slate-300 dark:hover:bg-slate-600 transition-colors cursor-pointer text-slate-700 dark:text-slate-300"
      title={getTitle()}
    >
      <i className={`fa-solid ${getIcon()} text-lg`}></i>
    </button>
  )
}