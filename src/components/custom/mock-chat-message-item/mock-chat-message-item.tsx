'use client';

import { useMemo } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { colors } from 'constants/colors';
import { useTranslations, useEffect, useState } from 'hooks';
import { formatDate } from 'services';
import { useMarkMessageAsReadMutation } from 'store/chat';
import { Message } from 'types';

type Props = {
  message: Message;
  me: string;
};

export function MockChatMessageItem({ message, me }: Props): JSX.Element {
  const t = useTranslations('agents');
  const { id, content, createdAt, owner, isReadBy } = message;

  const isRead = isReadBy ? isReadBy.filter((user) => user.userId !== owner.id)[0].isRead : false;

  const isMe = useMemo((): boolean => owner?.id === me, [owner?.id, me]);

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
    if (!isMe && !isRead && isMessageInViewport) {
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
          pt: 1.5,
          pb: 1,
          px: 2,
          minWidth: 50,
          maxWidth: 250,
          borderRadius: 2,
          typography: 'body2',
          bgcolor: colors.CHAT_MESSAGE_BACKGROUND_COLOR,
          ...(isMe && {
            bgcolor: colors.CHAT_MY_MESSAGE_BACKGROUND_COLOR,
          }),
        }}
      >
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
          {isMe && <IconButton size="small">{isRead ? <DoneAllIcon /> : <DoneIcon />}</IconButton>}
        </Stack>
      </Stack>
    </Box>
  );
}
