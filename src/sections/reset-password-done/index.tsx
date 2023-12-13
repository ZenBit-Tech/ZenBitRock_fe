'use client';

import { Box, Button, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';

import CustomBreadcrumbs from 'components/custom-breadcrumbs';
import { useSettingsContext } from 'components/settings';
import { AppRoute } from 'enums';
import { useMockedUser } from 'hooks/use-mocked-user';
import { paths } from 'routes/paths';

export default function ResetPasswordView(): JSX.Element {
  const t = useTranslations('ResetPasswordPage');
  const settings = useSettingsContext();
  const { user } = useMockedUser();

  const router = useRouter();

  const handleClick = () => {
    router.push(AppRoute.PROFILE_PAGE);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ paddingTop: '1rem' }}>
      <Stack spacing={2} direction="row" alignItems="center">
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
      </Stack>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '0.9rem',
          height: 'calc(100vh-180px)',
          justifyContent: 'center',
          maxWidth: '800px',
          margin: '0 auto',
        }}
      >
        <Stack spacing={2}>
          <Typography align="center" variant="h5" fontSize={16}>
            {t('text')}
          </Typography>

          <Button
            fullWidth
            size="large"
            color="primary"
            variant="contained"
            style={{ marginBottom: '70px' }}
            onClick={handleClick}
          >
            {t('buttonToProfile')}
          </Button>
        </Stack>
      </Box>
    </Container>
  );
}
