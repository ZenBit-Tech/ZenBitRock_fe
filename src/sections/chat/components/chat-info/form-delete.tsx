'use client';

import { Button, Typography, Box, Stack } from '@mui/material';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import { AppRoute } from 'enums';
import { useRouter } from 'hooks';
import { useDeleteChatMutation, useUpdateChatMutation } from 'store/chat';

type Props = {
  t: Function;
  closeModalUp: () => void;
  chatId?: string;
  ownerId: string | undefined;
  userId: string | null;
  chatMembers: Member[] | undefined;
  updateGroupChat: ReturnType<typeof useUpdateChatMutation>[0];
};

type Member = {
  label: string;
  id: string;
};

export function FormDelete({
  t,
  closeModalUp,
  chatId,
  ownerId,
  userId,
  updateGroupChat,
  chatMembers,
}: Props): JSX.Element {
  const [deleteChat, { isLoading }] = useDeleteChatMutation();
  const { enqueueSnackbar } = useSnackbar();

  const router = useRouter();

  const handleClick = async (): Promise<void> => {
    try {
      if (userId === ownerId) {
        if (chatId) await deleteChat({ id: chatId }).unwrap();
      } else if (chatMembers && userId !== ownerId) {
        closeModalUp();
        await updateGroupChat({
          id: chatId,
          memberIds: chatMembers.map((member) => member.id).filter((member) => member !== userId),
        }).unwrap();
      }
      router.push(`${AppRoute.CHATS_PAGE}`);
    } catch (error) {
      enqueueSnackbar(`${t('somethingWentWrong')}: ${error.data.message}`, { variant: 'error' });
    }
  };

  return (
    <Box>
      <Typography variant="h3" sx={{ marginBottom: '1.5rem', textAlign: 'center' }}>
        {userId === ownerId ? t('doYouWantDeleteChat') : t('doYouWantLeaveChat')}
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
          color="error"
          sx={{ mb: '1rem' }}
          onClick={handleClick}
        >
          {userId === ownerId ? t('yesDelete') : t('yesLeave')}
        </Button>
        <Button type="reset" variant="contained" color="primary" onClick={() => closeModalUp()}>
          {t('cancelBtnTxt')}
        </Button>
      </Stack>
    </Box>
  );
}
