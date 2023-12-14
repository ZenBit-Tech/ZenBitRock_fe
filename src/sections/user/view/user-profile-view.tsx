'use client';

import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { useSnackbar } from 'notistack';
import Iconify from 'components/iconify';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import { useSettingsContext } from 'components/settings';
import { LoadingScreen } from 'components/loading-screen';
import { RootState } from 'store';
import { useGetUserByIdMutation } from 'store/api/userApi';
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
  const [getUserById] = useGetUserByIdMutation();
  const settings = useSettingsContext();
  const { enqueueSnackbar } = useSnackbar();

  const authUser = useSelector((state: RootState) => state.authSlice.user);
  const { firstName, lastName, id } = authUser || {};
  const [currentTab] = useState<string>('profile');
  const [avatar, setAvatar] = useState<string>('');

  useEffect(() => {
    const fetchAvatar = async () => {
      if (id) {
        try {
          const { avatarUrl } = await getUserById({ id }).unwrap();
          
          setAvatar(avatarUrl);
        } catch (error) {
          enqueueSnackbar(t('avatarErrMsg'), { variant: 'error' });
        }
      }
    };

    fetchAvatar();
  }, [id, enqueueSnackbar, getUserById, t]);

  if (!authUser) {
    return <LoadingScreen />;
  }

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pb: 14 }}>
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
          avatarUrl={avatar}
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
