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
    Scientist: {
      title: t('SystemPurposes.Scientist.title'),
      description: t('SystemPurposes.Scientist.description'),
      systemMessage: t('SystemPurposes.Scientist.systemMessage'),
      symbol: t('SystemPurposes.Scientist.symbol')
    },
    Catalyst: {
      title: t('SystemPurposes.Catalyst.title'),
      description: t('SystemPurposes.Catalyst.description'),
      systemMessage: t('SystemPurposes.Catalyst.systemMessage'),
      symbol: t('SystemPurposes.Catalyst.symbol')
    },
    Executive: {
      title: t('SystemPurposes.Executive.title'),
      description: t('SystemPurposes.Executive.description'),
      systemMessage: t('SystemPurposes.Executive.systemMessage'),
      symbol: t('SystemPurposes.Executive.symbol')
    },
    Designer: {
      title: t('SystemPurposes.Designer.title'),
      description: t('SystemPurposes.Designer.description'),
      systemMessage: t('SystemPurposes.Designer.systemMessage'),
      symbol: t('SystemPurposes.Designer.symbol')
    },
    Generic: {
      title: t('SystemPurposes.Generic.title'),
      description: t('SystemPurposes.Generic.description'),
      systemMessage: t('SystemPurposes.Generic.systemMessage'),
      symbol: t('SystemPurposes.Generic.symbol')
    },
    Custom: {
      title: t('SystemPurposes.Custom.title'),
      description: t('SystemPurposes.Custom.description'),
      systemMessage: t('SystemPurposes.Custom.systemMessage'),
      symbol: t('SystemPurposes.Custom.symbol')
    }
  };

  return SystemPurposes;
};
 
export default useSystemPurposes;
