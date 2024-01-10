'use client';

import React from 'react';
import { ChatView } from 'sections/chat/view';
import { Page500 } from 'sections/error';
import { LoadingScreen } from 'components/loading-screen';
import { useGetChatByIdQuery } from 'store/chat';
import { useSelector } from 'react-redux';
import { RootState } from 'store';

type Props = {
  params: { id: string };
};

function ChatPage({ params }: Props): JSX.Element {
  const { id: chatId } = params;
  const { data: chatData, isFetching, isError, error } = useGetChatByIdQuery(chatId);
  const authUser = useSelector((state: RootState) => state.authSlice.user);

  if (isFetching || !chatData || !authUser) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <Page500 />;
  }
  const { id } = authUser;

  return <ChatView id={id} user={chatData} chatId={chatId} />;
}

export default ChatPage;
