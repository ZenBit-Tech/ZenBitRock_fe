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
import { useSignUpMutation } from 'store/auth';
import { SignUpPageType } from 'types/auth';
import { AppRoute } from 'enums';
import { colors } from 'constants/colors';

export const StyledTextField = styled(TextField)`
  & .MuiOutlinedInput-input {
    &:-webkit-autofill {
      box-shadow: 0 0 0 100px ${colors.PRIMARY_LIGHT_COLOR} inset;
      -webkit-text-fill-color: default;
    }
  }
`;

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

type SignUpProps = {
  signUpPage: SignUpPageType;
};

function SignUpForm({ signUpPage }: SignUpProps) {
  const router = useRouter();

  const { enqueueSnackbar } = useSnackbar();

  const [signUp] = useSignUpMutation();

  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    mode: 'onTouched',
  });

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  const { register, handleSubmit, formState, watch } = form;
  const { errors, isValid } = formState;

  const onSubmit = async (data: FormValues) => {
    const { email, password } = data;
    try {
      const res = await signUp({ email, password });
      if ('data' in res) {
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
      <StyledTextField
        variant="outlined"
        label={signUpPage.Main.emailInput}
        placeholder={signUpPage.Main.emailInputPlaceholder}
        type="email"
        sx={{ height: '80px' }}
        autoFocus
        {...register('email', {
          required: signUpPage.Main.emailRequired,
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: signUpPage.Main.emailInvalid,
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
        autoComplete="off"
      />
      <StyledTextField
        variant="outlined"
        label={signUpPage.Main.passwordInput}
        placeholder={signUpPage.Main.passwordInputPlaceholder}
        type={showPassword ? 'text' : 'password'}
        sx={{ height: '80px' }}
        {...register('password', {
          required: signUpPage.Main.passwordRequired,
          pattern: {
            value: /^.{8,}$/i,
            message: signUpPage.Main.minChar,
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
        }}
        autoComplete="off"
      />
      <StyledTextField
        variant="outlined"
        label={signUpPage.Main.repeatLabel}
        placeholder={signUpPage.Main.passwordInputPlaceholder}
        type={showRepeatPassword ? 'text' : 'password'}
        sx={{ height: '80px' }}
        {...register('repeatPassword', {
          required: signUpPage.Main.passwordRequired,
          validate: (value) => value === watch('password') || signUpPage.Main.unmatchPass,
        })}
        error={!!errors.repeatPassword}
        helperText={errors.repeatPassword?.message}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setShowRepeatPassword(!showRepeatPassword)} edge="end">
              {showRepeatPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ),
          autoComplete: 'off',
        }}
        autoComplete="off"
      />
      <Button
        type="submit"
        variant="contained"
        sx={{ mb: '20px', mt: '10px', padding: '14px' }}
        color="primary"
        fullWidth
        disabled={!isValid}
      >
        {signUpPage.Main.title}
      </Button>
    </Box>
  );
}

export default SignUpForm;
