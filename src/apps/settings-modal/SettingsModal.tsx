import { promises as fs } from 'fs';
import path from 'path';
import { useRouter } from 'next/router';

const translateText = async (text, locale) => {
  // 在这里使用你选择的翻译服务或库来翻译文本
  // 这里只是一个示例，你需要根据实际情况进行修改
  if (locale === 'zh-CN') {
    // 将英文翻译成中文
    return '翻译后的文本';
  } else {
    // 如果是其他语言，不进行翻译
    return text;
  }
};

export default function TranslatePage({ content }) {
  const router = useRouter();
  const { locale } = router;

  return <div>{content}</div>;
}

export async function getStaticPaths() {
  const pagesDir = path.join(process.cwd(), 'pages');
  const filenames = await fs.readdir(pagesDir);

  const paths = filenames
    .filter((filename) => path.extname(filename) === '.js') // 只选择 JavaScript 文件
    .map((filename) => ({
      params: { slug: filename.replace('.js', '') },
    }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const { slug } = params;
  const pagePath = path.join(process.cwd(), 'pages', `${slug}.js`);
  const fileContent = await fs.readFile(pagePath, 'utf8');

  // 提取文本内容，这里只是一个简单的示例，你可能需要根据实际情况进行修改
  const content = fileContent.match(/'([^']+)'/)[1];

  // 翻译文本
  const translatedContent = await translateText(content, 'zh-CN');

  return {
    props: {
      content: translatedContent,
    },
  };
}
