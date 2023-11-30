'use client';

import { useState, useCallback } from 'react';
import { useTranslations } from 'next-intl';
import Card from '@mui/material/Card';
import Container from '@mui/material/Container';
import Tabs, { tabsClasses } from '@mui/material/Tabs';
import { useMockedUser } from 'hooks/use-mocked-user';
import { _userAbout } from '_mock';
import Iconify from 'components/iconify';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import { useSettingsContext } from 'components/settings';
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
  const { user } = useMockedUser();

  const [currentTab, setCurrentTab] = useState<string>('profile');

  const handleChangeTab = useCallback((event: React.SyntheticEvent, newValue: string) => {
    setCurrentTab(newValue);
  }, []);

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <CustomBreadcrumbs
        heading={t('profileTitle')}
        links={[{ name: user?.displayName }]}
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
        <ProfileCover name={user?.displayName} coverUrl={_userAbout.coverUrl} />

        <Tabs
          value={currentTab}
          onChange={handleChangeTab}
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

      {currentTab === TABS[0].value && <ProfileHome info={_userAbout} />}
    </Container>
  );
}
