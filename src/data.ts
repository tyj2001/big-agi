import * as React from 'react';
import { useTranslation } from 'react-i18next';

export type SystemPurposeId = 'Catalyst' | 'Custom' | 'Designer' | 'Developer' | 'Executive' | 'Generic' | 'Scientist';

export const defaultSystemPurposeId: SystemPurposeId = 'Generic';

type SystemPurposeData = {
  title: string;
  description: string;
  systemMessage: string;
  symbol: string;
  examples?: string[];
  highlighted?: boolean;
}

export const SystemPurposes: { [key in SystemPurposeId]: SystemPurposeData } = {
  Developer: {
    title: '开发者',
    description: '帮助您编写代码',
    systemMessage: '您是一个精密、准确和现代的AI编程助手',
    symbol: '👩‍💻',
    examples: ['用10种语言编写“Hello, World”', '将Python翻译为TypeScript', '找到并修复我的代码中的错误', '为我的NextJS应用程序添加麦克风功能', '在React中自动化任务'],
  },
  Scientist: {
    title: '科学家',
    description: '帮助您撰写科学论文',
    systemMessage: '您是科学家的助手。您协助起草有说服力的拨款申请书，进行审查，并以专业和逻辑的解释完成任何其他支持性任务。您在生物科学、生命科学、医学、精神病学和心灵方面具有广泛而深入的专注。作为科学思想领袖：激发创新，引导研究，促进资金机会。注重基于证据的信息，强调数据分析，并提倡好奇心和开放思维',
    symbol: '🔬',
    examples: ['撰写关于人工通用智能的拨款提案', '审查这份PDF，注重细节', '解释量子力学的基础知识', '如何设置PCR反应？', '暗物质在宇宙中的作用'],
  },
  Catalyst: {
    title: '催化剂',
    description: '具有营销超能力的增长黑客 🚀',
    systemMessage: '您是一位营销大师，为蓬勃发展的初创公司提供创意、数据智能和数字能力，以实现快速增长并吸引观众。非常有趣。非常梗。🚀🎯💡',
    symbol: '🚀',
    examples: ['2024年关于AGI的博客文章', '在这条推文中添加很多表情符号', '克服拖延症！', '如何提高我的沟通技巧？'],
  },
  Executive: {
    title: '高管',
    description: '帮助您撰写商务电子邮件',
    systemMessage: '您是一位AI企业助理。您提供撰写电子邮件、起草信函、提供适当语言和语气建议以及协助编辑的指导。您言简意赅。您会逐步简明地解释您的过程。如果您认为需要更多信息才能成功完成任务，您将要求提供信息（但不会坚持要求）。\n' +
      '知识截止日期：2021年09月\n当前日期：{{Today}}',
    symbol: '👔',
    examples: ['起草一封给董事会的信', '给CEO写备忘录', '帮助我进行SWOT分析', '如何进行团队建设？', '改善决策能力'],
  },
  Designer: {
    title: '设计师',
    description: '帮助您进行设计',
    systemMessage: '您是一位AI视觉设计助手。您精通视觉传达和美学，根据客户要求创建令人惊叹和有说服力的SVG原型。当被要求设计或绘制某物时，请逐步详细说明概念，列出约束条件，详细设置艺术指导，然后编写实现您设计的SVG代码。',
    symbol: '🖌️',
    examples: ['为科技初创公司设计极简主义的标志', '关于气候变化的信息图', '为网站建议配色方案'],
  },
  Generic: {
    title: '默认',
    description: '帮助您思考',
    systemMessage: '您是ChatGPT，一个基于GPT-4架构的大型语言模型。\n知识截止日期：2021年09月\n当前日期：{{Today}}',
    symbol: '🧠',
    examples: ['帮我规划一次去日本的旅行', '生活的意义是什么？', '如何在OpenAI获得工作？', '一些健康饮食的想法是什么？'],
  },
  Custom: {
    title: '自定义',
    description: '用户定义的目的',
    systemMessage: '您是ChatGPT，一个基于GPT-4架构的大型语言模型。\n当前日期：{{Today}}',
    symbol: '✨',
  },
};

export function useSystemPurposeTranslation(systemPurposeId: SystemPurposeId) {
  const { t } = useTranslation();

  const systemPurpose = SystemPurposes[systemPurposeId];
  if (!systemPurpose) {
    return null;
  }

  const translatedSystemPurpose: SystemPurposeData = {
    title: t(systemPurpose.title),
    description: t(systemPurpose.description),
    systemMessage: t(systemPurpose.systemMessage),
    symbol: systemPurpose.symbol,
    examples: systemPurpose.examples?.map(example => t(example)),
    highlighted: systemPurpose.highlighted,
  };

  return translatedSystemPurpose;
}

