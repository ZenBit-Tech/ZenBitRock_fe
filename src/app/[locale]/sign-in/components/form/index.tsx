'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { notFound, useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { Button, Typography, Link, Box, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { enqueueSnackbar } from 'notistack';
import { AppDispatch } from 'store';
import { setCredentials, useSignInMutation } from 'store/auth';
import { patterns } from 'constants/patterns';
import { AppRoute } from 'enums';

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
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const t = useTranslations('signInPage');

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [signIn] = useSignInMutation();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    try {
      const res = await signIn(data);
      if ('data' in res) {
        const { id, email, token } = res.data;
        dispatch(setCredentials({ id, email, token }));
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

      <TextField
        {...register('email', {
          required: t('LoginForm.requiredField'),
          pattern: {
            value: patterns.email,
            message: t('LoginForm.invalidEmail'),
          },
        })}
        variant="outlined"
        label={t('LoginForm.emailLabel')}
        type="email"
        fullWidth
        sx={{ marginBottom: '0.9rem' }}
        error={Boolean(errors?.email)}
        helperText={errors?.email && <div>{errors.email.message}</div>}
        autoComplete="new-email"
      />

      <TextField
        {...register('password', {
          required: t('LoginForm.requiredField'),
          minLength: {
            value: 8,
            message: t('LoginForm.minPassword'),
          },
        })}
        variant="outlined"
        label={t('LoginForm.passwordLabel')}
        type={showPassword ? 'text' : 'password'}
        fullWidth
        sx={{ marginBottom: '0.9rem' }}
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
        sx={{ marginBottom: '20px' }}
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
