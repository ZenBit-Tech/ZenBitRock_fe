'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import Container from '@mui/material/Container';
import { Backdrop, CircularProgress, Typography } from '@mui/material';
import { useEffect, useMount, useState, useSelector } from 'hooks';
import { useGetSynchronizedUsersMutation } from 'store/api/userApi';
import { RootState } from 'store';
import { useSettingsContext } from 'components/settings';
import { LoadingScreen } from 'components/loading-screen';
import ChatNav from 'sections/chat/chat-nav';
import { Page500 } from 'sections/error';
import { DELAY, Onboarding, agentsMockData, useOnboardingContext } from 'components/custom';

export default function AgentNetworkView(): JSX.Element {
  const t = useTranslations('agents');
  const settings = useSettingsContext();
  const [getSynchronizedUsers, { data: usersData, isLoading, isError }] =
    useGetSynchronizedUsersMutation();

  const [showLoader, setLoader] = useState<boolean>(true);
  const {
    setState,
    state: { tourActive, stepIndex },
  } = useOnboardingContext();

  useEffect(() => {
    getSynchronizedUsers();
  }, [getSynchronizedUsers]);

  useMount(() => {
    if (tourActive) {
      setTimeout(() => {
        setLoader(false);
        setState({ run: true, stepIndex: 8 });
      }, DELAY);
    }
  });

  const authUser = useSelector((state: RootState) => state.authSlice.user);

  if (isLoading || !usersData || !authUser)
    return <LoadingScreen sx={{ mt: 'calc(100vh / 2 - 65px)' }} />;
  if (isError) return <Page500 />;

  const { id } = authUser;

  return (
    <>
      {((showLoader && tourActive) || stepIndex === 11) && (
        <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
          <CircularProgress color="primary" />
        </Backdrop>
      )}
      <Onboarding />
      <Container
        maxWidth={settings.themeStretch ? false : 'lg'}
        sx={{ pb: 14 }}
        className="onboarding-step-9"
      >
        <Typography variant="h3" sx={{ mt: 3, mb: 1 }}>
          {t('pageTitle')}
        </Typography>
        <ChatNav agents={tourActive ? agentsMockData : usersData} loading={isLoading} id={id} />
      </Container>
    </>
  );
}
