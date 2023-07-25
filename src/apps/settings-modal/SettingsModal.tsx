import * as React from 'react';
import { useRouter } from 'next/router';

import { Button, Divider, Tab, TabList, TabPanel, Tabs } from '@mui/joy';
import BuildCircleIcon from '@mui/icons-material/BuildCircle';

import { ElevenlabsSettings } from '~/modules/elevenlabs/ElevenlabsSettings';
import { ProdiaSettings } from '~/modules/prodia/ProdiaSettings';

import { GoodModal } from '~/common/components/GoodModal';
import { useUIStateStore } from '~/common/state/store-ui';

import { ToolsSettings } from './ToolsSettings';
import { UISettings } from './UISettings';

/**
 * 组件允许用户修改客户端上通过localStorage持久化的应用程序设置。
 */
export function SettingsModal() {
  const router = useRouter();
  const { settingsOpenTab, closeSettings, openModelsSetup } = useUIStateStore();

  const switchLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
  };

  return (
    <GoodModal
      title={`首选项`}
      open={!!settingsOpenTab}
      onClose={closeSettings}
      startButton={
        <Button variant='plain' color='info' onClick={openModelsSetup} startDecorator={<BuildCircleIcon />}>
          模型
        </Button>
      }
      sx={{ p: { xs: 1, sm: 2, lg: 2.5 } }}
    >
      <Tabs
        aria-label='设置选项卡菜单'
        defaultValue={settingsOpenTab}
        sx={{ borderRadius: 'lg' }}
      >
        <TabList
          variant='soft'
          color='neutral'
          sx={{ mb: 2 /* gap: 3, minus 0.5 for the Tabs-gap, minus 0.5 for perception */ }}
        >
          <Tab value={1}>界面</Tab>
          <Tab value={2}>绘制</Tab>
          <Tab value={3}>语音</Tab>
          <Tab value={4}>工具</Tab>
          <Tab value={5}>语言</Tab>
        </TabList>

        <TabPanel value={1} sx={{ p: 'var(--Tabs-gap)' }}>
          <UISettings />
        </TabPanel>

        <TabPanel value={2} sx={{ p: 'var(--Tabs-gap)' }}>
          <ProdiaSettings />
        </TabPanel>

        <TabPanel value={3} sx={{ p: 'var(--Tabs-gap)' }}>
          <ElevenlabsSettings />
        </TabPanel>

        <TabPanel value={4} sx={{ p: 'var(--Tabs-gap)' }}>
          <ToolsSettings />
        </TabPanel>

        <TabPanel value={5} sx={{ p: 'var(--Tabs-gap)' }}>
          <Button variant='outlined' onClick={() => switchLanguage('en-US')}>
            Switch to English
          </Button>
          <Button variant='outlined' onClick={() => switchLanguage('zh-CN')}>
            切换为中文
          </Button>
        </TabPanel>
      </Tabs>
      <Divider />
    </GoodModal>
  );
}
