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

export const SystemPurposes: { [key in SystemPurposeId]: SystemPurposeData } = {
  Developer: {
    title: useTranslation().t('Developer.title'),
    description: useTranslation().t('Developer.description'),
    systemMessage: useTranslation().t('Developer.systemMessage'),
    symbol: '👩‍💻',
    examples: [
      useTranslation().t('Developer.examples.0'),
      useTranslation().t('Developer.examples.1'),
      useTranslation().t('Developer.examples.2'),
      useTranslation().t('Developer.examples.3'),
      useTranslation().t('Developer.examples.4'),
    ],
  },
  Scientist: {
    title: useTranslation().t('Scientist.title'),
    description: useTranslation().t('Scientist.description'),
    systemMessage: useTranslation().t('Scientist.systemMessage'),
    symbol: '🔬',
    examples: [
      useTranslation().t('Scientist.examples.0'),
      useTranslation().t('Scientist.examples.1'),
      useTranslation().t('Scientist.examples.2'),
      useTranslation().t('Scientist.examples.3'),
      useTranslation().t('Scientist.examples.4'),
    ],
  },
  Catalyst: {
    title: useTranslation().t('Catalyst.title'),
    description: useTranslation().t('Catalyst.description'),
    systemMessage: useTranslation().t('Catalyst.systemMessage'),
    symbol: '🚀',
    examples: [
      useTranslation().t('Catalyst.examples.0'),
      useTranslation().t('Catalyst.examples.1'),
      useTranslation().t('Catalyst.examples.2'),
      useTranslation().t('Catalyst.examples.3'),
    ],
  },
  Executive: {
    title: useTranslation().t('Executive.title'),
    description: useTranslation().t('Executive.description'),
    systemMessage: useTranslation().t('Executive.systemMessage'),
    symbol: '👔',
    examples: [
      useTranslation().t('Executive.examples.0'),
      useTranslation().t('Executive.examples.1'),
      useTranslation().t('Executive.examples.2'),
      useTranslation().t('Executive.examples.3'),
      useTranslation().t('Executive.examples.4'),
    ],
  },
  Designer: {
    title: useTranslation().t('Designer.title'),
    description: useTranslation().t('Designer.description'),
    systemMessage: useTranslation().t('Designer.systemMessage'),
    symbol: '🖌️',
    examples: [
      useTranslation().t('Designer.examples.0'),
      useTranslation().t('Designer.examples.1'),
      useTranslation().t('Designer.examples.2'),
    ],
  },
  Generic: {
    title: useTranslation().t('Generic.title'),
    description: useTranslation().t('Generic.description'),
    systemMessage: useTranslation().t('Generic.systemMessage'),
    symbol: '🧠',
    examples: [
      useTranslation().t('Generic.examples.0'),
      useTranslation().t('Generic.examples.1'),
      useTranslation().t('Generic.examples.2'),
      useTranslation().t('Generic.examples.3'),
    ],
  },
  Custom: {
    title: useTranslation().t('Custom.title'),
    description: useTranslation().t('Custom.description'),
    systemMessage: useTranslation().t('Custom.systemMessage'),
    symbol: '✨',
  },
};
