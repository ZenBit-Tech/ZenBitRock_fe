'use client';

import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import {
  Backdrop,
  Button,
  CircularProgress,
  Typography,
  Box,
  IconButton,
  styled,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/system/Stack';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useSelector } from 'react-redux';

import { patterns } from 'constants/patterns';
import { AppRoute } from 'enums';
import { RootState } from 'store';
import { useChangePasswordMutation } from 'store/api/resetPasswordApi';

const StyledTextFiled = styled(TextField)`
  margin-bottom: 1.5 rem;
`;

type FormValues = {
  password: string;
  repeatPassword: string;
};

function ResetPasswordForm(): JSX.Element {
  const t = useTranslations('ResetPasswordPage');
  const form = useForm<FormValues>({
    defaultValues: {
      password: '',
      repeatPassword: '',
    },
    mode: 'onBlur',
  });

  const oldPassword = useSelector((state: RootState) => state.restorePasswordSlice.password);

  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState<boolean>(false);

  const [changePassword, { isLoading }] = useChangePasswordMutation();

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { register, handleSubmit, formState, watch } = form;
  const { errors, isValid } = formState;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await changePassword({ oldPassword, newPassword: data.password });

      if ('data' in response && response.data) {
        router.push(AppRoute.RESET_PASSWORD_DONE_PAGE);
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
          gap: '0.9rem',
          height: 'calc(100vh-180px)',
          justifyContent: 'center',
          maxWidth: '800px',
          margin: '0 auto',
          padding: '1rem',
        }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Typography variant="h5" sx={{}}>
            {t('enterNewPassword')}
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
              value: patterns.password,
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
          {t('buttonReset')}
        </Button>
      </Box>
    </>
  );
}

export default ResetPasswordForm;
