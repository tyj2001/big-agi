import i18n from 'i18next';

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

export const FLATTEN_PROFILES: FlattenProfile[] = [
  {
    type: 'brief',
    name: i18n.t('Brief'),
    description: i18n.t('Concise overview with main points and actions'),
    emoji: '⚡',
    systemPrompt: i18n.t('Create a brief and concise summary of the given conversation thread, focusing on the most important points, recent developments, and key actionable insights. Maintain enough context for future reference and exclude any references to the user or the assistant. ') + systemPromptSuffix,
    userPrompt: i18n.t('Please create a brief and concise summary for the conversation below, focusing on the most important points, recent developments, and key actionable insights, while maintaining enough context for future reference:'),
  },
  {
    type: 'deep',
    name: i18n.t('Detailed'),
    description: i18n.t('Detailed summary with synthesized ideas'),
    emoji: '🔎',
    systemPrompt: i18n.t('Provide a comprehensive and detailed summary of the given conversation thread, capturing context and background, all recent and relevant points, preserving context, and synthesizing related ideas. Highlight actionable insights and stakeholder considerations, while excluding references to the user or the assistant. ') + systemPromptSuffix,
    userPrompt: i18n.t('Please provide a detailed summary of the conversation below, capturing context and background, all recent and relevant points, preserving context, synthesizing related ideas, highlighting actionable insights, and including any stakeholder considerations:'),
  },
  {
    type: 'exploration',
    name: i18n.t('Open-ended'),
    description: i18n.t('Open-ended summary for further discussion'),
    emoji: '🌱',
    systemPrompt: i18n.t('Summarize the given conversation thread in a way that invites further exploration, encourages the addition of new perspectives, and identifies knowledge gaps or unanswered questions. Foster continued discussion on the topic while excluding references to the user or the assistant. ') + systemPromptSuffix,
    userPrompt: i18n.t('Please summarize the conversation below in a way that invites further exploration, encourages the addition of new perspectives, identifies knowledge gaps or unanswered questions, and fosters continued discussion on the topic:'),
  },
  {
    type: 'action',
    name: i18n.t('Actionable'),
    description: i18n.t('Summary with decisions, actions, and context'),
    emoji: '📌',
    systemPrompt: i18n.t('Generate a summary of the given conversation thread that emphasizes decisions made, agreed-upon next steps, and action items from the discussion. Capture the context, key points, and any potential challenges or opportunities, while excluding references to the user or the assistant. ') + systemPromptSuffix,
    userPrompt: i18n.t('Please generate a summary of the conversation below that emphasizes decisions made, agreed-upon next steps, and action items from the discussion, while also capturing the context, key points, and any potential challenges or opportunities:'),
  },
];
