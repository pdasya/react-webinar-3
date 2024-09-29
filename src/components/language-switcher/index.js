import React from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';

function LanguageSwitcher({ currentLanguage, setLanguage, languages, labels }) {
  const cn = bem('LanguageSwitcher');

  return (
    <div className={cn()}>
      <select onChange={e => setLanguage(e.target.value)} defaultValue={currentLanguage}>
        <option value={languages.ru}>{labels.russian}</option>
        <option value={languages.en}>{labels.english}</option>
      </select>
    </div>
  );
}

LanguageSwitcher.propTypes = {
  currentLanguage: PropTypes.string.isRequired,
  setLanguage: PropTypes.func.isRequired,
  languages: PropTypes.shape({
    ru: PropTypes.string.isRequired,
    en: PropTypes.string.isRequired,
  }).isRequired,
  labels: PropTypes.shape({
    russian: PropTypes.string.isRequired,
    english: PropTypes.string.isRequired,
  }).isRequired,
};

export default LanguageSwitcher;
