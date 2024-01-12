import { Container } from '@mui/material';
import { Stack } from '@mui/system';
import { useTranslations } from 'next-intl';
import { useSelector } from 'hooks';
import { selectCurrentUser } from 'store/auth/authReducer';
import { useGetChatsQuery } from 'store/chat/chat-api';
import { LoadingScreen } from 'components/loading-screen';
import { GoBackPageTitile } from 'components/custom';
import { Page500 } from 'sections/error';
import ChatsList from './chats-list';
import AddGroupChatButton from './add-group-chat-button';

export default function ChatsView(): JSX.Element {
  const t = useTranslations('ChatsPage');

  const authState = useSelector(selectCurrentUser);
  const userId = authState.user ? authState.user.id : '';

  const { data: chats, isLoading, isError } = useGetChatsQuery({ userId });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <Page500 />;
  }

  return (
    <Container sx={{ pb: 8, pt: 0, px: 2 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="space-between"
        justifyItems="center"
        sx={{ mb: 2, ml: '-22px' }}
      >
        <Stack direction="row" alignItems="center" alignContent="center">
          <GoBackPageTitile title={t('pageTitle')} />
        </Stack>

        <AddGroupChatButton t={t} />
      </Stack>
      {chats && <ChatsList t={t} chats={chats} />}
    </Container>
  );
}
