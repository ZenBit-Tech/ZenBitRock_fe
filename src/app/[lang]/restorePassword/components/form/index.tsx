'use client';
import { useForm, SubmitHandler } from 'react-hook-form';
import { TextField, Button, Typography } from '@mui/material';
import { Form } from './styles';
import { patterns } from 'constants/patterns';

type FormValues = {
  email: string;
  password: string;
};

type RestorePasswordPageType = {
  RestorePasswordForm: {
    [key: string]: string;
  };
};

type RestorePasswordPageProps = {
  RestorePasswordPage: RestorePasswordPageType;
};

export default function RestorePasswordForm({ RestorePasswordPage }: RestorePasswordPageProps) {
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
    reset();
  };
  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Typography variant="h3" sx={{ marginBottom: '30px' }}>
        {RestorePasswordPage.RestorePasswordForm.title}
      </Typography>
      <Typography variant="h6" sx={{ marginBottom: '30px' }}>
        {RestorePasswordPage.RestorePasswordForm.enterEmail}
      </Typography>

      <TextField
        {...register('email', {
          required: RestorePasswordPage.RestorePasswordForm.requiredField,
          pattern: {
            value: patterns.EMAIL_VALIDATION_PATTERN,
            message: RestorePasswordPage.RestorePasswordForm.invalidEmail,
          },
        })}
        label={RestorePasswordPage.RestorePasswordForm.emailLabel}
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
        {RestorePasswordPage.RestorePasswordForm.btnTitle}
      </Button>
    </Form>
  );
}
