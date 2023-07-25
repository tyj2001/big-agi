// i18n.js
import i18n from "i18next";
import { initReactI18next } from "react-i18next";

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: {
          "preferences": "Preferences",
          "models": "Models",
          "interface": "Interface",
          "drawing": "Drawing",
          "voice": "Voice",
          "tools": "Tools",
          "language": "Language",
        }
      },
      zh: {
        translation: {
          "preferences": "首选项",
          "models": "模型",
          "interface": "界面",
          "drawing": "绘制",
          "voice": "语音",
          "tools": "工具",
          "language": "语言",
        }
      }
    },
    lng: "en", 
    fallbackLng: "en",

    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
