'use client';

import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Button } from '@mui/material';
import { Box, IconButton, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSignUpMutation } from 'store/authApi';
import { pageLinks } from 'constants/pageLinks';

const StyledTextFiled = styled(TextField)`
  margin-bottom: 1.5 rem;
`;

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

type SignUpPageType = {
  Main: {
    [key: string]: string;
  };
  TermsContent: {
    [key: string]: string;
  };
};

type SignUpProps = {
  SignUpPage: SignUpPageType;
};

function SignUpForm({ signUpPage }: SignUpProps) {
  
  const [signUp] = useSignUpMutation(); 
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
  const { register, handleSubmit, formState, watch } = form;
  const { errors, isValid } = formState;

  const onSubmit = (data: FormValues) => {
    const { email, password } = data;
    const credentials = { email, password };
    signUp(credentials);
    router.push(pageLinks.VERIFY_PAGE);
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', width: '70%', gap: '0.9rem' }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <StyledTextFiled
        variant="outlined"
        label={signUpPage.Main.emailInput}
        placeholder={signUpPage.Main.emailInputPlaceholder}
        type="email"
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
      />
      <StyledTextFiled
        variant="outlined"
        label={signUpPage.Main.passwordInput}
        placeholder={signUpPage.Main.minChar}
        type={showPassword ? 'text' : 'password'}
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
      />
      <StyledTextFiled
        variant="outlined"
        label={signUpPage.Main.repeatLabel}
        placeholder={signUpPage.Main.minChar}
        type={showRepeatPassword ? 'text' : 'password'}
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
        }}
      />
      <Button type="submit" variant="contained" sx={{ my: '20px' }} fullWidth disabled={!isValid}>

        {signUpPage.Main.title}
      </Button>
    </Box>
  );
}

export default SignUpForm;
