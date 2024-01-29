import { Box, Stack } from '@mui/material';
import { PageTitle } from 'components/custom';
import { useTranslations } from 'hooks';
import { MobileLayout } from 'layouts';
import { useGetNotificationsQuery } from 'store/notification';

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

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <MobileLayout>
      <Box sx={{ mx: 2, mb: 1 }}>
        <Stack spacing={2}>
          <PageTitle title={t('title')} />
          <Stack spacing={1}>
            {data &&
              data.map((notification) => (
                <NotificationCard
                  notification={notification}
                  key={notification.id}
                  userId={user.id}
                />
              ))}
          </Stack>
        </Stack>
      </Box>
    </MobileLayout>
  );
};

export { UserNotificationsView };
