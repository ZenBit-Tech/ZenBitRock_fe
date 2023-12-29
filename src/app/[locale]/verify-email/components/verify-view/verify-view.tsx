'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { notFound } from 'next/navigation';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { Button } from '@mui/material';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { EmailInboxIcon } from 'assets/icons';
import FormProvider, { RHFCode } from 'components/hook-form';
import { useSendVerificationCodeMutation, useVerifyEmailMutation } from 'store/auth';
import { useSnackbar } from 'notistack';
import { StorageKey } from 'enums';
import { AppDispatch } from 'store';
import { logoutUser } from 'store/auth/authReducer';
import { VerifySchema } from './validation-schema';

const defaultValues = {
  code: '',
  email: '',
};

type Props = {
  email: string;
};

export function VerifyView({ email }: Props) {
  const [sendVerificationCode] = useSendVerificationCodeMutation();
  const [verifyEmail] = useVerifyEmailMutation();

  const t = useTranslations('VerifyEmail');

  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch<AppDispatch>();

  const handleSendCode = useCallback(async (): Promise<void> => {
    try {
      await sendVerificationCode({ email });
      enqueueSnackbar(t('sentCode'), { variant: 'success' });
    } catch (error) {
      notFound();
    }
  }, [email, sendVerificationCode, enqueueSnackbar, t]);

  const methods = useForm({
    mode: 'onTouched',
    resolver: yupResolver(VerifySchema),
    defaultValues,
  });

  const {
    handleSubmit,
    formState: { isSubmitting, isValid },
    reset,
    setValue,
  } = methods;

  useEffect(() => {
    setValue('email', email);
    handleSendCode();
  }, [email, handleSendCode, setValue]);

  const onSubmit = handleSubmit(async (data) => {
    try {
      await verifyEmail(data).unwrap();
      enqueueSnackbar(t('emailVerified'), { variant: 'success' });
    } catch (error) {
      reset();
      setValue('email', email);
      enqueueSnackbar(t('notValid'), { variant: 'error' });
    }
  });

  const handleLogout = (): void => {
    localStorage.removeItem(StorageKey.TOKEN);
    dispatch(logoutUser());
  };

  const renderForm = (
    <Stack spacing={3} alignItems="center" mb={3}>
      <div style={{ height: '70px' }}>
        <RHFCode name="code" />
      </div>

      <LoadingButton
        fullWidth
        size="large"
        type="submit"
        variant="contained"
        loading={isSubmitting}
        disabled={!isValid}
      >
        {t('verify')}
      </LoadingButton>

      <Stack>
        <Typography variant="body2">{t('noCode')}</Typography>

        <Link
          onClick={handleSendCode}
          variant="subtitle2"
          sx={{
            cursor: 'pointer',
          }}
        >
          {t('sendAgain')}
        </Link>
      </Stack>
    </Stack>
  );

  const renderHead = (
    <>
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={3} sx={{ my: 5 }}>
        <Stack
          direction="row"
          alignItems="center"
          sx={{
            ml: '-20px',
            '@media (min-width: 320px)': {
              ml: '-30px',
            },
            '@media (min-width: 321px)': {
              ml: '-25px',
            },
            '@media (min-width: 385px)': {
              ml: '-6px',
            },
            '@media (min-width: 600px)': {
              ml: '-16px',
            },
            '@media (min-width: 650px)': {
              ml: '-16px',
            },
            '@media (min-width: 900px)': {
              ml: '-35px',
            },
            '@media (min-width: 1200px)': {
              ml: '-50px',
            },
          }}
        >
          <Button onClick={handleLogout}>
            <KeyboardArrowLeftIcon sx={{ fontSize: '48px', color: 'black', mr: 0 }} />
          </Button>

          <Typography
            variant="h3"
            sx={{
              '@media (max-width: 320px)': {
                ml: '-27px',
              },
            }}
          >
            {t('title')}
          </Typography>
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {t('emailSent', { email })}
        </Typography>
      </Stack>
    </>
  );

  return (
    <FormProvider methods={methods} onSubmit={onSubmit}>
      {renderHead}

      {renderForm}
    </FormProvider>
  );
}
