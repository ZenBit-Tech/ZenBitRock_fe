import { Box, Card, IconButton, ListItemButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { AppNotification } from 'types';
import { useCallback } from 'hooks';
import { formatDate } from 'services';
import { getNotificationIcon } from '../helpers/getNotificationIcon.helper';

type Props = {
  notification: AppNotification;
  userId: string;
  handleDelete: (notificationId: string, userId: string) => void;
  handleMarkAsRead: (notificationId: string, userId: string) => void;
};

const NotificationCard = ({ notification, userId, handleDelete, handleMarkAsRead }: Props) => {
  const { text, id, createdAt, recipients } = notification;
  const handleNotificationDelete = useCallback(() => {
    handleDelete(id, userId);
  }, [id, userId, handleDelete]);

  const handleNotificationMarkAsRead = useCallback(() => {
    handleMarkAsRead(id, userId);
  }, [id, userId, handleMarkAsRead]);

  const isRead = Boolean(recipients.find((recipient) => recipient.user.id === userId)?.isRead);

  return (
    <Card sx={{ minHeight: '92px' }}>
      <ListItemButton sx={{ p: 0 }} onClick={handleNotificationMarkAsRead}>
        <Stack sx={{ width: '100%' }}>
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              px: 2,
              pt: 1,
            }}
          >
            {getNotificationIcon(notification.type)}
            <Typography
              noWrap
              variant="caption"
              sx={{
                color: 'text.disabled',
              }}
            >
              {formatDate(createdAt)}
            </Typography>
          </Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              p: 1,
              pl: 2,
            }}
          >
            <Typography variant="body2" width="100%" fontWeight={isRead ? 400 : 700}>
              {text}
            </Typography>
            <IconButton onClick={handleNotificationDelete}>
              <DeleteIcon />
            </IconButton>
          </Box>
        </Stack>
      </ListItemButton>
    </Card>
  );
};

export { NotificationCard };
