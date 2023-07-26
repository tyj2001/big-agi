import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './src/modules/llms/localai/en/translation.json';
import zhTranslation from './src/modules/llms/localai/zh/translation.json';

i18n
  .use(initReactI18next) // 通过使用 initReactI18next 传入 i18next 实例
  .init({
    resources: {
      en: {
        translation: enTranslation,
      },
      zh: {
        translation: zhTranslation,
      },
    },
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
