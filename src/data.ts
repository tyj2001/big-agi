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
title: 'Developer',
description: 'Helps you code',
systemMessage: 'You are a sophisticated, accurate, and modern AI programming assistant',
symbol: '👩‍💻',
examples: ['hello world in 10 languages', 'translate python to typescript', 'find and fix a bug in my code', 'add a mic feature to my NextJS app', 'automate tasks in React'],
},
Scientist: {
title: 'Scientist',
description: 'Helps you write scientific papers',
systemMessage: 'You are a scientist's assistant. You assist with drafting persuasive grants, conducting reviews, and any other support-related tasks with professionalism and logical explanation. You have a broad and in-depth concentration on biosciences, life sciences, medicine, psychiatry, and the mind. Write as a scientific Thought Leader: Inspiring innovation, guiding research, and fostering funding opportunities. Focus on evidence-based information, emphasize data analysis, and promote curiosity and open-mindedness',
symbol: '🔬',
examples: ['write a grant proposal on human AGI', 'review this PDF with an eye for detail', 'explain the basics of quantum mechanics', 'how do I set up a PCR reaction?', 'the role of dark matter in the universe'],
},
Catalyst: {
title: 'Catalyst',
description: 'Growth hacker with marketing superpowers 🚀',
systemMessage: 'You are a marketing extraordinaire for a booming startup fusing creativity, data-smarts, and digital prowess to skyrocket growth & wow audiences. So fun. Much meme. 🚀🎯💡',
symbol: '🚀',
examples: ['blog post on AGI in 2024', 'add much emojis to this tweet', 'overcome procrastination!', 'how can I improve my communication skills?'],
},
Executive: {
title: 'Executive',
description: 'Helps you write business emails',
systemMessage: 'You are an AI corporate assistant. You provide guidance on composing emails, drafting letters, offering suggestions for appropriate language and tone, and assist with editing. You are concise. ' +
'You explain your process step-by-step and concisely. If you believe more information is required to successfully accomplish a task, you will ask for the information (but without insisting).\n' +
'Knowledge cutoff: 2021-09\nCurrent date: {{Today}}',
symbol: '👔',
examples: ['draft a letter to the board', 'write a memo to the CEO', 'help me with a SWOT analysis', 'how do I team build?', 'improve decision-making'],
},
Designer: {
title: 'Designer',
description: 'Helps you design',
systemMessage: 'You are an AI visual design assistant. You are expert in visual communication and aesthetics, creating stunning and persuasive SVG prototypes based on client requests. When asked to design or draw something, please work step by step detailing the concept, listing the constraints, setting the artistic guidelines in painstaking detail, after which please write the SVG code that implements your design.',
symbol: '🖌️',
examples: ['minimalist logo for a tech startup', 'infographic on climate change', 'suggest color schemes for a website'],
},
Generic: {
title: 'Default',
description: 'Helps you think',
systemMessage: 'You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture.\nKnowledge cutoff: 2021-09\nCurrent date: {{Today}}',
symbol: '🧠',
examples: ['help me plan a trip to Japan', 'what is the meaning of life?', 'how do I get a job at OpenAI?', 'what are some healthy meal ideas?'],
},
Custom: {
title: 'Custom',
description: 'User-defined purpose',
systemMessage: 'You are ChatGPT, a large language model trained by OpenAI, based on the GPT-4 architecture.\nCurrent date: {{Today}}',
symbol: '✨',
},
};

// Import translation keys
const translationKeys = {
Developer: {
title: 'Developer.title',
description: 'Developer.description',
systemMessage: 'Developer.systemMessage',
symbol: 'Developer.symbol',
examples: 'Developer.examples',
},
Scientist: {
title: 'Scientist.title',
description: 'Scientist.description',
systemMessage: 'Scientist.systemMessage',
symbol: 'Scientist.symbol',
examples: 'Scientist.examples',
},
Catalyst: {
title: 'Catalyst.title',
description: 'Catalyst.description',
systemMessage: 'Catalyst.systemMessage',
symbol: 'Catalyst.symbol',
examples: 'Catalyst.examples',
},
Executive: {
title: 'Executive.title',
description: 'Executive.description',
systemMessage: 'Executive.systemMessage',
symbol: 'Executive.symbol',
examples: 'Executive.examples',
},
Designer: {
title: 'Designer.title',
description: 'Designer.description',
systemMessage: 'Designer.systemMessage',
symbol: 'Designer.symbol',
examples: 'Designer.examples',
},
Generic: {
title: 'Generic.title',
description: 'Generic.description',
systemMessage: 'Generic.systemMessage',
symbol: 'Generic.symbol',
examples: 'Generic.examples',
},
Custom: {
title: 'Custom.title',
description: 'Custom.description',
systemMessage: 'Custom.systemMessage',
symbol: 'Custom.symbol',
},
};

export function translateSystemPurposes(t: Function) {
const translatedSystemPurposes: { [key in SystemPurposeId]: SystemPurposeData } = {
Catalyst: {
title: t(translationKeys.Catalyst.title),
description: t(translationKeys.Catalyst.description),
systemMessage: t(translationKeys.Catalyst.systemMessage),
symbol: t(translationKeys.Catalyst.symbol),
examples: SystemPurposes.Catalyst.examples ? SystemPurposes.Catalyst.examples.map(example => t(example)) : undefined,
highlighted: SystemPurposes.Catalyst.highlighted,
},
Custom: {
title: t(translationKeys.Custom.title),
description: t(translationKeys.Custom.description),
systemMessage: t(translationKeys.Custom.systemMessage),
symbol: t(translationKeys.Custom.symbol),
},
Designer: {
title: t(translationKeys.Designer.title),
description: t(translationKeys.Designer.description),
systemMessage: t(translationKeys.Designer.systemMessage),
symbol: t(translationKeys.Designer.symbol),
examples: SystemPurposes.Designer.examples ? SystemPurposes.Designer.examples.map(example => t(example)) : undefined,
highlighted: SystemPurposes.Designer.highlighted,
},
Developer: {
title: t(translationKeys.Developer.title),
description: t(translationKeys.Developer.description),
systemMessage: t(translationKeys.Developer.systemMessage),
symbol: t(translationKeys.Developer.symbol),
examples: SystemPurposes.Developer.examples ? SystemPurposes.Developer.examples.map(example => t(example)) : undefined,
highlighted: SystemPurposes.Developer.highlighted,
},
Executive: {
title: t(translationKeys.Executive.title),
description: t(translationKeys.Executive.description),
systemMessage: t(translationKeys.Executive.systemMessage),
symbol: t(translationKeys.Executive.symbol),
examples: SystemPurposes.Executive.examples ? SystemPurposes.Executive.examples.map(example => t(example)) : undefined,
highlighted: SystemPurposes.Executive.highlighted,
},
Generic: {
title: t(translationKeys.Generic.title),
description: t(translationKeys.Generic.description),
systemMessage: t(translationKeys.Generic.systemMessage),
symbol: t(translationKeys.Generic.symbol),
examples: SystemPurposes.Generic.examples ? SystemPurposes.Generic.examples.map(example => t(example)) : undefined,
highlighted: SystemPurposes.Generic.highlighted,
},
Scientist: {
title: t(translationKeys.Scientist.title),
description: t(translationKeys.Scientist.description),
systemMessage: t(translationKeys.Scientist.systemMessage),
symbol: t(translationKeys.Scientist.symbol),
examples: SystemPurposes.Scientist.examples ? SystemPurposes.Scientist.examples.map(example => t(example)) : undefined,
highlighted: SystemPurposes.Scientist.highlighted,
},
};

return translatedSystemPurposes;
}

// 修改 translation.json 文件的路径为你实际的路径
const translationPath = './src/modules/llms/localai/en/translation.json';

// 加载翻译数据
const translationData = require(translationPath);

// 设置 i18n 配置
const i18nConfig = {
resources: {
en: {
translation: translationData,
},
},
lng: 'en',
fallbackLng: 'en',
};

// 初始化 i18n
i18n.init(i18nConfig);

// 在组件中使用 useTranslation
function MyComponent() {
const { t } = useTranslation();

// 使用 translateSystemPurposes 函数获取翻译后的系统目的对象
const translatedSystemPurposes = translateSystemPurposes(t);

// 在组件中使用翻译后的系统目的对象
// ...
}

// 导出组件
export default MyComponent;


