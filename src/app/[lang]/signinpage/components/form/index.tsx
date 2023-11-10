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

export default async function LoginForm({ lang }: Props) {
  const { TestPage } = await getDictionary(lang);
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
      <Typography variant="h4" gutterBottom>
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
        margin="normal"
        variant="outlined"
      />
      {errors?.email && <div>{errors.email.message}</div>}

      <TextField
        {...register('password', {
          required: 'This field is required',
          minLength: {
            value: 8,
            message: 'Password must be at least 8 characters long',
          },
        })}
        label="Password"
        type={showPassword ? 'text' : 'password'}
        fullWidth
        margin="normal"
        variant="outlined"
        InputProps={{
          endAdornment: (
            <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
              {showPassword ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          ),
        }}
      />
      {errors?.password && <div>{errors.password.message}</div>}

      <Typography variant="body2">
        <Link href="/testpage">Forgot password</Link>
      </Typography>

      <Button type="submit" variant="contained" color="primary" fullWidth disabled={!isValid}>
        Sign in
      </Button>
    </form>
  );
}
