'use client';

import { Box, IconButton, List, ListItem, Stack, Typography } from '@mui/material';
import DoneIcon from '@mui/icons-material/Done';
import DoneAllIcon from '@mui/icons-material/DoneAll';
import FavoritIcon from '@mui/icons-material/Favorite';
import FavoritBorderIcon from '@mui/icons-material/FavoriteBorder';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';
import SentimentSatisfiedAltIcon from '@mui/icons-material/SentimentSatisfiedAlt';
import {
  getIsRead,
  getIsReadByMembers,
  getLike,
  getLikes,
  getReaders,
} from 'components/custom/chat-message-item/utils';
import { colors } from 'constants/colors';
import { useSelector, useTranslations, useEffect, useState } from 'hooks';
import { formatDate } from 'services';
import { RootState } from 'store';
import { useMarkMessageAsReadMutation } from 'store/chat';
import { Message } from 'types';
import { UserChatResponse } from 'types/user-backend';
import Like from 'components/custom/mock-chat-message-item/like';
import ButtonClose from '../button-close/button-close';

type Props = {
  message: Message;
  usersData: UserChatResponse[] | undefined;
};

export function ChatMessageItem({ message, usersData }: Props): JSX.Element {
  const [isVisibleReaders, setIsVisibleReaders] = useState<boolean>(false);
  const [readers, setReaders] = useState<
    {
      memberId: string;
      memberName: string;
      isReadByMember: boolean;
    }[]
  >();
  const [allLikes, setAllLikes] = useState<
    {
      memberId: string;
      memberName: string;
      likeByMember: number;
    }[]
  >();

  const t = useTranslations('agents');
  const user = useSelector((state: RootState) => state.authSlice.user);
  const { id, content, createdAt, owner, isReadBy, chat, likes } = message;

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

  const like: number = getLike({
    likes,
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
    if (!isMe && !isRead && isMessageInViewport) {
      trigger({ messageId: id });
    }
  }, [isRead, isMessageInViewport, trigger, id, isMe]);

  function handleIsReadClick() {
    setIsVisibleReaders(!isVisibleReaders);
  }

  useEffect(() => {
    if (usersData && chat) {
      const members = chat.members.map((member) => member.id);

      setReaders(
        getReaders({
          isReadBy,
          usersData,
          members,
          userId: user?.id,
        })
      );

      setAllLikes(
        getLikes({
          likes,
          usersData,
          members,
          userId: user?.id,
        })
      );
    }
  }, [chat, isReadBy, likes, user?.id, usersData]);

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
      {!isMe && owner?.firstName?.toLowerCase() !== 'deleted' && (
        <Like icons={icons} messageId={id} like={like} />
      )}
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
          position: 'relative',
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
            <>
              <IconButton onClick={() => handleIsReadClick()} size="small">
                {getIsReadByMembers({ isReadBy, userId: user?.id }) ? (
                  <DoneAllIcon />
                ) : (
                  <DoneIcon />
                )}
              </IconButton>
              {isVisibleReaders && readers && (
                <Box
                  sx={{
                    position: 'absolute',
                    top: '0',
                    left: '0',
                    width: '100%',
                    height: '100%',
                    overflow: 'scroll',
                    '&::-webkit-scrollbar': {
                      display: 'none',
                    },
                    '&::-webkit-scrollbar-thumb': {
                      display: 'none',
                    },
                  }}
                >
                  <ButtonClose
                    width="10px"
                    height="10px"
                    top="5px"
                    right="5px"
                    handleClose={() => setIsVisibleReaders(!isVisibleReaders)}
                  />
                  <List
                    sx={{
                      width: '100%',
                      backgroundColor: colors.PRIMARY_LIGHT_COLOR,
                      border: `1px dashed ${colors.BUTTON_SECOND_COLOR}`,
                      borderRadius: '10px',
                    }}
                  >
                    {readers.map(({ memberName, memberId, isReadByMember }) => (
                      <ListItem
                        key={memberId}
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          width: '100%',
                          p: '5px',
                        }}
                      >
                        <Typography
                          sx={{
                            overflow: 'hidden',
                            textOverflow: 'ellipsis',
                            whiteSpace: 'nowrap',
                            fontSize: '10px',
                          }}
                        >
                          {memberName}
                        </Typography>
                        {isReadByMember ? (
                          <>
                            {allLikes &&
                              Number(
                                allLikes.filter(
                                  ({ memberId: memberLikeId }) => memberId === memberLikeId
                                )[0].likeByMember
                              ) !== 0 && (
                                <Box
                                  component={
                                    icons[
                                      Number(
                                        allLikes.filter(
                                          ({ memberId: memberLikeId }) => memberId === memberLikeId
                                        )[0].likeByMember
                                      )
                                    ]
                                  }
                                  sx={{
                                    color: colors.BUTTON_PRIMARY_COLOR,
                                    width: '1rem',
                                    height: '1rem',
                                    marginRight: '0.5rem',
                                    marginLeft: 'auto',
                                  }}
                                />
                              )}
                            <DoneAllIcon sx={{ height: '1rem' }} />
                          </>
                        ) : (
                          <DoneIcon sx={{ height: '1rem' }} />
                        )}
                      </ListItem>
                    ))}
                  </List>
                </Box>
              )}
            </>
          )}
        </Stack>
      </Stack>
    </Box>
  );
}
