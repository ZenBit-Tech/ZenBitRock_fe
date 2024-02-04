'use client';

import { useMemo } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FavoritIcon from '@mui/icons-material/Favorite';
import FavoritBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import Like from 'components/custom/mock-chat-message-item/like';
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
  const { id, content, createdAt, owner, isReadBy, likes } = message;

  const like = Number(likes?.filter((emoji) => emoji.userId !== owner.id)[0]?.like || 0);

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

  const icons = [
    FavoritBorderIcon,
    FavoritIcon,
    ThumbUpIcon,
    ThumbDownIcon,
    SentimentSatisfiedAltIcon,
    SentimentVeryDissatisfiedIcon,
  ];

  return (
    <Box
      ref={(node) => setMessageRef(node as HTMLDivElement)}
      sx={{
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row-reverse',
        justifyContent: 'left',
        ...(isMe && { justifyContent: 'right', flexDirection: 'row' }),
        '&:not(:last-child)': {
          mb: 2,
        },
        position: 'relative',
      }}
    >
      {!isMe && <Like icons={icons} messageId={id} like={like} />}
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
          {isMe && (
            <IconButton size="small" sx={{ position: 'relative' }}>
              {isRead ? (
                <>
                  <DoneAllIcon sx={{ zIndex: 1 }} />
                  {isMe && like !== 0 && (
                    <Box
                      component={icons[like]}
                      sx={{
                        color: colors.BUTTON_PRIMARY_COLOR,
                        width: '1.25rem',
                        minWidth: '1.25rem',

                        height: '1.25rem',
                        backgroundColor: colors.BUTTON_PRIMARY_COLOR_ALPHA,
                        borderRadius: '50%',
                        padding: '0.125rem',
                        position: 'absolute',
                        top: '50%',
                        right: '-0.75rem',
                        transform: 'translateY(-50%)',
                        zIndex: 0,
                      }}
                    />
                  )}
                </>
              ) : (
                <DoneIcon />
              )}
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
