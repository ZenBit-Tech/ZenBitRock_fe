'use client';

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { useGetAllUsersMutation } from 'store/api/userApi';
import { RootState } from 'store';
import { useSettingsContext } from 'components/settings';
import { LoadingScreen } from 'components/loading-screen';
import ChatNav from 'sections/chat/chat-nav';
import { Page500 } from 'sections/error';
import { ChatNotifications } from 'sections/chat/agent-network-notifications';

export default function AgentNetworkView(): JSX.Element {
  const t = useTranslations('agents');
  const settings = useSettingsContext();
  const [getAllUsers, { data: usersData, isLoading, isError }] = useGetAllUsersMutation();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const authUser = useSelector((state: RootState) => state.authSlice.user);

  if (isLoading || !usersData || !authUser)
    return <LoadingScreen sx={{ mt: 'calc(100vh / 2 - 65px)' }} />;
  if (isError) return <Page500 />;

  const { id } = authUser;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pb: 14 }}>
      <Typography variant="h3" sx={{ my: 3 }}>
        {t('pageTitle')}
      </Typography>
      <ChatNotifications />
      <ChatNav agents={usersData} loading={isLoading} id={id} />
    </Container>
  );
}
