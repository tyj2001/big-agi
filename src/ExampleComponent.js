import React from 'react';
import { useTranslation } from 'react-i18next';
import { SystemPurposes } from './data';

const ExampleComponent = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('zh')}>中文</button>

      {Object.keys(SystemPurposes).map((key) => {
        const systemPurpose = SystemPurposes[key];
        return (
          <div key={key}>
            <h1>{t(`SystemPurposes.${key}.title`)}</h1>
            <p>{t(`SystemPurposes.${key}.description`)}</p>
            <p>{t(`SystemPurposes.${key}.systemMessage`)}</p>
            <p>{t(`SystemPurposes.${key}.symbol`)}</p>
            <ul>
              {systemPurpose.examples &&
                systemPurpose.examples.map((example, index) => (
                  <li key={index}>{t(example)}</li>
                ))}
            </ul>
          </div>
        );
      })}
    </div>
  );
};

export default ExampleComponent;
