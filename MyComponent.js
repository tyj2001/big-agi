import React from 'react';
import { useTranslation } from 'react-i18next';
import { SystemPurposes, SystemPurposeId } from './src/data';

const MyComponent: React.FC = () => {
  const { t } = useTranslation();

  const renderSystemPurpose = (purposeId: SystemPurposeId) => {
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

export default MyComponent;
