'use client';

import { Button, Typography, Box, Stack } from '@mui/material';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import { AppRoute } from 'enums';
import { useRouter } from 'hooks';
import { useDeleteChatMutation } from 'store/chat';

type Props = {
  t: Function;
  closeModalUp: () => void;
  chatId?: string;
};

export function FormDelete({ t, closeModalUp, chatId }: Props): JSX.Element {
  const [deleteChat, { isLoading }] = useDeleteChatMutation();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const handleClick = async (): Promise<void> => {
    try {
      if (chatId) await deleteChat({ id: chatId }).unwrap();

      router.push(`${AppRoute.CHATS_PAGE}`);
    } catch (error) {
      enqueueSnackbar(`${t('somethingWentWrong')}: ${error.data.message}`, { variant: 'error' });
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {t('doYouWantDeleteChat')}
      </Typography>
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
          sx={{ mb: '1rem' }}
          onClick={handleClick}
        >
          {t('yesDelete')}
        </Button>
        <Button type="reset" variant="contained" color="error" onClick={() => closeModalUp()}>
          {t('cancelBtnTxt')}
        </Button>
      </Stack>
    </Box>
  );
}
