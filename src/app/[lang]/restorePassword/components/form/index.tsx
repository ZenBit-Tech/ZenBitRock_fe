'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';
import { getDictionary } from 'lib/dictionary';
import { Form } from './styles';

type FormValues = {
  email: string;
  password: string;
};
type Props = {
  lang: Locale;
};

export default function RestorePasswordForm() {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit: SubmitHandler<FormValues> = (data) => {
    console.log(data);
    reset();
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" sx={{ marginBottom: '30px' }}>
        Restore password
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '30px' }}>
        Enter your email for restore
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

      <Button
        sx={{ marginBottom: '20px', padding: '14px' }}
        type="submit"
        variant="contained"
        color="primary"
        fullWidth
        disabled={!isValid}
      >
        Send Code
      </Button>
    </Form>
  );
}
