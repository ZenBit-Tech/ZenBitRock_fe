'use client';

import React from 'react';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { Backdrop, Button, CircularProgress, Typography } from '@mui/material';
import { Box, IconButton, styled } from '@mui/material';
import TextField from '@mui/material/TextField';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Stack from '@mui/system/Stack';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useTranslations } from 'next-intl';
import { AppRoute } from 'enums';
import { useSelector } from 'react-redux';
import { useResetPasswordMutation } from 'store/api/restorePasswordApi';

import { useSnackbar } from 'notistack';
import { RootState } from 'store';

const StyledTextFiled = styled(TextField)`
  margin-bottom: 1.5 rem;
`;

type FormValues = {
  password: string;
  repeatPassword: string;
};

function ChangePasswordForm(): JSX.Element {

  const t = useTranslations('ChangePasswordPage');
  const form = useForm<FormValues>({
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
    mode: 'onBlur',
  });

  const email = useSelector((state: RootState) => state.restorePasswordSlice.email);
  const code = useSelector((state: RootState) => state.restorePasswordSlice.code);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { register, handleSubmit, formState, watch } = form;
  const { errors, isValid } = formState;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await resetPassword({ email, code, password: data.password });

      if ('data' in response && response.data) {
        
        router.push(AppRoute.RESTORE_PASSWORD_DONE_PAGE);
      }
    } catch (error) {
      if (error?.data?.message) {
        enqueueSnackbar(error.data.message, { variant: 'error' });
      } else {
        enqueueSnackbar('An error occurred', { variant: 'error' });
      }
    }
  };

  return (
    <>
      {isLoading && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <Box
        component="form"
        sx={{
          display: 'flex',
          flexDirection: 'column',
          width: '70%',
          gap: '0.9rem',
          height: 'calc(100vh-180px)',
          justifyContent: 'center',
        }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Button onClick={() => router.back()}>
            <KeyboardArrowLeftIcon sx={{ fontSize: '48px', color: 'black' }} />
          </Button>

          <Typography variant="h3" sx={{}}>
            {t('title')}
          </Typography>
        </Stack>
        <StyledTextFiled
          variant="outlined"
          label={t('passwordInput')}
          placeholder={t('minChar')}
          type={showPassword ? 'text' : 'password'}
          {...register('password', {
            required: t('passwordRequired'),
            pattern: {
              value: /^.{8,}$/i,
              message: t('minChar'),
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
          label={t('repeatLabel')}
          placeholder={t('minChar')}
          type={showRepeatPassword ? 'text' : 'password'}
          {...register('repeatPassword', {
            required: t('passwordRequired'),
            validate: (value) => value === watch('password') || t('unmatchPass'),
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
          {t('title')}
        </Button>
      </Box>
    </>
  );
}

export default ChangePasswordForm;
