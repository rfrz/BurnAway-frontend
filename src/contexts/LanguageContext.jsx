import { useCallback, useState, useEffect } from 'react';
import idLocale from '../locales/id.json';
import enLocale from '../locales/en.json';
import { LanguageContext } from './languageContext.js';

const LOCALES = {
  id: idLocale,
  en: enLocale
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState(() => {
    return localStorage.getItem('burnaway_locale') || 'id';
  });

  useEffect(() => {
    localStorage.setItem('burnaway_locale', language);
  }, [language]);

  const changeLanguage = (lang) => {
    if (LOCALES[lang]) {
      setLanguage(lang);
    }
  };

  const t = useCallback((path, params = {}) => {
    const keys = path.split('.');
    let current = LOCALES[language];
    
    for (const key of keys) {
      if (current?.[key] === undefined) {
        console.warn(`Translation key not found: ${path} for language: ${language}`);
        return path;
      }
      current = current[key];
    }
    
    if (typeof current === 'string') {
      return current.replace(/\{(\w+)\}/g, (match, key) => {
        return params[key] ?? match;
      });
    }

    return current;
  }, [language]);

  const localeCode = language === 'id' ? 'id-ID' : 'en-US';

  return (
    <LanguageContext.Provider value={{ language, localeCode, changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
