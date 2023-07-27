import { useTranslation } from 'react-i18next';

export type FlattenStyleType = 'brief' | 'deep' | 'exploration' | 'action';

interface FlattenProfile {
  type: FlattenStyleType;
  name: string;
  description: string;
  emoji: string;
  systemPrompt: string;
  userPrompt: string;
}

const systemPromptSuffix = 'Ensure the summary is impersonal and easy to read, write clear and separated paragraphs and use bullet points when possible.';

export function useFlattenProfiles() {
  const { t } = useTranslation();

  return [
    {
      type: 'brief',
      name: t('briefName'),
      description: t('briefDescription'),
      emoji: '⚡',
      systemPrompt: t('briefSystemPrompt', { systemPromptSuffix }),
      userPrompt: t('briefUserPrompt'),
    },
    {
      type: 'deep',
      name: t('detailedName'),
      description: t('detailedDescription'),
      emoji: '🔎',
      systemPrompt: t('detailedSystemPrompt', { systemPromptSuffix }),
      userPrompt: t('detailedUserPrompt'),
    },
    {
      type: 'exploration',
      name: t('openEndedName'),
      description: t('openEndedDescription'),
      emoji: '🌱',
      systemPrompt: t('openEndedSystemPrompt', { systemPromptSuffix }),
      userPrompt: t('openEndedUserPrompt'),
    },
    {
      type: 'action',
      name: t('actionableName'),
      description: t('actionableDescription'),
      emoji: '📌',
      systemPrompt: t('actionableSystemPrompt', { systemPromptSuffix }),
      userPrompt: t('actionableUserPrompt'),
    },
  ] as FlattenProfile[];
}
