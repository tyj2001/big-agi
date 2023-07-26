import * as React from 'react';
import { shallow } from 'zustand/shallow';
import { Box, FormControl, FormHelperText, FormLabel, Radio, RadioGroup, Stack, Switch } from '@mui/material';
import { hideOnMobile, settingsGap } from '~/common/theme';
import { isPwa } from '~/common/util/pwaUtils';
import { useUIPreferencesStore } from '~/common/state/store-ui';
import { useTranslation } from 'react-i18next';
import languages from './languages.json';

const SHOW_PURPOSE_FINDER = false;

function LanguageSelect() {
  return <div>LanguageSelect component content</div>;
}

export function UISettings() {
  const {
    centerMode,
    setCenterMode,
    doubleClickToEdit,
    setDoubleClickToEdit,
    enterToSend,
    setEnterToSend,
    goofyLabs,
    setGoofyLabs,
    renderMarkdown,
    setRenderMarkdown,
    showPurposeFinder,
    setShowPurposeFinder,
    zenMode,
    setZenMode
  } = useUIPreferencesStore(
    (state) => ({
      centerMode: state.centerMode,
      setCenterMode: state.setCenterMode,
      doubleClickToEdit: state.doubleClickToEdit,
      setDoubleClickToEdit: state.setDoubleClickToEdit,
      enterToSend: state.enterToSend,
      setEnterToSend: state.setEnterToSend,
      goofyLabs: state.goofyLabs,
      setGoofyLabs: state.setGoofyLabs,
      renderMarkdown: state.renderMarkdown,
      setRenderMarkdown: state.setRenderMarkdown,
      showPurposeFinder: state.showPurposeFinder,
      setShowPurposeFinder: state.setShowPurposeFinder,
      zenMode: state.zenMode,
      setZenMode: state.setZenMode
    }),
    shallow
  );

  const { t } = useTranslation();

  const handleCenterModeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setCenterMode(event.target.value as 'narrow' | 'wide' | 'full' || 'wide');

  const handleEnterToSendChange = (event: React.ChangeEvent<HTMLInputElement>) => setEnterToSend(event.target.checked);

  const handleDoubleClickToEditChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setDoubleClickToEdit(event.target.checked);

  const handleZenModeChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setZenMode(event.target.value as 'clean' | 'cleaner');

  const handleRenderMarkdownChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setRenderMarkdown(event.target.checked);

  const handleGoofyLabsChange = (event: React.ChangeEvent<HTMLInputElement>) => setGoofyLabs(event.target.checked);

  const handleShowSearchBarChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    setShowPurposeFinder(event.target.checked);

  return (
    <Stack direction="column" sx={{ gap: settingsGap }}>
      {!isPwa() && (
        <FormControl sx={{ ...hideOnMobile, alignItems: 'center', justifyContent: 'space-between' }}>
          <Box>
            <FormLabel>{t('centering')}</FormLabel>
            <FormHelperText>
              {centerMode === 'full'
                ? t('fullScreenChat')
                : centerMode === 'narrow'
                ? t('narrowChat')
                : t('wide')}
            </FormHelperText>
          </Box>
          <RadioGroup row value={centerMode} onChange={handleCenterModeChange}>
            <Radio value="narrow" />
            <Radio value="wide" />
            <Radio value="full" label={t('full')} />
          </RadioGroup>
        </FormControl>
      )}

      <FormControl orientation="horizontal" sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('enterToSend')}</FormLabel>
          <FormHelperText>
            {enterToSend ? (
              <>
                {t('sendsMessage')}
              </>
            ) : (
              t('newLine')
            )}
          </FormHelperText>
        </Box>
        <Switch checked={enterToSend} onChange={handleEnterToSendChange} />
      </FormControl>

      <FormControl orientation="horizontal" sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('doubleClickToEdit')}</FormLabel>
          <FormHelperText>
            {doubleClickToEdit ? (
              t('doubleClick')
            ) : (
              t('threeDots')
            )}
          </FormHelperText>
        </Box>
        <Switch checked={doubleClickToEdit} onChange={handleDoubleClickToEditChange/>
      </FormControl>

      <FormControl orientation="horizontal" sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('markdown')}</FormLabel>
          <FormHelperText>
            {renderMarkdown ? (
              t('renderMarkdown')
            ) : (
              t('asText')
            )}
          </FormHelperText>
        </Box>
        <Switch checked={renderMarkdown} onChange={handleRenderMarkdownChange} />
      </FormControl>

      {SHOW_PURPOSE_FINDER && (
        <FormControl orientation="horizontal" sx={{ justifyContent: 'space-between' }}>
          <Box>
            <FormLabel>{t('purposeFinder')}</FormLabel>
            <FormHelperText>
              {showPurposeFinder ? (
                t('showSearchBar')
              ) : (
                t('hideSearchBar')
              )}
            </FormHelperText>
          </Box>
          <Switch checked={showPurposeFinder} onChange={handleShowSearchBarChange} />
        </FormControl>
      )}

      <FormControl orientation="horizontal" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('appearance')}</FormLabel>
          <FormHelperText>
            {zenMode === 'clean' ? (
              t('showSenders')
            ) : (
              t('minimalUI')
            )}
          </FormHelperText>
        </Box>
        <RadioGroup orientation="horizontal" value={zenMode} onChange={handleZenModeChange}>
          <Radio value="clean" label={t('clean')} />
          <Radio value="cleaner" label={t('zen')} />
        </RadioGroup>
      </FormControl>

      <FormControl orientation="horizontal" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('audioLanguage')}</FormLabel>
          <FormHelperText>
            ASR 🎙️ &amp; TTS 📢
          </FormHelperText>
        </Box>
        <LanguageSelect />
      </FormControl>

      <FormControl orientation="horizontal" sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel>{t('goofyLabs')}</FormLabel>
          <FormHelperText>
            {goofyLabs ? (
              <>
                {t('experiment')}
              </>
            ) : (
              t('disabled')
            )}
          </FormHelperText>
        </Box>
        <Switch checked={goofyLabs} onChange={handleGoofyLabsChange} />
      </FormControl>
    </Stack>
  );
}
