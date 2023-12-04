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

export default function VerifyOldPasswordView(): JSX.Element {
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
      sx={{
        
        mb: { xs: 3, md: 5 },
      }}
    />

      <SnackbarProvider>
        <ReduxProvider>
          <Form />
        </ReduxProvider>
      </SnackbarProvider>
    
      </Container>
  );
}
