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
import { ChatInfoResponse } from 'types/chats';
import { Message } from 'types';
import { AppRoute } from 'enums';
import { useGetAllUsersMutation } from 'store/api/userApi';
import ChatMessageList from '../chat-message-list';
import ChatMessageInput from '../chat-message-input';
import ChatHeaderDetail from '../chat-header-detail';
import ChatGroupHeader from '../chat-group-header';

type Props = {
  currentUserId: string;
  chatData: ChatInfoResponse;
  messages?: Message[];
};

export default function ChatView({ currentUserId, chatData, messages }: Props): JSX.Element {
  const t = useTranslations('privateChat');

  const [getAllUsers, { data: usersData }] = useGetAllUsersMutation();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const router = useRouter();

  const [chatMessages, setChatMessages] = useState<Message[]>([]);

  const isPrivate = Boolean(chatData.isPrivate);

  useEffect(() => {
    if (messages) {
      setChatMessages(messages);
    }
  }, [messages]);

  const otherMember = useMemo(
    () => chatData.members.find((member) => member.id !== currentUserId),
    [chatData.members, currentUserId]
  );

  const isDeleted = useMemo(() => otherMember?.isDeleted || false, [otherMember]);

  const renderHead = (
    <Stack
      direction="row"
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72, overflow: 'scroll' }}
    >
      {isPrivate && otherMember ? <ChatHeaderDetail user={otherMember} /> : null}
      {!isPrivate && <ChatGroupHeader chatId={chatData.id} chatTitle={chatData.title} />}
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
      <ChatMessageList
        messages={chatMessages}
        me={currentUserId}
        isPrivate={isPrivate}
        usersData={usersData}
      />

      {!isDeleted && <ChatMessageInput chatId={chatData.id} disabled={isDeleted} />}
    </Stack>
  );

  return (
    <Container sx={{ pb: '80px' }}>
      <Stack direction="row" alignItems="center">
        <Button
          sx={{ p: 0 }}
          onClick={() => (isPrivate ? router.back() : router.push(AppRoute.CHATS_PAGE))}
        >
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
