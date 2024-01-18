import { Backdrop, CircularProgress, Container } from '@mui/material';
import { Stack } from '@mui/system';
import { useTranslations } from 'next-intl';
import { useSelector, useMount, useState } from 'hooks';
import { selectCurrentUser } from 'store/auth/authReducer';
import { useGetChatsQuery } from 'store/chat/chat-api';
import { LoadingScreen } from 'components/loading-screen';
import {
  GoBackPageTitile,
  Onboarding,
  useOnboardingContext,
  DELAY,
  chatsMockData,
} from 'components/custom';
import { Page500 } from 'sections/error';
import ChatsList from './chats-list';
import AddGroupChatButton from './add-group-chat-button';

export default function ChatsView(): JSX.Element {
  const t = useTranslations('ChatsPage');
  const [showLoader, setLoader] = useState(true);
  const {
    setState,
    state: { tourActive, stepIndex },
  } = useOnboardingContext();

  useMount(() => {
    if (tourActive) {
      setTimeout(() => {
        setLoader(false);
        setState({ run: true, stepIndex: 11 });
      }, DELAY);
    }
  });

  const authState = useSelector(selectCurrentUser);
  const userId = authState.user ? authState.user.id : '';

  const { data, isLoading, isError } = useGetChatsQuery({ userId });

  const chats = tourActive ? chatsMockData : data;

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <Page500 />;
  }

  return (
    <Container sx={{ pb: 8, pt: 0, px: 2 }} className="onboarding-step-12">
      {((showLoader && tourActive) || stepIndex === 15) && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <Onboarding />
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
