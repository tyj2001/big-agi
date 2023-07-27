import * as React from 'react';
import { shallow } from 'zustand/shallow';
import { useTranslation } from 'react-i18next';
import i18n from 'i18next';

import { Box, FormControl, FormHelperText, FormLabel, Option, Radio, RadioGroup, Select, Stack, Switch, Tooltip } from '@mui/joy';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import TelegramIcon from '@mui/icons-material/Telegram';
import ScienceIcon from '@mui/icons-material/Science';
import WidthNormalIcon from '@mui/icons-material/WidthNormal';
import WidthWideIcon from '@mui/icons-material/WidthWide';

import { hideOnMobile, settingsGap } from '~/common/theme';
import { isPwa } from '~/common/util/pwaUtils';
import { useUIPreferencesStore } from '~/common/state/store-ui';

// languages is defined as a JSON file
import languages from './languages.json' assert { type: 'json' };

// configuration
const SHOW_PURPOSE_FINDER = false;

function LanguageSelect() {
  // external state
  const { preferredLanguage, setPreferredLanguage } = useUIPreferencesStore(state => ({ preferredLanguage: state.preferredLanguage, setPreferredLanguage: state.setPreferredLanguage }), shallow);
  const { t } = useTranslation();

  const handleLanguageChanged = (event: any, newValue: string | null) => {
    if (!newValue) return;
    setPreferredLanguage(newValue as string);
    i18n.changeLanguage(newValue as string);
  };

  const languageOptions = React.useMemo(() => Object.entries(languages).map(([language, localesOrCode]) =>
    typeof localesOrCode === 'string'
      ? (
        <Option key={localesOrCode} value={localesOrCode}>
          {t(language)}
        </Option>
      ) : (
        Object.entries(localesOrCode).map(([country, code]) => (
          <Option key={code} value={code}>
            {`${t(language)} (${t(country)})`}
          </Option>
        ))
      )), [t]);

  return (
    <Select value={preferredLanguage} onChange={handleLanguageChanged}
            indicator={<KeyboardArrowDownIcon />}
            slotProps={{
              root: { sx: { minWidth: 200 } },
              indicator: { sx: { opacity: 0.5 } },
            }}>
      {languageOptions}
    </Select>
  );
}

export function UISettings() {
  // external state
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
          <FormLabel>{t('Centering')}</FormLabel>
          <FormHelperText>{centerMode === 'full' ? t('Full screen chat') : centerMode === 'narrow' ? t('Narrow chat') : t('Wide')}</FormHelperText>
        </Box>
        <RadioGroup orientation='horizontal' value={centerMode} onChange={handleCenterModeChange}>
          <Radio value='narrow' label={<WidthNormalIcon sx={{ width: 25, height: 24, mt: -0.25 }} />} />
          <Radio value='wide' label={<WidthWideIcon sx={{ width: 25, height: 24, mt: -0.25 }} />} />
          <Radio value='full' label={t('Full')} />
        </RadioGroup>
      </FormControl>}

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('Enter to send')}</FormLabel>
          <FormHelperText>{enterToSend ? <>{t('sends_message')}<TelegramIcon /></> : t('new_line')}</FormHelperText>
        </Box>
        <Switch checked={enterToSend} onChange={handleEnterToSendChange}
                endDecorator={enterToSend ? t('On') : t('Off')}
                slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
      </FormControl>

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('Double click to edit')}</FormLabel>
          <FormHelperText>{doubleClickToEdit ? t('Double click') : t('Three dots')}</FormHelperText>
        </Box>
        <Switch checked={doubleClickToEdit} onChange={handleDoubleClickToEditChange}
                endDecorator={doubleClickToEdit ? t('On') : t('Off')}
                slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
      </FormControl>

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('Markdown')}</FormLabel>
          <FormHelperText>{renderMarkdown ? t('Render markdown') : t('As text')}</FormHelperText>
        </Box>
        <Switch checked={renderMarkdown} onChange={handleRenderMarkdownChange}
                endDecorator={renderMarkdown ? t('On') : t('Off')}
                slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
      </FormControl>

      {SHOW_PURPOSE_FINDER && <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('Purpose finder')}</FormLabel>
          <FormHelperText>{showPurposeFinder ? t('Show search bar') : t('Hide search bar')}</FormHelperText>
        </Box>
        <Switch checked={showPurposeFinder} onChange={handleShowSearchBarChange}
                endDecorator={showPurposeFinder ? t('On') : t('Off')}
                slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
      </FormControl>}

      <FormControl orientation='horizontal' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('Appearance')}</FormLabel>
          <FormHelperText>{zenMode === 'clean' ? t('Show senders') : t('Minimal UI')}</FormHelperText>
        </Box>
        <RadioGroup orientation='horizontal' value={zenMode} onChange={handleZenModeChange}>
          {/*<Radio value='clean' label={<Face6Icon sx={{ width: 24, height: 24, mt: -0.25 }} />} />*/}
          <Radio value='clean' label={t('Clean')} />
          <Radio value='cleaner' label={t('Zen')} />
        </RadioGroup>
      </FormControl>

      <FormControl orientation='horizontal' sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <Tooltip title={t('Currently for Microphone input and Voice output. Microphone support varies by browser (iPhone/Safari lacks speech input). We will use the ElevenLabs MultiLanguage model if a language other than English is selected.')}>
            <FormLabel>
              {t('Audio language')}
            </FormLabel>
          </Tooltip>
          <FormHelperText>
            {t('ASR 🎙️ & TTS 📢')}
          </FormHelperText>
        </Box>
        <LanguageSelect />
      </FormControl>

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('Goofy labs')}</FormLabel>
          <FormHelperText>{goofyLabs ? <>{t("Experiment")}<ScienceIcon /></> : t("Disabled")}</FormHelperText>
        </Box>
        <Switch checked={goofyLabs} onChange={handleGoofyLabsChange}
                endDecorator={goofyLabs ? t('On') : t('Off')}
                slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
      </FormControl>

    </Stack>
  );
}
