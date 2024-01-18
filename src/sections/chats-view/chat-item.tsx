import { Card, Avatar, Stack, Typography, Badge, CardActionArea } from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { formatDate, trimString } from 'services';
import { AppRoute } from 'enums';
import { Chat } from 'types';
import { useSelector, useRouter } from 'hooks';
import { selectCurrentUser } from 'store/auth/authReducer';
import { colors } from 'constants/colors';
import { countUnreadMessages, findLatestMessage, getOpponent } from './helpers';

type FollowerItemProps = {
  chat: Chat;
};

const MAX_CHARACTERS_TITLE: number = 15;
const MAX_WORDS_TITLE: number = 2;
const MAX_WORDS_MESSAGE: number = 6;
const MAX_CHARACTERS_MESSAGE: number = 20;

export default function ChatItem({ chat }: FollowerItemProps): JSX.Element {
  const router = useRouter();
  const authState = useSelector(selectCurrentUser);
  const userId = authState.user ? authState.user.id : '';

  const { id, isPrivate, title, messages, members } = chat;

  const countOfUnreadMessages = countUnreadMessages(messages);
  const lastMessage = findLatestMessage(messages);

  const { content, createdAt } = lastMessage || {};
  const messageDate = createdAt ? formatDate(createdAt) : null;

  const opponent = getOpponent({ isPrivate, userId, members });
  const avatar = opponent?.avatarUrl || '/';
  const chatTitle = opponent ? `${opponent.firstName} ${opponent.lastName}` : title;

  const handleClick = (): void => {
    router.push(`${AppRoute.CHAT_LIVE_PAGE}/${id}`);
  };

  return (
    <CardActionArea
      sx={{
        p: 0,
        '&:not(:last-child)': {
          mb: '5px',
        },
      }}
      onClick={handleClick}
    >
      <Card
        sx={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          p: (theme) => theme.spacing(2, 1, 2, 1),
        }}
      >
        <Avatar alt={chatTitle} src={avatar} sx={{ width: 68, height: 68, mr: 2 }} />

        <Stack sx={{ flex: 5 }}>
          <Typography variant="subtitle1" sx={{ textAlign: 'left', mb: '8px' }}>
            {trimString(chatTitle, MAX_WORDS_TITLE, MAX_CHARACTERS_TITLE)}
          </Typography>

          <Typography
            variant="body2"
            sx={{
              textAlign: 'left',
              height: '20px',
              wordWrap: 'break-word',
              color: colors.TEXT_GREY_COLOR,
            }}
          >
            {trimString(content || '', MAX_WORDS_MESSAGE, MAX_CHARACTERS_MESSAGE)}
          </Typography>
        </Stack>

        <Stack alignItems="center" sx={{ gap: '10px', minWidth: '65px', alignItems: 'center' }}>
          <Badge badgeContent={countOfUnreadMessages} color="primary">
            <MailIcon />
          </Badge>

          <Typography variant="body2" height="13px">
            {messageDate}
          </Typography>
        </Stack>
      </Card>
    </CardActionArea>
  );
}
