import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// 导入你的翻译文件
import enTranslation from './src/modules/llms/localai/en/translation.json';
import zhTranslation from './src/modules/llms/localai/zh/translation.json';

// 初始化i18n实例
i18n.use(initReactI18next).init({
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
