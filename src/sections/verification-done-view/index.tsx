'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';

export default function VerificationDoneView(): JSX.Element {
  const t = useTranslations('VerificationPage');

  const { replace } = useRouter();

  function handleClick() {
    replace('/');
  }

  return (
    <Box
      gap={5}
      display="grid"
      maxWidth="600px"
      margin="0 auto"
      sx={{ my: 5 }}
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
      }}
    >
      <Stack spacing={5}>
        <Typography align="center" variant="h2">
          {t('mainTitle')}
        </Typography>

        <Stack spacing={3}>
          <Typography align="center" variant="body1" fontSize={16}>
            {t('doneTextFirstPart')}
          </Typography>

          <Typography align="center" variant="body1" fontSize={16}>
            {t('doneTextSecondPart')}
          </Typography>

          <Typography align="center" variant="body1" fontSize={16}>
            {t('doneTextThirdPart')}
          </Typography>

          <LoadingButton
            fullWidth
            color="info"
            size="large"
            variant="text"
            style={{ marginBottom: '70px' }}
            onClick={handleClick}
          >
            {t('goHomeButton')}
          </LoadingButton>
        </Stack>
      </Stack>
    </Box>
  );
}
