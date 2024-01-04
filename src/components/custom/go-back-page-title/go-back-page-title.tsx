'use client';

import { Box, Button, Typography } from '@mui/material';
import { useRouter, useTranslations } from 'hooks';
import Iconify from 'components/iconify';

type Props = {
  title: string;
};
const GoBackPageTitile = ({ title }: Props) => {
  const router = useRouter();
  const t = useTranslations('property');
  return (
    <Box
      sx={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-start',
        gap: '1rem',
        marginY: '1.5rem',
      }}
    >
      <Button
        title={t('back')}
        sx={{ padding: '14px', width: 'fit-content', height: '2rem' }}
        onClick={(): void => router.back()}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width="2.3rem" height="2.3rem" />
      </Button>
      <Typography sx={{ whiteSpace: 'nowrap' }} variant="h3">
        {title}
      </Typography>
    </Box>
  );
};
export { GoBackPageTitile };
