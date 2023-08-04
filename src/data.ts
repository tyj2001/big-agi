import * as React from 'react';
import { useTranslation } from 'react-i18next';

export type SystemPurposeId = 'Catalyst' | 'Custom' | 'Designer' | 'Developer' | 'Executive' | 'Generic' | 'Scientist';

export const defaultSystemPurposeId: SystemPurposeId = 'Generic';

type SystemPurposeData = {
  title: string;
  description: string | React.JSX.Element;
  systemMessage: string;
  symbol: string;
  examples?: string[];
  highlighted?: boolean;
}

export const SystemPurposes: { [key in SystemPurposeId]: () => SystemPurposeData } = {
  Developer: () => {
    const { t } = useTranslation();
    return {
      title: t('Developer.title'),
      description: t('Developer.description'),
      systemMessage: t('Developer.systemMessage'),
      symbol: '👩‍💻',
      examples: t('Developer.examples', { returnObjects: true })
    };
  },
  Scientist: () => {
    const { t } = useTranslation();
    return {
      title: t('Scientist.title'),
      description: t('Scientist.description'),
      systemMessage: t('Scientist.systemMessage'),
      symbol: '🔬',
      examples: t('Scientist.examples', { returnObjects: true })
    };
  },
  Catalyst: () => {
    const { t } = useTranslation();
    return {
      title: t('Catalyst.title'),
      description: t('Catalyst.description'),
      systemMessage: t('Catalyst.systemMessage'),
      symbol: '🚀',
      examples: t('Catalyst.examples', { returnObjects: true })
    };
  },
  Executive: () => {
    const { t } = useTranslation();
    return {
      title: t('Executive.title'),
      description: t('Executive.description'),
      systemMessage: t('Executive.systemMessage'),
      symbol: '👔',
      examples: t('Executive.examples', { returnObjects: true })
    };
  },
  Designer: () => {
    const { t } = useTranslation();
    return {
      title: t('Designer.title'),
      description: t('Designer.description'),
      systemMessage: t('Designer.systemMessage'),
      symbol: '🖌️',
      examples: t('Designer.examples', { returnObjects: true })
    };
  },
  Generic: () => {
    const { t } = useTranslation();
    return {
      title: t('Generic.title'),
      description: t('Generic.description'),
      systemMessage: t('Generic.systemMessage'),
      symbol: '🧠',
      examples: t('Generic.examples', { returnObjects: true })
    };
  },
  Custom: () => {
    const { t } = useTranslation();
    return {
      title: t('Custom.title'),
      description: t('Custom.description'),
      systemMessage: t('Custom.systemMessage'),
      symbol: '✨',
    };
  },
};

// In your other component file where you are trying to use SystemPurposes
// Import SystemPurposes and use it like this:

// import { SystemPurposes } from './path_to_your_file';

// Inside your component:
const systemPurposeData = SystemPurposes[systemPurposeId]();
const textSymbol = systemPurposeData?.symbol || '❓';
