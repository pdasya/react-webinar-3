import { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { LanguageContext } from './context.js';
import * as languages from './exports.js';

const languagesList = {
  ru: 'ru',
  en: 'en',
};

function LanguageProvider({ children }) {
  const savedLanguage = localStorage.getItem('appLanguage') || languagesList.ru;
  const [language, setLanguage] = useState(savedLanguage);

  const translate = key => languages[language][key];

  useEffect(() => {
    localStorage.setItem('appLanguage', language);
  }, [language]);

  return (
    <LanguageContext.Provider
      value={{ currentLanguage: language, setLanguage, languagesList, translate }}
    >
      {children}
    </LanguageContext.Provider>
  );
}

LanguageProvider.propTypes = {
  children: PropTypes.node,
};

export default LanguageProvider;
