'use client';

import ReduxProvider from 'store/ReduxProvider';
import { SnackbarProvider } from 'components/snackbar';
import { useSettingsContext } from 'components/settings';
import { useTranslations } from 'next-intl';
import Container from '@mui/material/Container';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import { useMockedUser } from 'hooks/use-mocked-user';
import { paths } from 'routes/paths';
import Form from './form';
import { GoBackPageTitile } from 'components/custom';
import { Box } from '@mui/material';

export default function VerifyOldPasswordView(): JSX.Element {
  const settings = useSettingsContext();
  const t = useTranslations('ResetPasswordPage');
  const { user } = useMockedUser();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ paddingTop: '1rem' }}>
      <Box sx={{ ml: 1, mr: 1 }}>
        <GoBackPageTitile title={t('pageTitle')} />
      </Box>

      <SnackbarProvider>
        <ReduxProvider>
          <Form />
        </ReduxProvider>
      </SnackbarProvider>
    </Container>
  );
}
