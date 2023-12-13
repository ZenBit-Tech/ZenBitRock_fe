'use client';

import Container from '@mui/material/Container';
import { useTranslations } from 'next-intl';

import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import { useSettingsContext } from 'components/settings';
import { SnackbarProvider } from 'components/snackbar';
import { useMockedUser } from 'hooks/use-mocked-user';
import { paths } from 'routes/paths';
import ReduxProvider from 'store/ReduxProvider';

import Form from './form';

export default function ResetPasswordView(): JSX.Element {
  const settings = useSettingsContext();
  const t = useTranslations('ResetPasswordPage');
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
      />

      <SnackbarProvider>
        <ReduxProvider>
          <Form />
        </ReduxProvider>
      </SnackbarProvider>
    </Container>
  );
}
