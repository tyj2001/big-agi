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
    lng: "zh", // 默认语言修改为中文（简体）
    fallbackLng: "zh", // 如缺少其他语言的翻译内容，回退到中文（简体）

    interpolation: {
      escapeValue: false 
    }
  });

export default i18n;
