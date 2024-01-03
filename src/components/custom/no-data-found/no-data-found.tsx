'use client';

import { Typography } from '@mui/material';
import { Stack } from '@mui/system';
import { useTranslations } from 'hooks';

const NoDataFound = () => {
  const t = useTranslations('noDataFound');
  return (
    <Stack spacing={1} alignItems="center">
      <img alt="empty content" src="/assets/icons/empty/ic_content.svg" />
      <Typography variant="h5">{t('results')}</Typography>
    </Stack>
  );
};

export { NoDataFound };
