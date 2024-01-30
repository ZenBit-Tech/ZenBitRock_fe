'use client';

import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Box, Stack } from '@mui/material';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import { useAddContentMutation } from 'store/content/content-api';
import { ContentType } from 'types/content';
import { patterns } from 'constants/patterns';

type Props = {
  t: Function;
  closeModalUp: () => void;
  type: ContentType;
};

type FormValues = {
  title: string;
  link: string;
  screenshot: string;
};

export default function AddContentForm({ t, closeModalUp, type }: Props): JSX.Element {
  const [addContent, { isLoading }] = useAddContentMutation();
  const { enqueueSnackbar } = useSnackbar();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onBlur',
    defaultValues: {
      title: '',
      link: '',
      screenshot: '',
    },
  });

  const onSubmit = async (data: FormValues): Promise<void> => {
    const preparedData = { ...data, type };

    try {
      await addContent(preparedData).unwrap();
      reset();
      closeModalUp();
    } catch (error) {
      enqueueSnackbar(`${t('somethingWentWrong')}: ${error.data.message}`, {
        variant: 'error',
      });
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', width: '100%', position: 'relative' }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h3" sx={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {t('addContent')}
      </Typography>

      <TextField
        {...register('title', {
          required: t('titleRequired'),
        })}
        sx={{ height: '80px', mb: '0.9rem' }}
        variant="outlined"
        label={t('title')}
        placeholder={t('titlePlaceholder')}
        type="text"
        fullWidth
        error={Boolean(errors?.title)}
        helperText={errors?.title && <div>{errors.title.message}</div>}
        autoComplete=""
      />
      <TextField
        {...register('link', {
          required: t('linkRequired'),
          pattern: {
            value: patterns.url,
            message: t('invalidUrl'),
          },
        })}
        sx={{ height: '80px', mb: '0.9rem' }}
        variant="outlined"
        label={t('link')}
        placeholder={t('linkPlaceholder')}
        type="text"
        fullWidth
        error={Boolean(errors?.link)}
        helperText={errors?.link && <div>{errors.link.message}</div>}
        autoComplete=""
      />
      <TextField
        {...register('screenshot', {
          pattern: {
            value: patterns.url,
            message: t('invalidUrl'),
          },
        })}
        sx={{ height: '80px', mb: '0.9rem' }}
        variant="outlined"
        label={t('screenshot')}
        placeholder={t('screenshotPlaceholder')}
        type="text"
        fullWidth
        error={Boolean(errors?.screenshot)}
        helperText={errors?.screenshot && <div>{errors.screenshot.message}</div>}
        autoComplete=""
      />
      <Stack sx={{ mt: 5, position: 'relative' }}>
        {isLoading && (
          <LoadingScreen
            sx={{
              position: 'absolute',
              top: '-70px',
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: '100',
            }}
          />
        )}
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
          sx={{ mb: '1rem' }}
        >
          {t('addContent')}
        </Button>
        <Button type="reset" variant="contained" color="primary" onClick={() => closeModalUp()}>
          {t('cancel')}
        </Button>
      </Stack>
    </Box>
  );
}
