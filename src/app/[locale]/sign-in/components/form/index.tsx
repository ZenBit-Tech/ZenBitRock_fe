'use client';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Button, Typography, Link, Box, styled } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { notFound, useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { enqueueSnackbar } from 'notistack';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

import { StyledTextField } from 'components/SignUpForm/SignUpForm';
import { patterns } from 'constants/patterns';
import { AppRoute } from 'enums';
import { useSignInMutation } from 'store/auth';

const StyledTitle = styled(Typography)`
  @media (max-width: 1023px) {
    align-self: center;
  }
`;

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const router = useRouter();

  const t = useTranslations('signInPage');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signIn] = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await signIn(data);

      if ('data' in res) {
        enqueueSnackbar('Welcome back!', { variant: 'success' });
        router.push(AppRoute.MAIN_PAGE);
      }
    } catch (error) {
      notFound();
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', width: '90%' }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <StyledTitle variant="h3" sx={{ marginBottom: '1.5rem' }}>
        {t('LoginForm.title')}
      </StyledTitle>

      <StyledTextField
        {...register('email', {
          required: t('LoginForm.emailRequired'),
          pattern: {
            value: patterns.email,
            message: t('LoginForm.emailInvalid'),
          },
        })}
        sx={{ height: '80px', mb: '0.9rem' }}
        variant="outlined"
        label={t('LoginForm.emailLabel')}
        placeholder={t('LoginForm.emailInputPlaceholder')}
        type="email"
        fullWidth
        error={Boolean(errors?.email)}
        helperText={errors?.email && <div>{errors.email.message}</div>}
        autoComplete="new-email"
      />

      <StyledTextField
        {...register('password', {
          required: t('LoginForm.passwordRequired'),
          minLength: {
            value: 8,
            message: t('LoginForm.minChar'),
          },
        })}
        sx={{ height: '80px' }}
        variant="outlined"
        placeholder={t('LoginForm.passwordInputPlaceholder')}
        label={t('LoginForm.passwordLabel')}
        type={showPassword ? 'text' : 'password'}
        fullWidth
        error={Boolean(errors?.password)}
        helperText={errors?.password && <div>{errors.password.message}</div>}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ),
          autoComplete: 'new-password',
        }}
      />

      <Typography variant="body2" sx={{ marginBottom: '10px' }}>
        <Link href={AppRoute.RESTORE_PASSWORD_PAGE} color="primary">
          {t('LoginForm.forgotPasswordLinkTitle')}
        </Link>
      </Typography>

      <Button
        sx={{ mb: '20px', mt: '10px', padding: '14px' }}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!isValid}
      >
        {t('LoginForm.btnTitle')}
      </Button>
    </Box>
  );
}
