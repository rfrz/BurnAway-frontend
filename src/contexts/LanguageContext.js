import { createContext, useState, useEffect, useContext } from 'react'
// Impor kamus bahasa langsung ke dalam context
import en from '../locales/en.json'
import id from '../locales/id.json'

const LanguageContext = createContext()

// Menyisipkan kamus ke dalam satu objek referensi global
const translations = { en, id }

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en')

  useEffect(() => {
    const savedLang = localStorage.getItem('language')
    if (savedLang) {
      setLanguage(savedLang)
    } else {
      setLanguage('en')
      localStorage.setItem('language', 'en')
    }
  }, [])

  const changeLanguage = (langCode) => {
    setLanguage(langCode)
    localStorage.setItem('language', langCode)
  }


  const t = (path) => {
    return path.split('.').reduce((obj, key) => {
      return obj && obj[key]
    }, translations[language]) || path // Jika kunci tidak ditemukan, tampilkan teks aslinya
  }

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  )
}

export const useLanguage = () => useContext(LanguageContext)
