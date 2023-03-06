import i18n from 'i18next';
import Backend from 'i18next-http-backend';
import LanguageDetector from 'i18next-browser-languagedetector';
import { initReactI18next } from 'react-i18next';

import vi from './vi/translation.json';
import en from './en/translation.json';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: 'en',
    lng: 'en',
    resources: {
      en: {
        translation: en,
      },
      vi: {
        translation: vi,
      },
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
