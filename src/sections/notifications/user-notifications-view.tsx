import { Box } from '@mui/material';
import { PageTitle } from 'components/custom';
import { useTranslations } from 'hooks';
import { MobileLayout } from 'layouts';
import { useGetNotificationsQuery } from 'store/notification';

import { UserProfileResponse } from 'types';

type Props = {
  user: UserProfileResponse;
};

const UserNotificationsView = ({ user }: Props) => {
  const t = useTranslations('notifications');

  const { data, isLoading, isError } = useGetNotificationsQuery({
    userId: user.id,
  });

  return (
    <MobileLayout>
      <Box sx={{ mx: 1, mb: 1 }}>
        <PageTitle title={t('title')} />
      </Box>
    </MobileLayout>
  );
};

export { UserNotificationsView };
