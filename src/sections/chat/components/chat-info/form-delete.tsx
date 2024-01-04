'use client';

import { Button, Typography, Box, Stack } from '@mui/material';
import { useSnackbar } from 'components/snackbar';
import { AppRoute } from 'enums';
import { useRouter } from 'hooks';
import { useDeleteChatMutation } from 'store/chat';

type Props = {
  t: Function;
  closeModalUp: () => void;
  chatId: string;
};

export function FormDelete({ t, closeModalUp, chatId }: Props): JSX.Element {
  const [deleteChat] = useDeleteChatMutation();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const handleClick = async (): Promise<void> => {
    try {
      await deleteChat({ id: chatId }).unwrap();

      router.push(`${AppRoute.MESSAGES_PAGE}`);
    } catch (error) {
      enqueueSnackbar(`${t('Something went wrong')}: ${error.data.message}`, { variant: 'error' });
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {t('Do you want delete chat?')}
      </Typography>
      <Stack sx={{ mt: 5 }}>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          sx={{ mb: '1rem' }}
          onClick={handleClick}
        >
          {t('Yes delete')}
        </Button>
        <Button type="reset" variant="contained" color="primary" onClick={() => closeModalUp()}>
          {t('cancelBtnTxt')}
        </Button>
      </Stack>
    </Box>
  );
}
