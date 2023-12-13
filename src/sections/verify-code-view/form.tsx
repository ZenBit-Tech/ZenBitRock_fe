'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';     
import { useForm } from 'react-hook-form';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button, Typography, Box, CircularProgress, Link } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/system/Stack';
import { useSnackbar } from 'notistack';
import FormProvider, { RHFCode } from 'components/hook-form';
import { useSendCodeMutation, useVerifyCodeMutation } from 'store/api/restorePasswordApi';
import { setCode } from 'store/reducers/restorePasswordReducer';
import { AppRoute } from 'enums';
import { AppDispatch, RootState } from 'store';

const defaultValues = { code: '' };
const CODE_LENGTH = 6;

const VerifySchema = Yup.object().shape({
  code: Yup.string().required('code_is_required').min(CODE_LENGTH, 'code_too_short'),
});

export default function VerifyCodeForm(): JSX.Element {
  const [verifyCode] = useVerifyCodeMutation();
  const [sendCode] = useSendCodeMutation();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const t = useTranslations('VerifyCodePage');
  const [activeRequestsCount, setActiveRequestsCount] = useState<number>(0);

  const methods = useForm({
    resolver: yupResolver(VerifySchema),
    defaultValues,
    mode: 'onTouched',
  });

  const dispatch = useDispatch<AppDispatch>();
  const email = useSelector((state: RootState) => state.restorePasswordSlice.email);

  const {
    reset,
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    setActiveRequestsCount((prevCount) => prevCount + 1);

    try {
      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      const payload = { email, code: data.code };

      await verifyCode(payload).unwrap();

      dispatch(setCode({ code: data.code }));
      router.push(AppRoute.RESTORE_PASSWORD_CHANGE_PASSWORD_PAGE);

      return undefined;
    } catch (error) {
      enqueueSnackbar(t('errorMessageInvalidCode'), { variant: 'error' });

      return error;
    } finally {
      setActiveRequestsCount((prevCount) => prevCount - 1);
    }
  });

  const handleClick = async (): Promise<void> => {
    setActiveRequestsCount((prevCount) => prevCount + 1);

    try {
      await sendCode({ email }).unwrap();

      enqueueSnackbar(t('successMessage'), { variant: 'success' });

      return undefined;
    } catch (error) {
      enqueueSnackbar(t('generalErrorMessage'), { variant: 'error' });

      return error;
    } finally {
      setActiveRequestsCount((prevCount) => prevCount - 1);
    }
  };

  return (
    <>
      {activeRequestsCount > 0 && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}

      <FormProvider methods={methods} onSubmit={onSubmit}>
        <Box
          gap={4}
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

            <Typography variant="h3" sx={{}}>
              {t('title')}
            </Typography>
          </Stack>

          <Stack sx={{ height: '150px' }}>
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
