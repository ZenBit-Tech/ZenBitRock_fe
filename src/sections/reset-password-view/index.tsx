'use client';

import { Box } from '@mui/material';
import Container from '@mui/material/Container';
import ReduxProvider from 'store/ReduxProvider';
import { SnackbarProvider } from 'components/snackbar';
import { useSettingsContext } from 'components/settings';
import { useTranslations } from 'next-intl';
import { GoBackPageTitile } from 'components/custom';
import Form from './form';

export default function ResetPasswordView(): JSX.Element {
  const settings = useSettingsContext();
  const t = useTranslations('ResetPasswordPage');

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
