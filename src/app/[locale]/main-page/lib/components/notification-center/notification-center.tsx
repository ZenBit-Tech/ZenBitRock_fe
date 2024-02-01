'use client';

import { Box, Card, Typography } from '@mui/material';
import { CustomLink, useOnboardingContext } from 'components/custom';
import Iconify from 'components/iconify';
import { LoadingScreen } from 'components/loading-screen';
import { AppRoute } from 'enums';
import { useSelector } from 'hooks';
import { RootState } from 'store';
import { useGetNewNotificationsCountQuery } from 'store/notification';

type Props = {
  t: Function;
};

const NotificationCenter = ({ t }: Props): JSX.Element => {
  const authUser = useSelector((state: RootState) => state.authSlice.user);

  const { data } = useGetNewNotificationsCountQuery({
    userId: authUser?.id ?? '',
  });

  const {
    state: { tourActive },
  } = useOnboardingContext();

  if (!authUser) {
    return <LoadingScreen />;
  }

  const isVisible = Boolean(data);
  const { receiveNotifications } = authUser;

  return (
    <>
      {(isVisible && receiveNotifications) || tourActive ? (
        <Card
          sx={{
            width: '100%',
            my: '2rem',
            p: '1rem',
          }}
        >
          <Typography variant="subtitle1">{t('notificationCenter')}</Typography>
          <Box
            sx={{
              marginTop: '5px',
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {data && (
              <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
                {`${t('youHave')} ${data} ${
                  data === 1 ? t('newNotification') : t('newNotifications')
                }`}
              </Typography>
            )}
            {!data && (
              <Typography variant="subtitle2" sx={{ fontWeight: 'normal' }}>
                {t('noNewNotifications')}
              </Typography>
            )}

            <CustomLink href={AppRoute.NOTIFICATIONS}>
              <Box
                component="span"
                display="flex"
                alignItems="center"
                className="onboarding-step-4"
              >
                {t('view')}
                <Iconify icon="mingcute:right-line" width="15px" height="15x" color="black" />
              </Box>
            </CustomLink>
          </Box>
        </Card>
      ) : null}
    </>
  );
};

export { NotificationCenter };
