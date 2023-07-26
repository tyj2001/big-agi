// SettingsModal.js
import * as React from "react";
import { useRouter } from "next/router";
import { Button, Divider, Tab, TabList, TabPanel, Tabs } from "@mui/joy";
import BuildCircleIcon from "@mui/icons-material/BuildCircle";
import { ElevenlabsSettings } from "~/modules/elevenlabs/ElevenlabsSettings";
import { ProdiaSettings } from "~/modules/prodia/ProdiaSettings";

import { GoodModal } from "~/common/components/GoodModal";
import { useUIStateStore } from "~/common/state/store-ui";

import { ToolsSettings } from "./ToolsSettings";
import { UISettings } from "./UISettings";

// Import useTranslation hook
import { useTranslation } from 'react-i18next';

export function SettingsModal() {
  const router = useRouter();
  const { settingsOpenTab, closeSettings, openModelsSetup } = useUIStateStore();

  // Initialize the hook
  const { t, i18n } = useTranslation();

  const switchLanguage = (locale: string) => {
    router.push(router.pathname, router.asPath, { locale });
    i18n.changeLanguage(locale); // This line changes the language in react-i18next as well
  };

  return (
    <GoodModal
      title={t('preferences')} 
      open={!!settingsOpenTab}
      onClose={closeSettings}
      startButton={
        <Button variant='plain' color='info' onClick={openModelsSetup} startDecorator={<BuildCircleIcon />}>
          {t('models')} 
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
          <Tab value={1}>{t('interface')}</Tab>
          <Tab value={2}>{t('drawing')}</Tab>
          <Tab value={3}>{t('voice')}</Tab>
          <Tab value={4}>{t('tools')}</Tab>
          <Tab value={5}>{t('language')}</Tab>
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
          <Button variant='outlined' onClick={() => switchLanguage('en')}>
            {t('switchToEnglish')}
          </Button>
          <Button variant='outlined' onClick={() => switchLanguage('zh')}>
            {t('switchToChinese')}
          </Button>
        </TabPanel>
      </Tabs>
      <Divider />
    </GoodModal>
  );
}
