import React, { createContext, useContext, useState, useEffect } from 'react';
import { t as translate, languages } from '../data/translations';

const LanguageContext = createContext();

export const useLanguage = () => useContext(LanguageContext);

export const LanguageProvider = ({ children }) => {
  // Initialize language from localStorage, default to 'en'
  const [language, setLanguageState] = useState(() => {
    const saved = localStorage.getItem('appLanguage');
    return saved || 'en';
  });

  const setLanguage = (langCode) => {
    setLanguageState(langCode);
    localStorage.setItem('appLanguage', langCode);
  };

  useEffect(() => {
    // Determine text direction. Urdu ('ur') is RTL.
    // Additional RTL languages (Arabic, Persian, etc.) could be added here later.
    if (language === 'ur') {
      document.documentElement.dir = 'rtl';
      document.documentElement.lang = 'ur';
    } else {
      document.documentElement.dir = 'ltr';
      document.documentElement.lang = language;
    }
  }, [language]);

  // Provide a specialized t function bound to the current language
  const t = (key, params) => translate(language, key, params);

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, languages }}>
      {children}
    </LanguageContext.Provider>
  );
};
