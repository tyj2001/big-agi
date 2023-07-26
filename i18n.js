import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: require('../src/modules/llms/localai/en/translation.json'),
    },
    zh: {
      translation: require('../src/modules/llms/localai/zh/translation.json'),
    },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
