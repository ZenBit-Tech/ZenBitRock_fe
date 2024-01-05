'use client';

import React from 'react';
import { Page500 } from 'sections/error';
import { LoadingScreen } from 'components/loading-screen';
import { useGetMessagesQuery } from 'store/chat';
import { ChatView } from 'sections/chat/live';

type Props = {
  params: { id: string };
};

const ChatPage = ({ params }: Props): JSX.Element => {
  const { data: messages, isLoading, isError } = useGetMessagesQuery({ chatId: params.id });

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <Page500 />;
  }

  console.log(messages);

  return <> {messages && <ChatView messages={messages} chatId={params.id} />}</>;
};

export default ChatPage;
