'use client';

import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useTranslations } from 'next-intl';
import { useCallback, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import LoadingButton from '@mui/lab/LoadingButton';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { paths } from 'routes/paths';
import { EmailInboxIcon } from 'assets/icons';
import Iconify from 'components/iconify';
import { RouterLink } from 'routes/components';
import FormProvider, { RHFCode } from 'components/hook-form';
import { useSendVerificationCodeMutation, useVerifyEmailMutation } from 'store/auth';
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

  const [remainingTime, setRemainingTime] = useState<number>(180);
  const [isExpired, setIsExpired] = useState<boolean>(false);

  const handleSendCode = useCallback(async (): Promise<void> => {
    try {
      await sendVerificationCode({ email });
      setRemainingTime(180);
      setIsExpired(false);
    } catch (error) {
      notFound();
    }
  }, [email, sendVerificationCode]);

  const methods = useForm({
    mode: 'onChange',
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

  const t = useTranslations('VerifyEmail');

  const onSubmit = handleSubmit(async (data) => {
    try {
      await verifyEmail(data).unwrap();
    } catch (error) {
      reset();
      setValue('email', email);
    }
  });

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

  const renderForm = (
    <Stack spacing={3} alignItems="center">
      <RHFCode name="code" />

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

      {isExpired ? (
        <Link
          onClick={handleSendCode}
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

          <Stack>
            <Typography variant="body2">{t('dontHaveCode')}</Typography>

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
        </>
      )}

      <Link
        component={RouterLink}
        href={paths.auth.login}
        color="inherit"
        variant="subtitle2"
        sx={{
          alignItems: 'center',
          display: 'inline-flex',
        }}
      >
        <Iconify icon="eva:arrow-ios-back-fill" width={16} />
        {t('return')}
      </Link>
    </Stack>
  );

  const renderHead = (
    <>
      <EmailInboxIcon sx={{ height: 96 }} />

      <Stack spacing={1} sx={{ my: 5 }}>
        <Typography variant="h3">{t('title')}</Typography>
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
