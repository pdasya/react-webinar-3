import { memo } from 'react';
import PropTypes from 'prop-types';
import './style.css';
import { cn as bem } from '@bem-react/classname';
import useLocale from '../../locale/use-locale';

function Head({ title }) {
  const cn = bem('Head');
  const { currentLanguage, setLanguage, languagesList, translate } = useLocale();

  return (
    <div className={cn()}>
      <h1>{title}</h1>
      <div className={cn('langSwitcher')}>
        <select onChange={e => setLanguage(e.target.value)} defaultValue={currentLanguage}>
          <option value={languagesList.ru}>{translate('russian')}</option>
          <option value={languagesList.en}>{translate('english')}</option>
        </select>
      </div>
    </div>
  );
}

Head.propTypes = {
  title: PropTypes.node,
};

export default memo(Head);
