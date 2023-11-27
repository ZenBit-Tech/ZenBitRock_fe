'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button, Typography, Box, CircularProgress, Link } from '@mui/material';
import { useSnackbar } from 'notistack';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/system/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import FormProvider, { RHFCode } from 'components/hook-form';
import { useSendCodeMutation, useVerifyCodeMutation } from 'store/api/restorePasswordApi';
import { setCode } from 'store/reducers/restorePasswordReducer';
import { AppRoute } from 'enums';

const defaultValues = { code: '' };

export default function RestorePasswordForm(): JSX.Element {
  const t = useTranslations('VerifyCodePage');
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  const [sendCode] = useSendCodeMutation();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const methods = useForm({ defaultValues });

  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.restorePasswordSlice.email);

  const {
    reset,
    formState,
    handleSubmit,
    formState: { isSubmitting },
  } = methods;

  const { isDirty, isValid } = formState;

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    const CODE = 409;
    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      const payload = { email, code: data.code };
      const response = await verifyCode(payload);

      if ('error' in response && 'status' in response.error && response.error.status === CODE) {
        enqueueSnackbar('Success!', { variant: 'success' });
        dispatch(setCode({ code: data.code }));
        router.push(AppRoute.RESTORE_PASSWORD_CHANGE_PASSWORD_PAGE);
      } else if (
        'error' in response &&
        'data' in response.error &&
        response.error.data &&
        typeof response.error.data === 'object' &&
        'message' in response.error.data
      ) {
        console.log(response);
        const message = response.error.data.message;
        enqueueSnackbar(message, { variant: 'error' });
      }
    } catch (error) {
      throw error;
    }
  });

  const handleClick = async (): Promise<void> => {
    try {
      const response = await sendCode({ email });

      if ('data' in response) {
        enqueueSnackbar('Check your mail!', { variant: 'success' });
      } else if (
        'data' in response.error &&
        response.error.data &&
        typeof response.error.data === 'object' &&
        'error' in response.error.data
      ) {
        const message = response.error.data.error;
        enqueueSnackbar(message, { variant: 'error' });
      }
    } catch (error) {
      throw error;
    }
  };

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

            <RHFCode name="code" />
          </Stack>

          <Stack direction="row" justifyContent="space-between">
            <Typography variant="body2">{t('dontHaveCode')}</Typography>

            <Link
              onClick={handleClick}
              variant="subtitle2"
              sx={{
                cursor: 'pointer',
              }}
            >
              {t('sendAgain')}
            </Link>
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
