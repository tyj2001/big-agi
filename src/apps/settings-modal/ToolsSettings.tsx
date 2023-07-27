import * as React from 'react';
import { useTranslation } from 'react-i18next';

import { FormHelperText, Stack } from '@mui/joy';

import { GoogleSearchSettings } from '~/modules/google/GoogleSearchSettings';

import { settingsGap } from '~/common/theme';

export function ToolsSettings() {
  // 使用 useTranslation 钩子函数
  const { t } = useTranslation();

  return (
    <Stack direction="column" sx={{ gap: settingsGap }}>
      {/* 使用 t 函数进行翻译 */}
      <FormHelperText>
        {t(
          '🛠️ Tools enable additional capabilities if enabled and correctly configured'
        )}
      </FormHelperText>

      <GoogleSearchSettings />
    </Stack>
  );
}
