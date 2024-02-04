'use client';

import React from 'react';
import { useSelector } from 'react-redux';
import { LoadingScreen } from 'components/loading-screen';
import { AppRoute } from 'enums';
import { useRouter, useEffect } from 'hooks';
import { ChatView } from 'sections/chat/view';
import { NotChatMemberView, Page500 } from 'sections/error';
import { useGetChatByIdQuery, useGetMessagesQuery, useRedirectToChatsQuery } from 'store/chat';
import { RootState } from 'store';

type Props = {
  params: { id: string };
};

function ChatPage({ params }: Props): JSX.Element {
  const { id: chatId } = params;
  const { data: chatData, isFetching, isError } = useGetChatByIdQuery(chatId);
  const authUser = useSelector((state: RootState) => state.authSlice.user);

  const { data: chatMessages, isLoading: isLoadingMessages } = useGetMessagesQuery({
    chatId,
  });

  const { data: redirectToChats = false } = useRedirectToChatsQuery();
  const router = useRouter();

  useEffect(() => {
    if (redirectToChats && redirectToChats === true) {
      router.push(AppRoute.CHATS_PAGE);
    }
  }, [redirectToChats, router]);

  if (isFetching || !chatData || !authUser || isLoadingMessages) {
    return <LoadingScreen sx={{ mt: 'calc(100vh / 2 - 65px)' }} />;
  }

  if (isError) {
    return <Page500 />;
  }

  const { id } = authUser;
  const isMember = Boolean(chatData.members.find((member) => member.id === id));

  if (!isMember) {
    return <NotChatMemberView />;
  }

  return <ChatView currentUserId={id} chatData={chatData} messages={chatMessages} />;
}

export default ChatPage;
