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

export function SystemPurposes() {
  const { t } = useTranslation();

  return {
    Developer: {
      title: t('Developer.title'),
      description: t('Developer.description'),
      systemMessage: t('Developer.systemMessage'),
      symbol: '👩‍💻',
      examples: t('Developer.examples', { returnObjects: true })
    },
    Scientist: {
      title: t('Scientist.title'),
      description: t('Scientist.description'),
      systemMessage: t('Scientist.systemMessage'),
      symbol: '🔬',
      examples: t('Scientist.examples', { returnObjects: true })
    },
    Catalyst: {
      title: t('Catalyst.title'),
      description: t('Catalyst.description'),
      systemMessage: t('Catalyst.systemMessage'),
      symbol: '🚀',
      examples: t('Catalyst.examples', { returnObjects: true })
    },
    Executive: {
      title: t('Executive.title'),
      description: t('Executive.description'),
      systemMessage: t('Executive.systemMessage'),
      symbol: '👔',
      examples: t('Executive.examples', { returnObjects: true })
    },
    Designer: {
      title: t('Designer.title'),
      description: t('Designer.description'),
      systemMessage: t('Designer.systemMessage'),
      symbol: '🖌️',
      examples: t('Designer.examples', { returnObjects: true })
    },
    Generic: {
      title: t('Generic.title'),
      description: t('Generic.description'),
      systemMessage: t('Generic.systemMessage'),
      symbol: '🧠',
      examples: t('Generic.examples', { returnObjects: true })
    },
    Custom: {
      title: t('Custom.title'),
      description: t('Custom.description'),
      systemMessage: t('Custom.systemMessage'),
      symbol: '✨',
    },
  } as { [key in SystemPurposeId]: SystemPurposeData };
}
