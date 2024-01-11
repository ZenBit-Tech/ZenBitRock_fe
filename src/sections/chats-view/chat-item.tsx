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
import { IChatItem } from 'types/chat';
import { trimString } from 'services';
import { AppRoute } from 'enums';
import { formatDistanceToNowStrict } from 'date-fns';

type FollowerItemProps = {
  chat: IChatItem;
};

const MAX_WORDS: number = 6;

export default function ChatItem({ chat }: FollowerItemProps): JSX.Element {
  const router = useRouter();
  const { id, type, chatName, members, lastMessage, lastMessageDate, countOfUnreadMessages } = chat;

  const messageDate = formatDistanceToNowStrict(new Date(lastMessageDate));

  const avatarUrl = type === 'private' ? members[0].avatarUrl : '/';

  const handleClick = () => {
    router.push(`${AppRoute.CHATS_PAGE}/${id}`);
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
        <Avatar alt={chatName} src={avatarUrl} sx={{ width: 68, height: 68, mr: 2 }} />

        <Stack sx={{ flex: 5 }}>
          <Typography variant="subtitle1" sx={{ textAlign: 'left' }}>
            {chatName}
          </Typography>
          <ListItemText secondary={trimString(lastMessage, MAX_WORDS)} sx={{ textAlign: 'left' }} />
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
