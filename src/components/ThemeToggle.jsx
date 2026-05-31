import { useTheme } from '../hooks/useTheme.js'

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
      className="w-10 h-10 flex items-center justify-center transition-colors cursor-pointer text-slate-700 hover:text-[#23b1f5] dark:text-slate-300 dark:hover:text-[#23b1f5]"
      title={getTitle()}
    >
      <i className={`fa-solid ${getIcon()} text-lg`}></i>
    </button>
  )
}
