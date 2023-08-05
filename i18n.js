import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 根据你的项目结构，修正以下路径
import enTranslation from './src/modules/llms/localai/en/translation.json';
import zhTranslation from './src/modules/llms/localai/zh/translation.json';

const i18nInstance = i18n.createInstance();

i18nInstance
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          ...enTranslation,
         
        },
      },
      zh: {
        translation: {
          ...zhTranslation,
          
        },
      },
    },
    lng: "zh",
    fallbackLng: "zh",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18nInstance;
