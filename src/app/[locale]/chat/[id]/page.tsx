'use client';

import React from 'react';
import { randomValues } from 'constants/randomValues';

type Props = {
  params: { id: string };
};

function ChatPage({ params }: Props): JSX.Element {
  return (
    <div>
      <p>{randomValues.CHAT_PAGE}</p>
      <p>{params.id}</p>
    </div>
  );
}

export default ChatPage;
