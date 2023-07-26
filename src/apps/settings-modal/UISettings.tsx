import * as React from 'react';
import { shallow } from 'zustand/shallow';

import { Box, FormControl, FormHelperText, FormLabel, Radio, RadioGroup, Stack, Switch, Tooltip } from '@mui/material';
import WidthNormalIcon from '@mui/icons-material/Width';
import WidthWideIcon from '@mui/icons-material/AspectRatio';

import { hideOnMobile, settingsGap } from '~/common/theme';
import { isPwa } from '~/common/util/pwaUtils';
import { useUIPreferencesStore } from '~/common/state/store-ui';

// 导入翻译钩子
import { useTranslation } from 'react-i18next';

// 导入语言配置
import languages from './languages.json' assert { type: 'json' };

// 导入LanguageSelect组件
function LanguageSelect() {
  // 这里是你的LanguageSelect组件的代码
}

// 配置
const SHOW_PURPOSE_FINDER = false;

export function UISettings() {
  // 外部状态
  const {
    centerMode, setCenterMode,
    doubleClickToEdit, setDoubleClickToEdit,
    enterToSend, setEnterToSend,
    goofyLabs, setGoofyLabs,
    renderMarkdown, setRenderMarkdown,
    showPurposeFinder, setShowPurposeFinder,
    zenMode, setZenMode,
  } = useUIPreferencesStore(state => ({
    centerMode: state.centerMode, setCenterMode: state.setCenterMode,
    doubleClickToEdit: state.doubleClickToEdit, setDoubleClickToEdit: state.setDoubleClickToEdit,
    enterToSend: state.enterToSend, setEnterToSend: state.setEnterToSend,
    goofyLabs: state.goofyLabs, setGoofyLabs: state.setGoofyLabs,
    renderMarkdown: state.renderMarkdown, setRenderMarkdown: state.setRenderMarkdown,
    showPurposeFinder: state.showPurposeFinder, setShowPurposeFinder: state.setShowPurposeFinder,
    zenMode: state.zenMode, setZenMode: state.setZenMode,
  }), shallow);

  // 初始化翻译钩子
  const { t } = useTranslation();

  const handleCenterModeChange = (event: React.ChangeEvent<HTMLInputElement>) => setCenterMode(event.target.value as 'narrow' | 'wide' | 'full' || 'wide');

  const handleEnterToSendChange = (event: React.ChangeEvent<HTMLInputElement>) => setEnterToSend(event.target.checked);

  const handleDoubleClickToEditChange = (event: React.ChangeEvent<HTMLInputElement>) => setDoubleClickToEdit(event.target.checked);

  const handleZenModeChange = (event: React.ChangeEvent<HTMLInputElement>) => setZenMode(event.target.value as 'clean' | 'cleaner');

  const handleRenderMarkdownChange = (event: React.ChangeEvent<HTMLInputElement>) => setRenderMarkdown(event.target.checked);

  const handleGoofyLabsChange = (event: React.ChangeEvent<HTMLInputElement>) => setGoofyLabs(event.target.checked);

  const handleShowSearchBarChange = (event: React.ChangeEvent<HTMLInputElement>) => setShowPurposeFinder(event.target.checked);

  return (
    <Stack direction='column' spacing={settingsGap}>
      {!isPwa() && (
        <FormControl orientation='horizontal' sx={{ ...hideOnMobile, alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <FormLabel>{t('centering')}</FormLabel>
            <FormHelperText>
              {centerMode === 'full' ? t('fullScreenChat') : centerMode === 'narrow' ? t('narrowChat') : t('wide')}
            </FormHelperText>
          </Box>
          <RadioGroup row value={centerMode} onChange={handleCenterModeChange}>
            <Radio value='narrow' icon={<WidthNormalIcon />} checkedIcon={<WidthNormalIcon />} />
            <Radio value='wide' icon={<WidthWideIcon />} checkedIcon={<WidthWideIcon />} />
            <Radio value='full' icon={<WidthWideIcon />} checkedIcon={<WidthWideIcon />} />
          </RadioGroup>
        </FormControl>
      )}
      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('enterToSend')}</FormLabel>
          <FormHelperText>{enterToSend ? <>Sends message<TelegramIcon /></> : t('newLine')}</FormHelperText>
        </Box>
        <Switch checked={enterToSend} onChange={handleEnterToSendChange} />
      </FormControl>
      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('doubleClickToEdit')}</FormLabel>
          <FormHelperText>{doubleClickToEdit ? t('doubleClick') : t('threeDots')}</FormHelperText>
        </Box>
        <Switch checked={doubleClickToEdit} onChange={handleDoubleClickToEditChange} />
      </FormControl>
      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('markdown')}</FormLabel>
          <FormHelperText>{renderMarkdown ? t('renderMarkdown') : t('asText')}</FormHelperText>
        </Box>
        <Switch checked={renderMarkdown} onChange={handleRenderMarkdownChange} />
      </FormControl>
      {SHOW_PURPOSE_FINDER && (
        <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
          <Box>
            <FormLabel>{t('purposeFinder')}</FormLabel>
            <FormHelperText>{showPurposeFinder ? t('showSearchBar') : t('hideSearchBar')}</FormHelperText>
          </Box>
          <Switch checked={showPurposeFinder} onChange={handleShowSearchBarChange} />
        </FormControl>
      )}
      <FormControl orientation='horizontal' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('appearance')}</FormLabel>
          <FormHelperText>{zenMode === 'clean' ? t('showSenders') : t('minimalUI')}</FormHelperText>
        </Box>
        <RadioGroup row value={zenMode} onChange={handleZenModeChange}>
          <Radio value='clean' label={t('clean')} />
          <Radio value='cleaner' label={t('zen')} />
        </RadioGroup>
      </FormControl>
      <FormControl orientation='horizontal' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Tooltip title='Currently for Microphone input and Voice output. Microphone support varies by browser (iPhone/Safari lacks speech input). We will use the ElevenLabs MultiLanguage model if a language other than English is selected.'>
            <FormLabel>{t('audioLanguage')}</FormLabel>
          </Tooltip>
          <FormHelperText>ASR 🎙️ &amp; TTS 📢</FormHelperText>
        </Box>
        <LanguageSelect />
      </FormControl>
      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('goofyLabs')}</FormLabel>
          <FormHelperText>{goofyLabs ? <>Experiment<ScienceIcon /></> : t('disabled')}</FormHelperText>
        </Box>
        <Switch checked={goofyLabs} onChange={handleGoofyLabsChange} />
      </FormControl>
    </Stack>
  );
}
