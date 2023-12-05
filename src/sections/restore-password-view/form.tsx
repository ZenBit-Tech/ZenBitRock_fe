'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { TextField, Button, Typography, Box, CircularProgress } from '@mui/material';
import { useSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/system/Stack';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { patterns } from 'constants/patterns';
import FormProvider from 'components/hook-form';
import { useSendCodeMutation } from 'store/api/restorePasswordApi';
import { setEmail } from 'store/reducers/restorePasswordReducer';
import { AppRoute } from 'enums';

const defaultValues = { email: '' };

export default function RestorePasswordForm(): JSX.Element {
  const t = useTranslations('RestorePasswordPage');

  const [sendCode, { isLoading }] = useSendCodeMutation();

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({ defaultValues, mode: 'onBlur' });

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty, isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data: { email: string }): Promise<void> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      await sendCode(data).unwrap();

      dispatch(setEmail({ email: data.email }));
      router.push(AppRoute.RESTORE_PASSWORD_VERIFY_CODE_PAGE);

      return undefined;
    } catch (error) {
      enqueueSnackbar('Something went wrong, please try again', { variant: 'error' });

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
          gap={7}
          sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', pb: '70px' }}
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
              onBlur={() => {
                methods.trigger('email');
              }}
              onChange={(e) => {
                methods.setValue('email', e.target.value);
                if (methods.formState.errors.email) {
                  methods.clearErrors('email');
                }
              }}
              sx={{ height: '50px' }}
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
