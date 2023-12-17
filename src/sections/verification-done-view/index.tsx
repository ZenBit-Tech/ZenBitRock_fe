'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useGetProfileQuery } from 'store/auth';
import { useState, useTranslations } from 'hooks';

export function VerificationDoneView(): JSX.Element {
  const t = useTranslations('VerificationDonePage');
  const [shouldFetchProfile, setShouldFetchProfile] = useState(false);

  useGetProfileQuery(undefined, { skip: !shouldFetchProfile });

  const handleClick = () => {
    setShouldFetchProfile(true);
  };

  return (
    <Box
      gap={5}
      display="grid"
      maxWidth="600px"
      height="calc(100vh - 80px)"
      margin="0 auto"
      sx={{ mt: -10, justifyContent: 'center', alignItems: 'center', px: 2 }}
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
          variant="contained"
          color="primary"
          size="large"
          type="submit"
          style={{ marginBottom: '70px' }}
          onClick={handleClick}
        >
          {t('submitButton')}
        </LoadingButton>
      </Stack>
    </Box>
  );
}
