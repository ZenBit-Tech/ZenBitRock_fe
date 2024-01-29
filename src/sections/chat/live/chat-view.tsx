'use client';

import { Button, Card, Container, Stack, Typography } from '@mui/material';
import useTheme from '@mui/system/useTheme';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { useCallback, useEffect, useRouter, useTranslations } from 'hooks';
import { Message } from 'types';
import { CustomLink } from 'components/custom';
import { useSendMessageMutation } from 'store/chat';
import { useGetAllUsersMutation } from 'store/api/userApi';
import ChatMessageList from './chat-message-list';
import ChatMessageInput from './chat-message-input';

type Props = {
  messages: Message[];
  chatId: string;
};

export default function ChatView({ messages, chatId }: Props): JSX.Element {
  const t = useTranslations('privateChat');
  const tChat = useTranslations('chat');
  const router = useRouter();
  const theme = useTheme();
  const [sendMessage] = useSendMessageMutation();

  const [getAllUsers, { data: usersData }] = useGetAllUsersMutation();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const addMessage = useCallback(
    (message: string) => {
      sendMessage({ chatId, content: message });
    },
    [sendMessage, chatId]
  );

  const renderHead = (
    <Stack
      direction="row"
      spacing={1}
      alignItems="center"
      flexShrink={0}
      sx={{ pr: 1, pl: 2.5, py: 1, minHeight: 72, overflow: 'scroll' }}
    >
      <Typography>{`${tChat('groupChat')} `}</Typography>
      <CustomLink color={theme.palette.primary.main} href="">
        <Typography>{` ( ${tChat('info')} )`}</Typography>
      </CustomLink>
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
      <ChatMessageList messages={messages} usersData={usersData} />

      <ChatMessageInput addMessage={addMessage} />
    </Stack>
  );

  return (
    <>
      <Stack direction="row" alignItems="center" sx={{ px: '0.3rem' }}>
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
      <Container sx={{ pb: '80px' }}>
        <Stack component={Card} direction="row" sx={{ height: '72vh' }}>
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
                borderTop: `solid 1px ${theme.palette.divider}`,
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
