'use client';

import { Box, IconButton, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { colors } from 'constants/colors';
import { Message } from 'types';
import { useSelector, useTranslations, useEffect, useState } from 'hooks';
import { RootState } from 'store';
import { formatDate } from 'services';
import { useMarkMessageAsReadMutation } from 'store/chat';

type Props = {
  message: Message;
};

export function ChatMessageItem({ message }: Props): JSX.Element {
  const t = useTranslations('agents');
  const user = useSelector((state: RootState) => state.authSlice.user);

  const { id, content, createdAt, owner, isRead } = message;
  const isMe = owner.id === user?.id;
  const name = `${owner.firstName} ${owner.lastName}`;

  const [messageRef, setMessageRef] = useState<HTMLDivElement | null>(null);
  const [isMessageInViewport, setIsMessageInViewport] = useState(false);
  const [trigger] = useMarkMessageAsReadMutation();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsMessageInViewport(true);
        }
      },
      {
        root: null,
        rootMargin: '0px',
        threshold: 0.5,
      }
    );

    if (messageRef) {
      observer.observe(messageRef);
    }

    return () => {
      if (messageRef) {
        observer.unobserve(messageRef);
      }
    };
  }, [messageRef]);

  useEffect(() => {
    if (!isRead && isMessageInViewport && !isMe) {
      trigger({ messageId: id });
    }
  }, [isRead, isMessageInViewport, trigger, id, isMe]);

  return (
    <Box
      ref={(node) => setMessageRef(node as HTMLDivElement)}
      sx={{
        display: 'flex',
        ...(isMe && { justifyContent: 'right' }),
        '&:not(:last-child)': {
          mb: 2,
        },
      }}
    >
      <Stack
        sx={{
          p: 1.5,
          minWidth: 150,
          maxWidth: 250,
          borderRadius: 2,
          typography: 'body2',
          bgcolor: colors.CHAT_MESSAGE_BACKGROUND_COLOR,
          ...(isMe && {
            bgcolor: colors.CHAT_MY_MESSAGE_BACKGROUND_COLOR,
          }),
        }}
      >
        <Typography
          noWrap
          variant="caption"
          sx={{
            mb: 1,
            color: 'text.disabled',
          }}
        >
          {!isMe && `${name} ${owner.isDeleted ? t('deleted') : ''}`}
        </Typography>

        <Typography variant="body2" sx={{ wordWrap: 'break-word' }}>
          {`${content} ${owner.isDeleted ? t('messageDeleted') : ''}`}
        </Typography>

        <Stack
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Typography
            noWrap
            variant="caption"
            sx={{
              color: 'text.disabled',
              ...(!isMe && {
                py: 1.1,
              }),
            }}
          >
            {formatDate(createdAt)}
          </Typography>

          <IconButton size="small">{!isRead ? <DoneAllIcon /> : <DoneIcon />}</IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
