'use client';
import { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { patterns } from 'constants/patterns';
import { links } from 'constants/links';
import { Form } from './styles';
import { Button, Typography, Link } from '@mui/material';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useSignInMutation } from 'store/authApi';
import { pageLinks } from 'constants/pageLinks';
import { useRouter } from 'next/navigation';

type FormValues = {
  email: string;
  password: string;
};

type SignInPageType = {
  Main: {
    [key: string]: string;
  };
  LoginForm: {
    [key: string]: string;
  };
};

type SignInProps = {
  SignInPage: SignInPageType;
};

export default function LoginForm({ SignInPage }: SignInProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [signIn, { isError }] = useSignInMutation();
  const router = useRouter();
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

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    try {
      const res = await signIn(data);
      console.log(res.data.token);
    } catch (error) {
      console.log(error.message);
    }

    // router.push(pageLinks.VERIFY_PAGE);
    reset();
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" sx={{ marginBottom: '30px' }}>
        {SignInPage.LoginForm.title}
      </Typography>

      <TextField
        {...register('email', {
          required: SignInPage.LoginForm.requiredField,
          pattern: {
            value: patterns.EMAIL_VALIDATION_PATTERN,
            message: SignInPage.LoginForm.invalidEmail,
          },
        })}
        variant="outlined"
        label={SignInPage.LoginForm.emailLabel}
        type="email"
        fullWidth
        sx={{ marginBottom: '30px' }}
        error={Boolean(errors?.email)}
        helperText={errors?.email && <div>{errors.email.message}</div>}
      />

      <TextField
        {...register('password', {
          required: SignInPage.LoginForm.requiredField,
          minLength: {
            value: 8,
            message: SignInPage.LoginForm.minPassword,
          },
        })}
        variant="outlined"
        label={SignInPage.LoginForm.passwordLabel}
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
        <Link href={links.FORGOT_PASSWORD_PAGE} color="primary">
          {SignInPage.LoginForm.forgotPasswordLinkTitle}
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
        {SignInPage.LoginForm.btnTitle}
      </Button>
    </Form>
  );
}
