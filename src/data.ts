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
    title: useTranslation('Developer.title'),
    description: useTranslation('Developer.description'),
    systemMessage: useTranslation('Developer.systemMessage'),
    symbol: '👩‍💻',
    examples: useTranslation('Developer.examples', { returnObjects: true }),
  },
  Scientist: {
    title: useTranslation('Scientist.title'),
    description: useTranslation('Scientist.description'),
    systemMessage: useTranslation('Scientist.systemMessage'),
    symbol: '🔬',
    examples: useTranslation('Scientist.examples', { returnObjects: true }),
  },
  Catalyst: {
    title: useTranslation('Catalyst.title'),
    description: useTranslation('Catalyst.description'),
    systemMessage: useTranslation('Catalyst.systemMessage'),
    symbol: '🚀',
    examples: useTranslation('Catalyst.examples', { returnObjects: true }),
  },
  Executive: {
    title: useTranslation('Executive.title'),
    description: useTranslation('Executive.description'),
    systemMessage: useTranslation('Executive.systemMessage'),
    symbol: '👔',
    examples: useTranslation('Executive.examples', { returnObjects: true }),
  },
  Designer: {
    title: useTranslation('Designer.title'),
    description: useTranslation('Designer.description'),
    systemMessage: useTranslation('Designer.systemMessage'),
    symbol: '🖌️',
    examples: useTranslation('Designer.examples', { returnObjects: true }),
  },
  Generic: {
    title: useTranslation('Generic.title'),
    description: useTranslation('Generic.description'),
    systemMessage: useTranslation('Generic.systemMessage'),
    symbol: '🧠',
    examples: useTranslation('Generic.examples', { returnObjects: true }),
  },
  Custom: {
    title: useTranslation('Custom.title'),
    description: useTranslation('Custom.description'),
    systemMessage: useTranslation('Custom.systemMessage'),
    symbol: '✨',
  },
};
