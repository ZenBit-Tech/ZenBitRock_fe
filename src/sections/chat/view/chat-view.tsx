'use client';

import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from '@mui/material';
import { useGetMessagesQuery } from 'store/chat/chat-api';
import { IChatByIdResponse } from 'types/chat';
import { Message } from 'types';
import ChatMessageList from '../chat-message-list';
import ChatMessageInput from '../chat-message-input';
import ChatHeaderDetail from '../chat-header-detail';

type Props = {
  id: string;
  user: IChatByIdResponse;
  chatId: string;
};

export default function ChatView({ id: selectedConversationId, user, chatId }: Props): JSX.Element {
  const t = useTranslations('privateChat');
  const router = useRouter();

  const { data: chatMessages, isLoading: isLoadingMessages } = useGetMessagesQuery({ chatId });

  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    if (chatMessages) {
      setMessages(chatMessages);
    }
  }, [chatMessages]);

  const otherMember = useMemo(
    () => user.members.find((member) => member.id !== selectedConversationId),
    [user.members, selectedConversationId]
  );

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72, overflow: 'scroll' }}
    >
      {otherMember ? <ChatHeaderDetail user={otherMember} /> : null}
    </Stack>
  );

  const renderMessages = (
    <Stack
      sx={{
        width: 1,
        height: 1,
        overflow: 'hidden',
      }}
    >
      <ChatMessageList messages={messages} user={user} me={selectedConversationId} />

      <ChatMessageInput chatId={chatId} />
    </Stack>
  );

  return (
    <Container sx={{ pb: '80px' }}>
      <Stack direction="row" alignItems="center">
        <Button sx={{ p: 0 }} onClick={() => router.back()}>
          <KeyboardArrowLeftIcon sx={{ fontSize: '48px', color: 'black' }} />
        </Button>

        <Typography
          variant="h3"
          sx={{
            my: { xs: 3, md: 5 },
          }}
        >
          {t('title')}
        </Typography>
      </Stack>

      <Stack component={Card} direction="row" sx={{ height: `calc(100vh - 250px)` }}>
        <Stack
          sx={{
            width: 1,
            height: 1,
            overflow: 'hidden',
          }}
        >
          {renderHead}

          <Stack
            direction="row"
            sx={{
              width: 1,
              height: 1,
              overflow: 'hidden',
              borderTop: (theme) => `solid 1px ${theme.palette.divider}`,
            }}
          >
            {renderMessages}
          </Stack>
        </Stack>
      </Stack>
    </Container>
  );
}
