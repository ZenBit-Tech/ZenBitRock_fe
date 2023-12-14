'use client';

import { useTranslations } from 'next-intl';
import * as Yup from 'yup';
import { useRouter } from 'next/navigation';
import { useForm } from 'react-hook-form';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button, Typography, Box, CircularProgress, Link } from '@mui/material';
import { useSnackbar } from 'notistack';
import { yupResolver } from '@hookform/resolvers/yup';
import Backdrop from '@mui/material/Backdrop';
import Stack from '@mui/system/Stack';
import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, RootState } from 'store';
import FormProvider, { RHFCode } from 'components/hook-form';
import { useSendCodeMutation, useVerifyCodeMutation } from 'store/api/restorePasswordApi';
import { setCode } from 'store/reducers/restorePasswordReducer';
import { AppRoute } from 'enums';
import { useEffect, useState } from 'react';

const defaultValues = { code: '' };
const CODE_LENGTH = 6;

const VerifySchema = Yup.object().shape({
  code: Yup.string().required('code_is_required').min(CODE_LENGTH, 'code_too_short'),
});

export default function VerifyCodeForm(): JSX.Element {
  const t = useTranslations('VerifyCodePage');
  const [verifyCode, { isLoading }] = useVerifyCodeMutation();
  const [sendCode] = useSendCodeMutation();

  const [remainingTime, setRemainingTime] = useState<number>(180);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
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
    formState: { isSubmitting, isDirty, isValid },
  } = methods;

  const onSubmit = handleSubmit(async (data): Promise<void> => {
    try {
      if (isExpired) {
        enqueueSnackbar(t('CodeExpired'), { variant: 'error' });
        
        return;
      }

      await new Promise((resolve) => setTimeout(resolve, 3000));
      reset();
      const payload = { email, code: data.code };

      await verifyCode(payload).unwrap();

      enqueueSnackbar(t('Success'), { variant: 'success' });
      dispatch(setCode({ code: data.code }));
      router.push(AppRoute.RESTORE_PASSWORD_CHANGE_PASSWORD_PAGE);

      return undefined;
    } catch (error) {
      enqueueSnackbar(t('ErrorMessage'), { variant: 'error' });

      return error;
    }
  });

  const handleClick = async (): Promise<void> => {
    try {
      const response = await sendCode({ email });

      if ('data' in response) {
        enqueueSnackbar(t('CheckEmail'), { variant: 'success' });
        setRemainingTime(180);
        setIsExpired(false);
      }

      return undefined;
    } catch (error) {
      enqueueSnackbar(t('ErrorMessage'), { variant: 'error' });

      return error;
    }
  };

  useEffect(() => {
    const timerId: NodeJS.Timeout = setInterval(() => {
      setRemainingTime((prevTime) => (prevTime > 0 ? prevTime - 1 : 0));
    }, 1000);

    if (remainingTime === 0) {
      setIsExpired(true);
      clearInterval(timerId);
    }

    return () => {
      clearInterval(timerId);
    };
  }, [remainingTime]);

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

          {isExpired ? (
            <Link
              onClick={handleClick}
              variant="subtitle2"
              sx={{
                cursor: 'pointer',
              }}
            >
              {t('resendCodeButtonExpired')}
            </Link>
          ) : (
            <>
              <Typography variant="body2">{t('timeRemaining', { remainingTime })}</Typography>

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
            </>
          )}
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
