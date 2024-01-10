'use client';

import { useMemo } from 'react';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { colors } from 'constants/colors';
import { Message } from 'types';
import { convertDateToHelsinkiTime } from 'utils/format-time';

type Props = {
  message: Message;
  me: string;
};

export function MockChatMessageItem({ message, me }: Props): JSX.Element {
  const { content, createdAt, owner, isRead } = message;

  const isMe = useMemo((): boolean => owner?.id === me, [owner?.id, me]);

  return (
    <Box
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
          {content}
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
            {convertDateToHelsinkiTime(createdAt)}
          </Typography>

          {isMe && <IconButton size="small">{isRead ? <DoneAllIcon /> : <DoneIcon />}</IconButton>}
        </Stack>
      </Stack>
    </Box>
  );
}
