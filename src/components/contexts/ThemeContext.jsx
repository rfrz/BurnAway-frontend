import { createContext, useState, useEffect, useContext } from 'react'

const ThemeContext = createContext()

export function ThemeProvider({ children }) {
  // 1. Default mutlak: false (Mode Terang)
  const [isDark, setIsDark] = useState(false)

  useEffect(() => {
    // 2. Hanya mengecek apakah user pernah menekan tombol sakelar sebelumnya
    const savedTheme = localStorage.getItem('theme')
    
    if (savedTheme === 'dark') {
      setIsDark(true)
      document.documentElement.classList.add('dark')
    } else {
      // 3. Jika baru pertama kali buka (kosong) ATAU user memilih light, paksa terang
      setIsDark(false)
      document.documentElement.classList.remove('dark')
      // Opsional: Langsung patenkan 'light' di memori sejak kunjungan pertama
      localStorage.setItem('theme', 'light') 
    }
  }, [])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove('dark')
      localStorage.setItem('theme', 'light')
      setIsDark(false)
    } else {
      document.documentElement.classList.add('dark')
      localStorage.setItem('theme', 'dark')
      setIsDark(true)
    }
  }

  return (
    <ThemeContext.Provider value={{ isDark, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  )
}

export const useTheme = () => useContext(ThemeContext)