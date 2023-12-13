
'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';

import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/system/Stack';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSnackbar } from 'notistack';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import FormProvider from 'components/hook-form';
import { patterns } from 'constants/patterns';
import { AppRoute } from 'enums';
import { AppDispatch } from 'store';
import { useSendCodeMutation } from 'store/api/restorePasswordApi';
import { setEmail } from 'store/reducers/restorePasswordReducer';

const defaultValues = { email: '' };

export default function RestorePasswordForm(): JSX.Element {
  const dispatch = useDispatch<AppDispatch>();
  const [sendCode] = useSendCodeMutation();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const t = useTranslations('RestorePasswordPage');
  const [activeRequestsCount, setActiveRequestsCount] = useState<number>(0);

  const methods = useForm({ defaultValues, mode: 'onTouched' });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isDirty, isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data: { email: string }): Promise<void> => {
    setActiveRequestsCount((prevCount) => prevCount + 1);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      await sendCode(data).unwrap();

      dispatch(setEmail({ email: data.email }));
      router.push(AppRoute.RESTORE_PASSWORD_VERIFY_CODE_PAGE);

      return undefined;
    } catch (error) {
      enqueueSnackbar(t('errorMessage'), { variant: 'error' });

      return error;
    } finally {
      setActiveRequestsCount((prevCount) => prevCount - 1);
    }
  });

  return (
    <>
      {activeRequestsCount > 0 && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box
          gap={7}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            px: '20px',
            pb: '70px',
            maxWidth: '390px',
          }}
        >
          <Stack spacing={2} direction="row" alignItems="center">
            <Button onClick={() => router.back()}>
              <KeyboardArrowLeftIcon sx={{ fontSize: '48px', color: 'black' }} />
            </Button>

            <Typography variant="h3">{t('title')}</Typography>
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
              label={t('emailLabel')}
              placeholder={t('emailPlaceholder')}
              error={!!errors.email}
              helperText={errors.email?.message}
              sx={{ height: '40px' }}
            />
          </Stack>

          <Button
            sx={{ padding: '14px' }}
            type="submit"
            variant="contained"
            color="primary"
            disabled={!isDirty || !isValid}
          >
            {t('button')}
          </Button>
        </Box>
      </FormProvider>
    </>
  );
}
