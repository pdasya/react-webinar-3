import { useEffect, useMemo, useState } from 'react';
import useServices from './use-services';

/**
 * Хук возвращает функцию для локализации текстов, код языка и функцию его смены
 */
export default function useTranslate() {
  const { i18n } = useServices();
  const [lang, setLang] = useState(i18n.getLang());

  useEffect(() => {
    const handleLangChange = newLang => {
      setLang(newLang);
    };

    i18n.on('langChange', handleLangChange);

    // Cleanup on unmount
    return () => {
      i18n.off('langChange', handleLangChange);
    };
  }, [i18n]);

  const onSetLang = lang => {
    i18n.setLang(lang);
  };

  const t = (text, number) => i18n.translate(text, number);

  return { t, lang, setLang: onSetLang };
}
