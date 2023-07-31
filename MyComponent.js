import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import enTranslation from './src/modules/llms/localai/en/translation.json'; // 修正路径
import zhTranslation from './src/modules/llms/localai/zh/translation.json'; // 修正路径

const i18nInstance = i18n.createInstance();

i18nInstance
  .use(initReactI18next)
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
      escapeValue: false,
    },
  });

export default i18nInstance;
        {renderSystemPurpose('Executive')}
        {renderSystemPurpose('Designer')}
        {renderSystemPurpose('Generic')}
        {renderSystemPurpose('Custom')}
      </div>
    </I18nextProvider>
  );
};

export default MyComponent;
