'use client';

import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Iconify from 'components/iconify';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import { useSettingsContext } from 'components/settings';
import { LoadingScreen } from 'components/loading-screen';
import { useGetUserByIdMutation } from 'store/api/getUserApi';
import { selectCurrentUser } from 'store/auth/authReducer';
import { IUserUpdateProfile } from 'types/user';
import { _userAbout } from '_mock';
import ProfileHome from '../profile-home';
import ProfileCover from '../profile-cover';

const TABS = [
  {
    value: 'profile',
    label: 'Profile',
    icon: <Iconify icon="solar:user-id-bold" width={24} />,
  },
];

export default function UserProfileView(): JSX.Element {
  const t = useTranslations('profilePage');
  const settings = useSettingsContext();
  const [getUserById] = useGetUserByIdMutation();

  const authState = useSelector(selectCurrentUser);
  const userId = authState.id;
  const { firstName, lastName } = authState;

  const [data, setData] = useState<IUserUpdateProfile | null>(null);
  const [currentTab] = useState<string>('profile');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await getUserById({ id: userId });

        if ('data' in res) {
          setData(res.data);
        }
      } catch (error) {
        console.error('Error fetching user data', error);
      }
    };

    if (userId) {
      fetchUserData();
    }
  }, [getUserById, userId]);

  if (!data) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('profileTitle')}
        links={[{ name: `${firstName} ${lastName}` }]}
        sx={{
          mb: { xs: 3, md: 5 },
          mt: { xs: 3, md: 5 },
        }}
      />

      <Card
        sx={{
          mb: 3,
          height: { xs: 180, md: 220 },
        }}
      >
        <ProfileCover
          name={firstName && lastName ? `${firstName} ${lastName}` : t('loading')}
          coverUrl={_userAbout.coverUrl}
        />

        <Tabs
          value={currentTab}
          sx={{
            width: 1,
            bottom: 0,
            zIndex: 9,
            position: 'absolute',
            bgcolor: 'background.paper',
            [`& .${tabsClasses.flexContainer}`]: {
              pr: { md: 3 },
              pl: { xs: 3, md: 3 },
              justifyContent: {
                sm: 'center',
                md: 'flex-end',
              },
            },
          }}
        />
      </Card>

      {currentTab === TABS[0].value && <ProfileHome />}
    </Container>
  );
}
