import { Box, Card, IconButton, Stack, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import { AppNotification } from 'types';
import { useCallback } from 'hooks';
import { formatDate } from 'services';

type Props = {
  notification: AppNotification;
  userId: string;
  handleDelete: (notificationId: string, userId: string) => void;
};

const NotificationCard = ({ notification, userId, handleDelete }: Props) => {
  const { text, id, createdAt } = notification;
  const handleNotificationDelete = useCallback(() => {
    handleDelete(id, userId);
  }, [id, userId, handleDelete]);

  return (
    <Card sx={{ minHeight: '92px' }}>
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
          <GroupAddIcon color="primary" />
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
          <Typography variant="body2" width="100%">
            {text}
          </Typography>
          <IconButton onClick={handleNotificationDelete}>
            <DeleteIcon />
          </IconButton>
        </Box>
      </Stack>
    </Card>
  );
};

export { NotificationCard };
