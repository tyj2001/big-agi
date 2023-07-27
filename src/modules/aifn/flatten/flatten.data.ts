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

  const FLATTEN_PROFILES: FlattenProfile[] = [
    {
      type: 'brief',
      name: t('Brief'),
      description: t('Concise overview with main points and actions'),
      emoji: '⚡',
      systemPrompt: t('Create a brief and concise summary of the given conversation thread, focusing on the most important points, recent developments, and key actionable insights. Maintain enough context for future reference and exclude any references to the user or the assistant. ') + systemPromptSuffix,
      userPrompt: t('Please create a brief and concise summary for the conversation below, focusing on the most important points, recent developments, and key actionable insights, while maintaining enough context for future reference:'),
    },
    {
      type: 'deep',
      name: t('Detailed'),
      description: t('Detailed summary with synthesized ideas'),
      emoji: '🔎',
      systemPrompt: t('Provide a comprehensive and detailed summary of the given conversation thread, capturing context and background, all recent and relevant points, preserving context, and synthesizing related ideas. Highlight actionable insights and stakeholder considerations, while excluding references to the user or the assistant. ') + systemPromptSuffix,
      userPrompt: t('Please provide a detailed summary of the conversation below, capturing context and background, all recent and relevant points, preserving context, synthesizing related ideas, highlighting actionable insights, and including any stakeholder considerations:'),
    },
    {
      type: 'exploration',
      name: t('Open-ended'),
      description: t('Open-ended summary for further discussion'),
      emoji: '🌱',
      systemPrompt: t('Summarize the given conversation thread in a way that invites further exploration, encourages the addition of new perspectives, and identifies knowledge gaps or unanswered questions. Foster continued discussion on the topic while excluding references to the user or the assistant. ') + systemPromptSuffix,
      userPrompt: t('Please summarize the conversation below in a way that invites further exploration, encourages the addition of new perspectives, identifies knowledge gaps or unanswered questions, and fosters continued discussion on the topic:'),
    },
    {
      type: 'action',
      name: t('Actionable'),
      description: t('Summary with decisions, actions, and context'),
      emoji: '📌',
      systemPrompt: t('Generate a summary of the given conversation thread that emphasizes decisions made, agreed-upon next steps, and action items from the discussion. Capture the context, key points, and any potential challenges or opportunities, while excluding references to the user or the assistant. ') + systemPromptSuffix,
      userPrompt: t('Please generate a summary of the conversation below that emphasizes decisions made, agreed-upon next steps, and action items from the discussion, while also capturing the context, key points, and any potential challenges or opportunities:'),
    },
  ];

  return FLATTEN_PROFILES;
}
