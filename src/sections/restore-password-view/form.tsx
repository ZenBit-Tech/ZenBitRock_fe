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
import { isFetchBaseQueryError, isErrorWithMessage } from 'services/rtq-helper';

const defaultValues = { email: '' };

export default function RestorePasswordForm(): JSX.Element {
  const t = useTranslations('RestorePasswordPage');

  const [sendCode, { isLoading }] = useSendCodeMutation();

  const router = useRouter();

  const dispatch = useDispatch<AppDispatch>();

  const { enqueueSnackbar } = useSnackbar();

  const methods = useForm({ defaultValues });

  const {
    reset,
    register,
    formState,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { isDirty, isValid } = formState;

  const onSubmit = handleSubmit(async (data: { email: string }): Promise<void> => {
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      const response = await sendCode(data).unwrap();

      if ('response' in response) {
        dispatch(setEmail({ email: data.email }));
        router.push(AppRoute.RESTORE_PASSWORD_VERIFY_CODE_PAGE);
      }
    } catch (error) {
      if (
        isFetchBaseQueryError(error) &&
        'data' in error &&
        error.data &&
        typeof error.data === 'object' &&
        'error' in error.data &&
        error.data.error
      ) {
        const errorMsg = error.data.error;

        enqueueSnackbar(errorMsg, { variant: 'error' });
      } else if (isErrorWithMessage(error)) {
        enqueueSnackbar(error.message, { variant: 'error' });
      }
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
