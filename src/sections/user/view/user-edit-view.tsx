'use client';

import { useTranslations } from 'next-intl';
import Container from '@mui/material/Container';
import { useMockedUser } from 'hooks/use-mocked-user';
import { _userList } from '_mock';
import { paths } from 'routes/paths';
import { useSettingsContext } from 'components/settings';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import { SnackbarProvider } from 'components/snackbar';
import UserNewEditForm from '../user-new-edit-form';
import ProfileSettings from '../user-edit-settings';

export default function UserEditView() {
  const t = useTranslations('editProfilePage');
  const settings = useSettingsContext();
  const { user } = useMockedUser();

  
  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ paddingTop: '1rem' }}>
      <CustomBreadcrumbs
        heading={t('pageTitle')}
        links={[
          {
            name: `${t('backLink')}`,
            href: paths.user.profile,
          },
          { name: user?.displayName },
          { name: user?.email },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />

      <SnackbarProvider>
        <UserNewEditForm currentUser={user} />
      </SnackbarProvider>
      <ProfileSettings />
    </Container>
  );
}
