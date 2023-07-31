import React from 'react';
import { useTranslation, I18nextProvider } from 'react-i18next'; // 导入 I18nextProvider
import { SystemPurposes, SystemPurposeId } from './src/data'; // 修正路径
import i18n from '../i18n'; // 修正路径

const MyComponent: React.FC = () => {
  const { t } = useTranslation();

  const renderSystemPurpose = (purposeId: SystemPurposeId) => {
    const purpose = SystemPurposes[purposeId];
    return (
      <div>
        <h2>{t(purpose.title)}</h2>
        <p>{t(purpose.description)}</p>
        <p>{t(purpose.systemMessage)}</p>
        <p>{purpose.symbol}</p>
        {purpose.examples && purpose.examples.map((example, index) => (
          <p key={index}>{t(example)}</p>
        ))}
      </div>
    );
  };

  return (
    <I18nextProvider i18n={i18n}> {/* 将 MyComponent 包裹在 I18nextProvider 中 */}
      <div>
        {renderSystemPurpose('Developer')}
        {renderSystemPurpose('Scientist')}
        {renderSystemPurpose('Catalyst')}
        {renderSystemPurpose('Executive')}
        {renderSystemPurpose('Designer')}
        {renderSystemPurpose('Generic')}
        {renderSystemPurpose('Custom')}
      </div>
    </I18nextProvider>
  );
};

export default MyComponent;
