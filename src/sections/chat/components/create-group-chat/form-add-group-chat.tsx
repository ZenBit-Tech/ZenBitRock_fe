'use client';

import { useForm } from 'react-hook-form';
import { Button, TextField, Typography, Box, Stack } from '@mui/material';
import { useSnackbar } from 'components/snackbar';
import { patterns } from 'constants/patterns';
import { AppRoute } from 'enums';
import { useRouter } from 'hooks';
import { useCreateGroupChatMutation } from 'store/chat';

type Props = {
  t: Function;
  closeModalUp: () => void;
};

type FormValues = {
  groupName: string;
};

export default function FormAddGroupChat({ t, closeModalUp }: Props): JSX.Element {
  const [createGroupChat] = useCreateGroupChatMutation();

  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<FormValues>({
    mode: 'onTouched',
    defaultValues: {
      groupName: '',
    },
  });

  const onSubmit = async (data: FormValues): Promise<void> => {
    const { groupName } = data;

    try {
      const { chat } = await createGroupChat({
        title: groupName,
        isPrivate: false,
      }).unwrap();

      if (chat) {
        router.push(`${AppRoute.CHAT_PAGE}/${chat.id}/info`);
      }
    } catch (error) {
      enqueueSnackbar(`${t('somethingWentWrong')}: ${error.data.message}`, {
        variant: 'error',
      });

      reset();
    }
  };

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      autoComplete="off"
    >
      <Typography variant="h3" sx={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {t('addGroupChat')}
      </Typography>

      <TextField
        {...register('groupName', {
          required: t('groupNameRequired'),
          pattern: {
            value: patterns.groupName,
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
        <Button
          type="submit"
          variant="contained"
          color="primary"
          disabled={!isValid}
          sx={{ mb: '1rem' }}
        >
          {t('addGroupBtnTxt')}
        </Button>
        <Button type="reset" variant="contained" color="primary" onClick={() => closeModalUp()}>
          {t('cancelBtnTxt')}
        </Button>
      </Stack>
    </Box>
  );
}
