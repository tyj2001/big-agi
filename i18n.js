import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './src/modules/llms/localai/en/translation.json';
import zhTranslation from './src/modules/llms/localai/zh/translation.json';

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
    },
    lng: "zh",
    fallbackLng: "zh",

    interpolation: {
      escapeValue: false
    }
  });

export default i18n;
