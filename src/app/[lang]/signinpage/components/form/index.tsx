'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useState } from 'react';
import { Link } from './styles';
import { getDictionary } from 'lib/dictionary';
type FormValues = {
  email: string;
  password: string;
};
type Props = {
  lang: Locale;
};

export default function LoginForm() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const [showPassword, setShowPassword] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" sx={{ marginBottom: '30px' }}>
        Sign in
      </Typography>

      <TextField
        {...register('email', {
          required: 'This field is required',
          pattern: {
            value: emailPattern,
            message: 'Invalid email address',
          },
        })}
        label="Email"
        fullWidth
        sx={{ marginBottom: '30px' }}
        error={Boolean(errors?.email)}
        helperText={errors?.email && <div>{errors.email.message}</div>}
      />

      <TextField
        {...register('password', {
          required: 'This field is required',
          minLength: {
            value: 8,
            message: 'Min 8 characters long',
          },
        })}
        label="Password"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        sx={{ marginBottom: '20px' }}
        error={Boolean(errors?.password)}
        helperText={errors?.password && <div>{errors.password.message}</div>}
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          ),
        }}
      />

      <Typography variant="body2" sx={{ marginBottom: '10px' }}>
        <Link href="/testpage">Forgot password</Link>
      </Typography>

      <Button
        sx={{ marginBottom: '20px' }}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!isValid}
      >
        Sign in
      </Button>
    </form>
  );
}
