import { useContext } from 'react';
import { LanguageContext } from './context';

export default function useLocale() {
  return useContext(LanguageContext);
}
