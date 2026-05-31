import { createContext, useContext, useState, useEffect } from 'react';
import idLocale from '../locales/id.json';
import enLocale from '../locales/en.json';

const LanguageContext = createContext();

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('burnaway_locale') || 'id';
  });

  const locales = {
    id: idLocale,
    en: enLocale
  };

  useEffect(() => {
    localStorage.setItem('burnaway_locale', language);
  }, [language]);

  const changeLanguage = (lang) => {
    if (locales[lang]) {
      setLanguage(lang);
    }
  };

  const t = (path) => {
    const keys = path.split('.');
    let current = locales[language];
    
    for (const key of keys) {
      if (current[key] === undefined) {
        console.warn(`Translation key not found: ${path} for language: ${language}`);
        return path;
      }
      current = current[key];
    }
    
    return current;
  };

  return (
    <LanguageContext.Provider value={{ language, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
