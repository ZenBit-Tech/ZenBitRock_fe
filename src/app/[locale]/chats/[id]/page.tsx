'use client';

import React, { useEffect } from 'react';
import { ChatView } from 'sections/chat/view';
import { Page500 } from 'sections/error';
import { useGetUserByIdMutation } from 'store/api/userApi';
import { LoadingScreen } from 'components/loading-screen';

type Props = {
  params: { id: string };
};

function ChatPage({ params }: Props): JSX.Element {
  const [getUserById, { data: usersData, isLoading, isError }] = useGetUserByIdMutation();
  const { id } = params;

  useEffect(() => {
    getUserById({ id });
  }, [getUserById, id]);

  if (!usersData || isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <Page500 />;
  }

  return <ChatView id={params.id} user={usersData} />;
}

export default ChatPage;
