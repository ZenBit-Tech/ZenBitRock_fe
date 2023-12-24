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
import { formatDate, trimString } from 'services';

type FollowerItemProps = {
  chat: IChatItem;
};

const MAX_WORDS: number = 6;

export default function ChatItem({ chat }: FollowerItemProps): JSX.Element {
  const { type, chatName, members, lastMessage, lastMessageDate, countOfUnreadMessages } = chat;

  const messageDate = formatDate(lastMessageDate);

  const avatarUrl = type === 'private' ? members[0].avatarUrl : '/';

  const handleClick = () => {};

  return (
    <CardActionArea sx={{ p: 0 }} onClick={handleClick}>
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
