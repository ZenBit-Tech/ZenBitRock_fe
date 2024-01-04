'use client';

import { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Button } from '@mui/material';
import { IChatMessage } from 'types/chat';
import { GetUserResponse } from 'types/user-data';
import ChatMessageList from '../chat-message-list';
import ChatMessageInput from '../chat-message-input';
import ChatHeaderDetail from '../chat-header-detail';
import generateMockMessages from '../utils/generateMockMsgs';

type Props = {
  id: string;
  user: GetUserResponse['data'];
};

export default function ChatView({ id: selectedConversationId, user }: Props): JSX.Element {
  const t = useTranslations('privateChat');
  const router = useRouter();

  const [messages, setMessages] = useState<IChatMessage[]>([]);

  useEffect(() => {
    setMessages(generateMockMessages());
  }, []);

  const addMessage = useCallback((newMessage: IChatMessage): void => {
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  }, []);

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72, overflow: 'scroll' }}
    >
      {selectedConversationId ? <ChatHeaderDetail user={user} /> : null}
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
      <ChatMessageList messages={messages} user={user} />

      <ChatMessageInput addMessage={addMessage} selectedConversationId={selectedConversationId} />
    </Stack>
  );

  return (
    <>
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
    </>
  );
}
