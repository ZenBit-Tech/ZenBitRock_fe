'use client';

import { format } from 'date-fns';
import { Box, IconButton, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { colors } from 'constants/colors';
import { datesFormats } from 'constants/dates-formats';
import { GetUserResponse } from 'types/user-data';

type Props = {
  message: {
    id: string;
    body: string;
    createdAt: string;
    isMe: boolean;
    sender: {
      name: string;
    } | null;
    isRead: boolean;
  };
  participant: GetUserResponse['data'];
};

export function MockChatMessageItem({ message, participant }: Props): JSX.Element {
  const { body, createdAt, isMe, isRead } = message;
  const name = `${participant.firstName} ${participant.lastName}`;

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
          // p: 1.5,

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
        <Typography variant="body2">{body}</Typography>

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
            {format(new Date(createdAt), datesFormats.timeFormat)}
          </Typography>

          {isMe && <IconButton size="small">{isRead ? <DoneAllIcon /> : <DoneIcon />}</IconButton>}
        </Stack>
      </Stack>
    </Box>
  );
}
