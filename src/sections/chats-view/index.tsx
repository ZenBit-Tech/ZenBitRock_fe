import { Backdrop, CircularProgress, Container } from '@mui/material';
import { Stack } from '@mui/system';
import { useTranslations } from 'next-intl';
import { useMount, useState } from 'hooks';
import { GoBackPageTitile, Onboarding, useOnboardingContext, DELAY } from 'components/custom';
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
      <ChatsList t={t} />
    </Container>
  );
}
