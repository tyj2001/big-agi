import React from 'react';
import { useTranslation } from 'react-i18next';
import { useSystemPurposeTranslation, SystemPurposeId } from '../data';

const ExampleComponent = () => {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  const renderSystemPurpose = (systemPurposeId) => {
    const systemPurpose = useSystemPurposeTranslation(systemPurposeId);

    if (!systemPurpose) {
      return null;
    }

    return (
      <div key={systemPurposeId}>
        <h1>{systemPurpose.title}</h1>
        <p>{systemPurpose.description}</p>
        <p>{systemPurpose.systemMessage}</p>
        <p>{systemPurpose.symbol}</p>
        <ul>
          {systemPurpose.examples &&
            systemPurpose.examples.map((example, index) => (
              <li key={index}>{example}</li>
            ))}
        </ul>
      </div>
    );
  };

  return (
    <div>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('zh')}>中文</button>

      {Object.keys(SystemPurposeId).map((systemPurposeId) =>
        renderSystemPurpose(systemPurposeId)
      )}
    </div>
  );
};

export default ExampleComponent;
