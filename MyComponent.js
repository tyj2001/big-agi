import React from 'react';
import { useTranslation } from 'react-i18next';
import { SystemPurposes, SystemPurposeId } from './src/data.ts';

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
    <div>
      {renderSystemPurpose('Developer')}
      {renderSystemPurpose('Scientist')}
      {renderSystemPurpose('Catalyst')}
      {renderSystemPurpose('Executive')}
      {renderSystemPurpose('Designer')}
      {renderSystemPurpose('Generic')}
      {renderSystemPurpose('Custom')}
    </div>
  );
};

export default MyComponent;
