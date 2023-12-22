'use client';

import React, { useEffect } from 'react';
import { useTranslations } from 'next-intl';
import Container from '@mui/material/Container';
import { Typography } from '@mui/material';
import { useGetAllUsersMutation } from 'store/api/userApi';
import { useSettingsContext } from 'components/settings';
import { LoadingScreen } from 'components/loading-screen';
import ChatNav from 'sections/chat/chat-nav';
import { View500 } from 'sections/error';
import { ChatNotifications } from 'sections/chat/agent-network-notifications';

export default function AgentNetworkView(): JSX.Element {
  const t = useTranslations('agents');
  const settings = useSettingsContext();
  const [getAllUsers, { data: usersData, isLoading, isError }] = useGetAllUsersMutation();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  if (isLoading || !usersData) return <LoadingScreen />;
  if (isError) return <View500 />;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pt: '1rem', pb: 14 }}>
      <Typography variant="h3" sx={{ my: 3 }}>
        {t('pageTitle')}
      </Typography>
      <ChatNotifications />
      <ChatNav agents={usersData} loading={isLoading} />
    </Container>
  );
}
