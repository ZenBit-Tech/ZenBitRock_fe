'use client';

import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { notFound, useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { Box, IconButton, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSnackbar } from 'notistack';
import { setCredentials, useSignUpMutation } from 'store/auth';
import { SignUpPageType } from 'types/auth';
import { useDispatch } from 'react-redux';
import { AppDispatch } from 'store';
import { AppRoute } from 'enums';

const StyledTextFiled = styled(TextField)`
  margin-bottom: 1.5 rem;
`;

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

type SignUpProps = {
  SignUpPage: SignUpPageType;
};

function SignUpForm({ SignUpPage }: SignUpProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [signUp, { error }] = useSignUpMutation();
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    mode: 'onBlur',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);
  const router = useRouter();
  const dispatch = useDispatch<AppDispatch>();
  const { register, handleSubmit, formState, watch } = form;
  const { errors, isValid } = formState;

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;
    try {
      const res = await signUp({ email, password });
      if ('data' in res) {
        const {
          token,
          user: { id, email },
        } = res.data;
        dispatch(setCredentials({ id, email, token }));
        enqueueSnackbar('User added successfully!', { variant: 'success' });
        router.push(AppRoute.VERIFY_PAGE);
      }
    } catch (error) {
      notFound();
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', width: '90%', gap: '0.9rem' }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
    >
      <StyledTextFiled
        variant="outlined"
        label={SignUpPage.Main.emailInput}
        placeholder={SignUpPage.Main.emailInputPlaceholder}
        type="email"
        autoFocus
        {...register('email', {
          required: SignUpPage.Main.emailRequired,
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: SignUpPage.Main.emailInvalid,
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="new-email"
      />
      <StyledTextFiled
        variant="outlined"
        label={SignUpPage.Main.passwordInput}
        placeholder={SignUpPage.Main.minChar}
        type={showPassword ? 'text' : 'password'}
        {...register('password', {
          required: SignUpPage.Main.passwordRequired,
          pattern: {
            value: /^.{8,}$/i,
            message: SignUpPage.Main.minChar,
          },
        })}
        error={!!errors.password}
        helperText={errors.password?.message}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ),
          autoComplete: 'new-password',
        }}
      />
      <StyledTextFiled
        variant="outlined"
        label={SignUpPage.Main.repeatLabel}
        placeholder={SignUpPage.Main.minChar}
        type={showRepeatPassword ? 'text' : 'password'}
        {...register('repeatPassword', {
          required: SignUpPage.Main.passwordRequired,
          validate: (value) => value === watch('password') || SignUpPage.Main.unmatchPass,
        })}
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setShowRepeatPassword(!showRepeatPassword)} edge="end">
              {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ),
          autoComplete: 'new-password',
        }}
      />
      <Button type="submit" variant="contained" sx={{ my: '20px' }} fullWidth disabled={!isValid}>
        {SignUpPage.Main.title}
      </Button>
    </Box>
  );
}

export default SignUpForm;
