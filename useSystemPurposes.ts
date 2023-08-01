import * as React from 'react';
import { useTranslation } from 'react-i18next';

export type SystemPurposeId = 'Catalyst' | 'Custom' | 'Designer' | 'Developer' | 'Executive' | 'Generic' | 'Scientist';

export const defaultSystemPurposeId: SystemPurposeId = 'Generic';

type SystemPurposeData = {
  title: string;
  description: string | React.ReactNode;
  systemMessage: string;
  symbol: string;
  examples?: string[];
  highlighted?: boolean;
}

const useSystemPurposes = () => {
  const { t } = useTranslation();

  const SystemPurposes: { [key in SystemPurposeId]: SystemPurposeData } = {
    Developer: {
      title: t('SystemPurposes.Developer.title'),
      description: t('SystemPurposes.Developer.description'),
      systemMessage: t('SystemPurposes.Developer.systemMessage'),
      symbol: t('SystemPurposes.Developer.symbol')
    },
    // 为其他 SystemPurposeId 添加相应的翻译
    ...
  };

  return SystemPurposes;
};
 
export default useSystemPurposes;
