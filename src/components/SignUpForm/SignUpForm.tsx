'use client';

import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { Box, IconButton, styled } from '@mui/material';
import { Button } from '@mui/material';


const StyledTextFiled = styled(TextField)`
  margin-bottom: 1.5 rem;
`;

type FormValues = {
  email: string;
  password: string;
  repeatPassword: string;
};

type SignUpProps = {
  [key: string]: {
    [key: string]: string;
  };
};

function SignUpForm({ SignUpPage }: SignUpProps) {
  const form = useForm<FormValues>({
    defaultValues: {
      email: '',
      password: '',
      repeatPassword: '',
    },
    mode: 'onBlur',
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
  const router = useRouter();
  const { register, handleSubmit, formState, watch } = form;
  const { errors } = formState;

  const onSubmit = async (data: FormValues) => {
    console.log(data);
    router.push('/verify-email');
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
        label={SignUpPage.emailInput}
        placeholder="name@domain.com"
        type="email"
        autoFocus
        {...register('email', {
          required: SignUpPage.emailRequired,
          pattern: {
            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/i,
            message: SignUpPage.emailInvalid,
          },
        })}
        error={!!errors.email}
        helperText={errors.email?.message}
      />
      <StyledTextFiled
        variant="outlined"
        label={SignUpPage.passwordInput}
        placeholder={SignUpPage.minChar}
        type={showPassword ? 'text' : 'password'}
        {...register('password', {
          required: SignUpPage.passwordRequired,
          pattern: {
            value: /^.{8,}$/i,
            message: SignUpPage.minChar,
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
        label={SignUpPage.repeatLabel}
        placeholder={SignUpPage.minChar}
        type={showRepeatPassword ? 'text' : 'password'}
        {...register('repeatPassword', {
          required: SignUpPage.passwordRequired,
          validate: (value) => value === watch('password') || SignUpPage.unmatchPass,
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
      <Button type="submit" variant="contained" sx={{ my: '20px' }} fullWidth>
        {SignUpPage.title}
      </Button>
    </Box>
  );
}

export default SignUpForm;
