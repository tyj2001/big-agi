import * as React from 'react';
import { shallow } from 'zustand/shallow';

import { Box, FormControl, FormHelperText, FormLabel, Option, Radio, RadioGroup, Select, Stack, Switch, Tooltip } from '@mui/joy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TelegramIcon from '@mui/icons-material/Telegram';
import ScienceIcon from '@mui/icons-material/Science';
import WidthNormalIcon from '@mui/icons-material/WidthNormal';
import WidthWideIcon from '@mui/icons-material/WidthWide';

import { hideOnMobile, settingsGap } from '~/common/theme';
import { isPwa } from '~/common/util/pwaUtils';
import { useUIPreferencesStore } from '~/common/state/store-ui';

// 导入翻译钩子
import { useTranslation } from 'react-i18next';

// 导入语言配置
import languages from './languages.json' assert { type: 'json' };

// 配置
const SHOW_PURPOSE_FINDER = false;

function LanguageSelect() {
  // 这里是你的LanguageSelect组件的代码
}

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

    <Stack direction='column' sx={{ gap: settingsGap }}>

      {!isPwa() && <FormControl orientation='horizontal' sx={{ ...hideOnMobile, alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('centering')}</FormLabel>
          <FormHelperText>{centerMode === 'full' ? t('fullScreenChat') : centerMode === 'narrow' ? t('narrowChat') : t('wide')}</FormHelperText>
        </Box>
        <RadioGroup orientation='horizontal' value={centerMode} onChange={handleCenterModeChange}>
          <Radio value='narrow' label={<WidthNormalIcon sx={{ width: 25, height: 24, mt: -0.25 }} />} />
          <Radio value='wide' label={<WidthWideIcon sx={{ width: 25, height: 24, mt: -0.25 }} />} />
          <Radio value='full' label={t('full')} />
        </RadioGroup>
      </FormControl>}

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('enterToSend')}</FormLabel>
          <FormHelperText>{enterToSend ? <>Sends message<TelegramIcon /></> : t('newLine')}</FormHelperText>
        </Box>
        <Switch checked={enterToSend} onChange={handleEnterToSendChange}
                endDecorator={enterToSend ? 'On' : 'Off'}
                slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
      </FormControl>

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('doubleClickToEdit')}</FormLabel>
          <FormHelperText>{doubleClickToEdit ? t('doubleClick') : t('threeDots')}</FormHelperText>
        </Box>
        <Switch checked={doubleClickToEdit} onChange={handleDoubleClickToEditChange}
                endDecorator={doubleClickToEdit ? 'On' : 'Off'}
                slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
      </FormControl>

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('markdown')}</FormLabel>
          <FormHelperText>{renderMarkdown ? t('renderMarkdown') : t('asText')}</FormHelperText>
        </Box>
        <Switch checked={renderMarkdown} onChange={handleRenderMarkdownChange}
                endDecorator={renderMarkdown ? 'On' : 'Off'}
                slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
      </FormControl>

      {SHOW_PURPOSE_FINDER && <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('purposeFinder')}</FormLabel>
          <FormHelperText>{showPurposeFinder ? t('showSearchBar') : t('hideSearchBar')}</FormHelperText>
        </Box>
        <Switch checked={showPurposeFinder} onChange={handleShowSearchBarChange}
                endDecorator={showPurposeFinder ? 'On' : 'Off'}
                slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
      </FormControl>}

      <FormControl orientation='horizontal' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('appearance')}</FormLabel>
          <FormHelperText>{zenMode === 'clean' ? t('showSenders') : t('minimalUI')}</FormHelperText>
        </Box>
        <RadioGroup orientation='horizontal' value={zenMode} onChange={handleZenModeChange}>
          {/*<Radio value='clean' label={<Face6Icon sx={{ width: 24, height: 24, mt: -0.25 }} />} />*/}
          <Radio value='clean' label={t('clean')} />
          <Radio value='cleaner' label={t('zen')} />
        </RadioGroup>
      </FormControl>

      <FormControl orientation='horizontal' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Tooltip title='Currently for Microphone input and Voice output. Microphone support varies by browser (iPhone/Safari lacks speech input). We will use the ElevenLabs MultiLanguage model if a language other than English is selected.'>
            <FormLabel>
              {t('audioLanguage')}
            </FormLabel>
          </Tooltip>
          <FormHelperText>
            ASR 🎙️ &amp; TTS 📢
          </FormHelperText>
        </Box>
        <LanguageSelect />
      </FormControl>

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('goofyLabs')}</FormLabel>
          <FormHelperText>{goofyLabs ? <>Experiment<ScienceIcon /></> : t('disabled')}</FormHelperText>
        </Box>
        <Switch checked={goofyLabs} onChange={handleGoofyLabsChange}
                endDecorator={goofyLabs ? 'On' : 'Off'}
                slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
      </FormControl>

    </Stack>

  );
}
