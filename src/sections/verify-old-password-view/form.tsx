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
  Link,
} from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/system/Stack';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { useSnackbar } from 'notistack';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch } from 'react-redux';

import { patterns } from 'constants/patterns';
import { AppRoute } from 'enums';
import { AppDispatch } from 'store';
import { useVerifyOldPasswordMutation } from 'store/api/resetPasswordApi';
import { setPassword } from 'store/reducers/restorePasswordReducer';

const StyledTextFiled = styled(TextField)`
  margin-bottom: 1.5 rem;
`;

type FormValues = {
  password: string;
};

function VerifyOldPasswordForm(): JSX.Element {
  const t = useTranslations('ResetPasswordPage');
  const form = useForm<FormValues>({
    defaultValues: {
      password: '',
    },
    mode: 'onBlur',
  });

  const dispatch = useDispatch<AppDispatch>();

  const [showPassword, setShowPassword] = useState<boolean>(false);

  const [verifyOldPassword, { isLoading }] = useVerifyOldPasswordMutation();

  const { enqueueSnackbar } = useSnackbar();
  const router = useRouter();

  const { register, handleSubmit, formState } = form;
  const { errors, isValid } = formState;

  const onSubmit = async (data: FormValues) => {
    try {
      const response = await verifyOldPassword({ oldPassword: data.password });

      if ('data' in response && response.data) {
        dispatch(setPassword({ password: data.password }));
        router.push(AppRoute.RESET_PASSWORD_CHANGE_PASSWORD_PAGE);
      } else {
        enqueueSnackbar('Enter valid password', { variant: 'error' });
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
        }}
        onSubmit={handleSubmit(onSubmit)}
        noValidate
      >
        <Stack spacing={2} direction="row" alignItems="center">
          <Typography variant="h5" sx={{}}>
            {t('enterPassword')}
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
            autoComplete: 'password',
          }}
        />
        <Typography variant="body2" sx={{ marginBottom: '10px' }}>
          <Link href={AppRoute.RESTORE_PASSWORD_PAGE} color="primary">
            {t('forgotPass')}
          </Link>
        </Typography>
        <Button type="submit" variant="contained" sx={{ my: '20px' }} fullWidth disabled={!isValid}>
          {t('buttonVerify')}
        </Button>
      </Box>
    </>
  );
}
export default VerifyOldPasswordForm;
