import { Box, Stack } from '@mui/material';
import { GoBackPageTitile } from 'components/custom';
import { useCallback, useTranslations } from 'hooks';
import { MobileLayout } from 'layouts';
import { useDeleteNotificationToUserMutation, useGetNotificationsQuery } from 'store/notification';
import { Page500 } from 'sections/error';
import { UserProfileResponse } from 'types';
import { LoadingScreen } from 'components/loading-screen';
import { NotificationCard } from './components';

type Props = {
  user: UserProfileResponse;
};

const UserNotificationsView = ({ user }: Props) => {
  const t = useTranslations('notifications');

  const { data, isLoading, isError } = useGetNotificationsQuery({
    userId: user.id,
  });
  const [deleteNotificationToUser] = useDeleteNotificationToUserMutation();

  const handleDelete = useCallback(
    (notificationId: string, userId: string) => {
      deleteNotificationToUser({ notificationId, userId });
    },
    [deleteNotificationToUser]
  );

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isError) {
    return <Page500 />;
  }

  return (
    <MobileLayout>
      <Box sx={{ mx: 2, mb: 1 }}>
        <Stack spacing={2}>
          <GoBackPageTitile title={t('title')} ml="-20px" />
          <Stack spacing={1}>
            {data &&
              data.map((notification) => (
                <NotificationCard
                  notification={notification}
                  key={notification.id}
                  userId={user.id}
                  handleDelete={handleDelete}
                />
              ))}
          </Stack>
        </Stack>
      </Box>
    </MobileLayout>
  );
};

export { UserNotificationsView };
