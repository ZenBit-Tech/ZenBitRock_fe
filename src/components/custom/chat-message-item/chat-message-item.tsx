'use client';

import { Box, IconButton, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { colors } from 'constants/colors';
import { Message } from 'types';
import { useSelector, useTranslations } from 'hooks';
import { RootState } from 'store';
import { formatDate } from 'services';

type Props = {
  message: Message;
};

export function ChatMessageItem({ message }: Props): JSX.Element {
  const t = useTranslations('agents');
  const user = useSelector((state: RootState) => state.authSlice.user);

  const { content, createdAt, owner, isRead } = message;
  const isMe = owner.id === user?.id;
  const name = `${owner.firstName} ${owner.lastName}`;

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

          <IconButton size="small">{isRead ? <DoneAllIcon /> : <DoneIcon />}</IconButton>
        </Stack>
      </Stack>
    </Box>
  );
}
