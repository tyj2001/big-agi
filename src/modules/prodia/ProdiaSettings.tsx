import * as React from 'react';
import { shallow } from 'zustand/shallow';

import { Alert, Box, CircularProgress, FormControl, FormHelperText, FormLabel, Input, Option, Radio, RadioGroup, Select, Slider, Stack, Switch, Tooltip, Typography } from '@mui/joy';
import CropSquareIcon from '@mui/icons-material/CropSquare';
import FormatPaintIcon from '@mui/icons-material/FormatPaint';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import StayPrimaryLandscapeIcon from '@mui/icons-material/StayPrimaryLandscape';
import StayPrimaryPortraitIcon from '@mui/icons-material/StayPrimaryPortrait';

import { FormInputKey } from '~/common/components/FormInputKey';
import { apiQuery } from '~/modules/trpc/trpc.client';
import { settingsGap } from '~/common/theme';

import { isValidProdiaApiKey, requireUserKeyProdia } from './prodia.client';
import { prodiaDefaultModelId } from './prodia.models';
import { useProdiaStore } from './store-prodia';
import { t } from '../path/to/translation';

export function ProdiaSettings() {
  // external state
  const { apiKey, setApiKey, modelId, setModelId, negativePrompt, setNegativePrompt, steps, setSteps, cfgScale, setCfgScale, prodiaAspectRatio, setProdiaAspectRatio, upscale, setUpscale, seed, setSeed } = useProdiaStore(state => ({
    apiKey: state.prodiaApiKey, setApiKey: state.setProdiaApiKey,
    modelId: state.prodiaModelId, setModelId: state.setProdiaModelId,
    negativePrompt: state.prodiaNegativePrompt, setNegativePrompt: state.setProdiaNegativePrompt,
    steps: state.prodiaSteps, setSteps: state.setProdiaSteps,
    cfgScale: state.prodiaCfgScale, setCfgScale: state.setProdiaCfgScale,
    prodiaAspectRatio: state.prodiaAspectRatio, setProdiaAspectRatio: state.setProdiaAspectRatio,
    upscale: state.prodiaUpscale, setUpscale: state.prodiaUpscale,
    seed: state.prodiaSeed, setSeed: state.prodiaSeed,
  }), shallow);

  const requiresKey = requireUserKeyProdia;
  const isValidKey = apiKey ? isValidProdiaApiKey(apiKey) : !requiresKey;

  // load models, if the server has a key, or the user provided one
  const { data: modelsData, isLoading: loadingModels, isError, error } = apiQuery.prodia.listModels.useQuery({ prodiaKey: apiKey }, {
    enabled: isValidKey,
    staleTime: 1000 * 60 * 60, // 1 hour
  });

  const handleModelChange = (e: any, value: string | null) => value && setModelId(value);

  const colWidth = 150;

  return (
    <Stack direction='column' sx={{ gap: settingsGap }}>
      <FormHelperText>
        {t('🎨Turn text into pictures and /imagine anything')}
      </FormHelperText>

      <FormInputKey
        label={t('Prodia API Key')}
        rightLabel={requiresKey ? t('required') : t('✔️already set in server')}
        value={apiKey} onChange={setApiKey}
        required={requiresKey} isError={!isValidKey}
      />

      {isError && <Alert variant='soft' color='warning' sx={{ mt: 1 }}><Typography>{t('Issue: {errorMessage}', { errorMessage: error?.message || error?.toString() || 'unknown' })}</Typography></Alert>}

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <FormLabel sx={{ minWidth: colWidth }}>
          {t('Diffusion Model')}
        </FormLabel>
        <Select
          variant='outlined' placeholder={isValidKey ? t('Select a model') : t('Enter API Key')}
          value={modelId || prodiaDefaultModelId} onChange={handleModelChange}
          startDecorator={<FormatPaintIcon />}
          endDecorator={isValidKey && loadingModels && <CircularProgress size='sm' />}
          indicator={<KeyboardArrowDownIcon />}
          slotProps={{
            root: { sx: { width: '100%' } },
            indicator: { sx: { opacity: 0.5 } },
          }}
        >
          {modelsData && modelsData.models?.map((model, idx) => (
            <Option key={'prodia-model-' + idx} value={model.id}>
              {model.label}
            </Option>
          ))}
        </Select>
      </FormControl>

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Tooltip title={t('Avoid these image traits: comma-separated names & adjectives that you want the images to Not have. Example: ugly, blurry, malformed')}>
            <FormLabel sx={{ minWidth: colWidth }}>
              {t('Negative Prompt')} <InfoOutlinedIcon sx={{ mx: 0.5 }} />
            </FormLabel>
          </Tooltip>
          <FormHelperText>
            {negativePrompt ? t('Custom') : t('Not set')} 
          </FormHelperText>
        </Box>
        <Input
          aria-label={t('Image Generation Negative Prompt')}
          variant='outlined' placeholder={t('ugly, blurry, ...')}
          value={negativePrompt} onChange={(e) => setNegativePrompt(e.target.value)}
          slotProps={{ input: { sx: { width: '100%' } } }}
          sx={{ width: '100%' }}
        />
      </FormControl>

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Tooltip title={t('More steps boost image detail & quality but risk oversaturation and cost increase. Start from 20 steps, and increase gradually. Defaults to 25.')}>
            <FormLabel sx={{ minWidth: colWidth }}>
              {t('Diffusion Steps')} <InfoOutlinedIcon sx={{ mx: 0.5 }} />
            </FormLabel>
          </Tooltip>
          <FormHelperText>
            {steps === 25 ? t('Default') : steps > 30 ? (steps > 40 ? t('May be unnecessary') : t('More detail')) : steps <= 15 ? t('Less detail') : t('Balanced')}
          </FormHelperText>
        </Box>
        <Slider
          aria-label={t('Image Generation steps')} valueLabelDisplay='auto'
          value={steps} onChange={(e, value) => setSteps(value as number)}
          min={10} max={50} step={1} defaultValue={25}
          sx={{ width: '100%' }}
        />
      </FormControl>

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Tooltip title={t('Adjust the prompt intensity for generation. Low values deviate, high values overfit. Default: 7 - a balanced start.')}>
            <FormLabel sx={{ minWidth: colWidth }}>
              {t('Cfg-Scale')} <InfoOutlinedIcon sx={{ mx: 0.5 }} />
            </FormLabel>
          </Tooltip>
          <FormHelperText>
            {cfgScale === 7 ? t('Default') : cfgScale >= 9 ? (cfgScale >= 12 ? t('Heavy guidance') : t('Intense guidance')) : cfgScale <= 5 ? t('More freedom') : t('Balanced')}
          </FormHelperText>
        </Box>
        <Slider
          aria-label={t('Image Generation Guidance')} valueLabelDisplay='auto'
          value={cfgScale} onChange={(e, value) => setCfgScale(value as number)}
          min={1} max={15} step={0.5} defaultValue={7}
          sx={{ width: '100%' }}
        />
      </FormControl>

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel sx={{ minWidth: colWidth }}>
            {t('Aspect Ratio')}
          </FormLabel>
          <FormHelperText>
            {prodiaAspectRatio === 'square' ? t('Square') : prodiaAspectRatio === 'portrait' ? t('Portrait') : t('Landscape')}
          </FormHelperText>
        </Box>
        <RadioGroup orientation='horizontal' value={prodiaAspectRatio} onChange={(e) => setProdiaAspectRatio(e.target.value as 'square' | 'portrait' | 'landscape')}>
          <Radio value='square' label={<CropSquareIcon sx={{ width: 25, height: 24, mt: -0.25 }} />} />
          <Radio value='portrait' label={<StayPrimaryPortraitIcon sx={{ width: 25, height: 24, mt: -0.25 }} />} />
          <Radio value='landscape' label={<StayPrimaryLandscapeIcon sx={{ width: 25, height: 24, mt: -0.25 }} />} />
        </RadioGroup>
      </FormControl>

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <FormLabel sx={{ minWidth: colWidth }}>
            {t('Upscale')} <InfoOutlinedIcon sx={{ mx: 0.5 }} />
          </FormLabel>
          <FormHelperText>
            {upscale ? t('1024px') : t('Default')}
          </FormHelperText>
        </Box>
        <Switch checked={upscale} onChange={(e) => setUpscale(e.target.checked)}
                endDecorator={upscale ? '2x' : 'Off'}
                slotProps={{ endDecorator: { sx: { minWidth: 26 } } }} />
      </FormControl>

      <FormControl orientation='horizontal' sx={{ justifyContent: 'space-between' }}>
        <Box>
          <Tooltip title={t('Set value for reproducible images. Different by default.')}>
            <FormLabel sx={{ minWidth: colWidth }}>
              {t('Noise Seed')} <InfoOutlinedIcon sx={{ mx: 0.5 }} />
            </FormLabel>
          </Tooltip>
          <FormHelperText>
            {seed ? t('Custom') : t('Random')}
          </FormHelperText>
        </Box>
        <Input
          aria-label={t('Image Generation Seed')}
          variant='outlined' placeholder={t('Random')}
          value={seed || ''} onChange={(e) => setSeed(e.target.value || '')}
          slotProps={{
            input: {
              type: 'number',
              sx: { width: '100%' },
            },
          }}
          sx={{ width: '100%' }}
        />
      </FormControl>
    </Stack>
  );
}
