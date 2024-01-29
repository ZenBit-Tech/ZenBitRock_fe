import { Card, IconButton, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteNotificationToUserMutation } from 'store/notification';
import { AppNotification } from 'types';
import { useCallback } from 'hooks';

type Props = {
  notification: AppNotification;
  userId: string;
};

const NotificationCard = ({ notification, userId }: Props) => {
  const { text, id } = notification;
  const [deleteNotificationToUser] = useDeleteNotificationToUserMutation();

  const handleDelete = useCallback(() => {
    deleteNotificationToUser({ notificationId: id, userId });
  }, [deleteNotificationToUser, id, userId]);

  return (
    <Card
      sx={{ display: 'flex', p: 1, pl: 2, justifyContent: 'space-between', alignItems: 'center' }}
    >
      <Typography variant="body2">{text}</Typography>
      <IconButton onClick={handleDelete}>
        <DeleteIcon />
      </IconButton>
    </Card>
  );
};

export { NotificationCard };
