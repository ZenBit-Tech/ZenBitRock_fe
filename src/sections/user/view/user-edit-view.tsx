'use client';

import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import Container from '@mui/material/Container';
import { Link, Stack } from '@mui/material';
import { useSettingsContext } from 'components/settings';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import { SnackbarProvider } from 'components/snackbar';
import { selectCurrentUser } from 'store/auth/authReducer';
import ReduxProvider from 'store/ReduxProvider';
import Iconify from 'components/iconify';
import { AppRoute } from 'enums';
import UserNewEditForm from '../user-new-edit-form';
import ProfileSettings from '../user-edit-settings';

export default function UserEditView(): JSX.Element {
  const t = useTranslations('editProfilePage');
  const settings = useSettingsContext();

  const authState = useSelector(selectCurrentUser);
  const { firstName, lastName } = authState;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ paddingTop: '1rem' }}>
      <CustomBreadcrumbs
        heading={t('pageTitle')}
        links={[{ name: `${firstName} ${lastName}` }]}
        sx={{
          mb: { xs: 3, md: 5 },
          mt: { xs: 3, md: 5 },
        }}
      />
      <Stack direction="row" sx={{ typography: 'body2', mb: '1rem', alignItems: 'center' }}>
        <Iconify icon="ion:chevron-back" width={24} sx={{ mr: 2 }} />
        <Link href={AppRoute.PROFILE_PAGE}>{t('backLink')}</Link>
      </Stack>

      <SnackbarProvider>
        <ReduxProvider>
          <UserNewEditForm />
        </ReduxProvider>
      </SnackbarProvider>
      <ProfileSettings />
    </Container>
  );
}
