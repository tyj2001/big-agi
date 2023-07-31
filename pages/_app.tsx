import * as React from 'react';
import Head from 'next/head';
import { Analytics as VercelAnalytics } from '@vercel/analytics/react';
import { AppProps } from 'next/app';
import { CacheProvider, EmotionCache } from '@emotion/react';
import { CssBaseline, CssVarsProvider } from '@mui/joy';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

import { apiQuery } from '~/modules/trpc/trpc.client';

import '~/common/styles/GithubMarkdown.css';
import { Brand } from '~/common/brand';
import { createEmotionCache, theme } from '~/common/theme';

import i18n from '../i18n'; // 确保从正确的路径导入 i18n 文件

// Client-side cache, shared for the whole session of the user in the browser.
const clientSideEmotionCache = createEmotionCache();

export interface MyAppProps extends AppProps {
  emotionCache?: EmotionCache;
}

function MyApp({ Component, emotionCache = clientSideEmotionCache, pageProps }: MyAppProps) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
  }));

  // 使用状态来检测 i18n 是否初始化完成
  const [i18nInitialized, setI18nInitialized] = React.useState(false);

  // 在组件挂载时初始化 i18n
  React.useEffect(() => {
    i18n.init().then(() => {
      setI18nInitialized(true);
    });
  }, []);

  // 只有当 i18n 初始化完成后才渲染组件
  return (
    <>
      <CacheProvider value={emotionCache}>
        <Head>
          <title>{Brand.Title.Common}</title>
          <meta name='viewport' content='minimum-scale=1, initial-scale=1, width=device-width, shrink-to-fit=no' />
        </Head>
        {/* Rect-query provider */}
        <QueryClientProvider client={queryClient}>
          {/* 添加 I18nextProvider 组件 */}
          <I18nextProvider i18n={i18n}>
            <CssVarsProvider defaultMode='light' theme={theme}>
              {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
              <CssBaseline />
              {i18nInitialized && <Component {...pageProps} />}
            </CssVarsProvider>
          </I18nextProvider>
        </QueryClientProvider>
      </CacheProvider>
      <VercelAnalytics debug={false} />
    </>
  );
}

// enables the react-query api invocation
export default apiQuery.withTRPC(MyApp);
