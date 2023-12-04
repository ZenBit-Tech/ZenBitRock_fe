'use client';


import ReduxProvider from 'store/ReduxProvider';
import { useMockedUser } from 'hooks/use-mocked-user';
import { SnackbarProvider } from 'components/snackbar';
import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Form from './form';
import Container from '@mui/material/Container';
import { useSettingsContext } from 'components/settings';
import { useTranslations } from 'next-intl';
import { paths } from 'routes/paths';
import { Button, Stack } from '@mui/material';
import router from 'next/router';
;

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
