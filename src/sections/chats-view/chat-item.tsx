import { useRouter } from 'next/navigation';
import {
  Card,
  Avatar,
  ListItemText,
  Stack,
  Typography,
  Badge,
  CardActionArea,
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import { trimString } from 'services';
import { AppRoute } from 'enums';
import { formatDistanceToNowStrict } from 'date-fns';
import { Chat } from 'types';
import { countUnreadMessages, findLatestMessage } from './helpers';

type FollowerItemProps = {
  chat: Chat;
};

const MAX_WORDS: number = 6;

export default function ChatItem({ chat }: FollowerItemProps): JSX.Element {
  const router = useRouter();

  const { id, isPrivate, title, messages } = chat;

  const countOfUnreadMessages = countUnreadMessages(messages);
  const lastMessage = findLatestMessage(messages);

  const { content, owner, createdAt } = lastMessage || {};

  const { avatarUrl } = owner || {};

  const messageDate = createdAt ? formatDistanceToNowStrict(new Date(createdAt)) : null;
  const avatar = isPrivate ? avatarUrl || '/' : '/';

  const handleClick = (): void => {
    router.push(`${AppRoute.CHAT_PAGE}/${id}`);
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
        <Avatar alt={title} src={avatar} sx={{ width: 68, height: 68, mr: 2 }} />

        <Stack sx={{ flex: 5 }}>
          <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
            {title}
          </Typography>
          {content && (
            <ListItemText secondary={trimString(content, MAX_WORDS)} sx={{ textAlign: 'left' }} />
          )}
        </Stack>

        <Stack alignItems="center" sx={{ gap: '10px', minWidth: '65px', alignItems: 'center' }}>
          <Badge badgeContent={countOfUnreadMessages} color="primary">
            <MailIcon />
          </Badge>

          <Typography variant="body2">{messageDate}</Typography>
        </Stack>
      </Card>
    </CardActionArea>
  );
}
