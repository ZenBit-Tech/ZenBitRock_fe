'use client';

import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { AppRoute } from 'enums';

export default function VerificationDoneView(): JSX.Element {
  const t = useTranslations('VerificationDonePage');

  const { replace } = useRouter();

  const handleClick = () => {
    replace(AppRoute.MAIN_PAGE);
  };

  return (
    <Box
      gap={5}
      display="grid"
      maxWidth="600px"
      height="calc(100vh - 80px)"
      margin="0 auto"
      sx={{ mt: -10, justifyContent: 'center', alignItems: 'center' }}
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
      }}
    >
      <Stack spacing={5}>
        <Typography align="center" variant="h3" fontSize={16}>
          {t('doneText')}
        </Typography>

        <LoadingButton
          fullWidth
          color="info"
          size="large"
          variant="text"
          style={{ marginBottom: '70px' }}
          onClick={handleClick}
        >
          {t('submitButton')}
        </LoadingButton>
      </Stack>
    </Box>
  );
}
