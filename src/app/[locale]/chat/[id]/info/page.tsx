'use client';

import React from 'react';
import { ChatInfo } from 'sections/chat/components/chat-info/chat-info';

type Props = {
  id: string;
  userId: string;
};

function ChatInfoPage({ id, userId }: Props): JSX.Element {
  return <ChatInfo id={id} userId={userId} />;
}

export default ChatInfoPage;
