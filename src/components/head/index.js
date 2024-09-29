import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import LanguageSwitcher from '../language-switcher';

function Head({ title, currentLanguage, setLanguage, languages, labels }) {
  const cn = bem('Head');

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <LanguageSwitcher
        currentLanguage={currentLanguage}
        setLanguage={setLanguage}
        languages={languages}
        labels={labels}
      />
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node.isRequired,
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

export default memo(Head);
