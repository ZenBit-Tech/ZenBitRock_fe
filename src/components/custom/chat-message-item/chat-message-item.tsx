'use client';

import { Box, IconButton, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { getIsRead } from 'components/custom/content-view/utils/getIsRead';
import { colors } from 'constants/colors';
import { useSelector, useTranslations, useEffect, useState } from 'hooks';
import { formatDate } from 'services';
import { RootState } from 'store';
import { useMarkMessageAsReadMutation } from 'store/chat';
import { Message } from 'types';
import { useGetAllUsersMutation } from 'store/api/userApi';

type Props = {
  message: Message;
};

export function ChatMessageItem({ message }: Props): JSX.Element {
  const [isVisibleReaders, setIsVisibleReaders] = useState<boolean>(false);
  const t = useTranslations('agents');
  const user = useSelector((state: RootState) => state.authSlice.user);
  const { id, content, createdAt, owner, isReadBy, chat } = message;

  const [getAllUsers, { data: usersData, isLoading: isloadingWhenGetUsers }] =
    useGetAllUsersMutation();
  // const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    getAllUsers();
  }, [getAllUsers]);

  const isMe = owner.id === user?.id;
  const name = `${owner.firstName} ${owner.lastName}`;

  const isRead: boolean = getIsRead({
    isReadBy,
    isMe,
    userId: user?.id,
    messageId: id,
    ownerId: owner.id,
    chat,
  });

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
    if (!isRead && isMessageInViewport) {
      trigger({ messageId: id });
    }
  }, [isRead, isMessageInViewport, trigger, id]);

  function handleIsReadClick() {
    setIsVisibleReaders(!isVisibleReaders);
  }

  return (
    <Box
      ref={(node) => setMessageRef(node as HTMLDivElement)}
      sx={{
        display: 'flex',
        ...(isMe && { justifyContent: 'right' }),
        '&:not(:last-child)': {
          mb: 2,
        },
        position: 'relative',
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
          {isMe && (
            <IconButton onClick={() => handleIsReadClick()} size="small">
              {!isRead ? <DoneAllIcon /> : <DoneIcon />}
              {isVisibleReaders && (
                <Box
                  sx={{
                    position: 'relative',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%)',
                  }}
                >
                  hello
                </Box>
              )}
            </IconButton>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
