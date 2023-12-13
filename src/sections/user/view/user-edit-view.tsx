'use client';

import { Link, Stack } from '@mui/material';
import Container from '@mui/material/Container';
import { useTranslations } from 'next-intl';
import { useSelector } from 'react-redux';

import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import Iconify from 'components/iconify';
import { LoadingScreen } from 'components/loading-screen';
import { useSettingsContext } from 'components/settings';
import { SnackbarProvider } from 'components/snackbar';
import { AppRoute } from 'enums';
import { RootState } from 'store';
import ReduxProvider from 'store/ReduxProvider';

import UserNewEditForm from '../user-new-edit-form';

export default function UserEditView(): JSX.Element {
  const t = useTranslations('editProfilePage');
  const settings = useSettingsContext();

  const authUser = useSelector((state: RootState) => state.authSlice.user);

  if (!authUser) {
    return <LoadingScreen />;
  }
  const { firstName, lastName } = authUser;

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pt: '1rem', pb: 14 }}>
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
          <UserNewEditForm user={authUser} />
        </ReduxProvider>
      </SnackbarProvider>
    </Container>
  );
}
