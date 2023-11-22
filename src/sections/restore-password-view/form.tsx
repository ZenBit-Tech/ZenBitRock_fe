'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/system/Stack';
import { patterns } from 'constants/patterns';
import FormProvider from 'components/hook-form';
import { useSendCodeMutation } from 'store/api/restoreEmailApi';
import { links } from 'constants/links';

export default function RestorePasswordForm() {
  const t = useTranslations('RestorePasswordPage');
  const [createVerification, { isLoading }] = useSendCodeMutation();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const defaultValues = { email: '' };
  const methods = useForm({ defaultValues });
  const {
    reset,
    register,
    formState,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;
  const { isDirty, isValid } = formState;

  const onSubmit = handleSubmit(async (data) => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      const email = await createVerification(data);
      if ('data' in email) {
        router.push(links.RESTORE_PASSWORD_SEND_CODE_PAGE);
      } else {
        enqueueSnackbar(email.error.data.error, {
          variant: 'error',
        });
      }
    } catch (error) {
      return error;
    }
  });

  return (
    <>
      {(isSubmitting || isLoading) && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box
          gap={4}
          display="flex"
          flexDirection="column"
          height="calc(100vh - 80px)"
          justifyContent="center"
          paddingRight="33px"
        >
          <Stack spacing={2} direction="row" alignItems="center">
            <Button onClick={() => router.back()}>
              <KeyboardArrowLeftIcon sx={{ fontSize: '48px', color: 'black' }} />
            </Button>

            <Typography variant="h3" sx={{}}>
              {t('title')}
            </Typography>
          </Stack>

          <Stack>
            <Typography variant="body1" sx={{ marginBottom: '25px' }}>
              {t('header')}
            </Typography>

            <TextField
              {...register('email', {
                required: t('emailRequired'),
                pattern: {
                  value: patterns.email,
                  message: t('emailValid'),
                },
              })}
              label={t('emailPlaceholder')}
            />
          </Stack>

          <Button type="submit" variant="contained" color="primary" disabled={!isDirty || !isValid}>
            {t('button')}
          </Button>
        </Box>
      </FormProvider>
    </>
  );
}
