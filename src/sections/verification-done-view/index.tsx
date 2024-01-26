'use client';

import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import LoadingButton from '@mui/lab/LoadingButton';
import { useSnackbar } from 'notistack';
import { useUpdateUserMutation } from 'store/api/userApi';
import { useTranslations, useRouter, useSelector } from 'hooks';
import { AppRoute } from 'enums';
import { RootState } from 'store';

export function VerificationDoneView(): JSX.Element {
  const t = useTranslations('VerificationDonePage');

  const [updateUser] = useUpdateUserMutation();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const user = useSelector((state: RootState) => state.authSlice.user);

  const handleClick = async (): Promise<void> => {
    try {
      await updateUser({ userId: user?.id, isNewbie: false }).unwrap();
      router.replace(AppRoute.TUTORIAL_PAGE);
    } catch (error) {
      enqueueSnackbar(t('generalErrorMessage'), { variant: 'error' });

      return error;
    }

    return undefined;
  };

  return (
    <Box
      gap={5}
      display="grid"
      maxWidth="600px"
      height="calc(100vh - 80px)"
      margin="0 auto"
      sx={{ mt: -10, justifyContent: 'center', alignItems: 'center', px: '25px' }}
      gridTemplateColumns={{
        xs: 'repeat(1, 1fr)',
        sm: 'repeat(1, 1fr)',
      }}
    >
      <Stack spacing={5} alignItems="center">
        <Typography align="center" variant="h3" fontSize={16}>
          {t('doneText')}
        </Typography>

        <LoadingButton
          fullWidth
          variant="contained"
          color="primary"
          size="large"
          style={{ marginBottom: '70px', width: '200px' }}
          onClick={handleClick}
        >
          {t('submitButton')}
        </LoadingButton>
      </Stack>
    </Box>
  );
}
