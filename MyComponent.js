import React from 'react';
import { useTranslation } from 'react-i18next';
import { SystemPurposes, SystemPurposeId } from './src/data';
import i18n from './i18n'; // 从正确的路径导入 i18n 实例

const MyComponent = () => {
  const { t } = useTranslation();

  const renderSystemPurpose = (purposeId) => {
    const purpose = SystemPurposes[purposeId];
    return (
      <div>
        <h2>{t(`SystemPurposes.${purposeId}.title`)}</h2>
        <p>{t(`SystemPurposes.${purposeId}.description`)}</p>
        <p>{t(`SystemPurposes.${purposeId}.systemMessage`)}</p>
        <p>{purpose.symbol}</p>
        {purpose.examples && purpose.examples.map((example, index) => (
          <p key={index}>{t(example)}</p>
        ))}
      </div>
    );
  };

  return (
    <div>
      {renderSystemPurpose('Developer')}
    </div>
  );
};

const WrappedMyComponent = () => (
  <I18nextProvider i18n={i18n}>
    <MyComponent />
  </I18nextProvider>
);

export default WrappedMyComponent;
