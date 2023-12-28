'use client';

import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Box, Stack } from '@mui/material';
import { patterns } from 'constants/patterns';

type TFunction = (key: string) => string;

type Props = {
  t: TFunction;
  groupNameUp: (name: string) => void;
  closeModalUp: () => void;
};

type FormValues = {
  groupName: string;
};

export default function FormFirst({ t, groupNameUp, closeModalUp }: Props): JSX.Element {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      groupName: '',
    },
  });

  const onSubmit = async (data: FormValues) => {
    const { groupName } = data;

    groupNameUp(groupName);
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', width: '90%' }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h3" sx={{ marginBottom: '1.5rem' }}>
        {t('addGroupChat')}
      </Typography>

      <TextField
        {...register('groupName', {
          required: t('groupNameRequired'),
          pattern: {
            value: patterns.name,
            message: t('groupNameInvalid'),
          },
        })}
        sx={{ height: '80px', mb: '0.9rem' }}
        variant="outlined"
        label={t('groupNameLabel')}
        placeholder={t('groupNameInputPlaceholder')}
        type="email"
        fullWidth
        error={Boolean(errors?.groupName)}
        helperText={errors?.groupName && <div>{errors.groupName.message}</div>}
        autoComplete=""
      />
      <Stack sx={{ mt: 5 }}>
        <Button type="submit" variant="contained" color="primary" disabled={!isValid}>
          {t('addGroupBtnTxt')}
        </Button>
        <Button type="reset" variant="contained" color="primary" onClick={() => closeModalUp()}>
          {t('cancelBtnTxt')}
        </Button>
      </Stack>
    </Box>
  );
}
