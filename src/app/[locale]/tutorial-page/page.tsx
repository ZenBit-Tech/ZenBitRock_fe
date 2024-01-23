'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, Stack, Typography } from '@mui/material';
import { MotivationIllustration } from 'assets/illustrations';
import { useSettingsContext } from 'components/settings';
import { AppRoute } from 'enums';
import { useOnboardingContext } from 'components/custom';

export default function TutorialPage(): JSX.Element {
  const t = useTranslations('tutorialPage');
  const settings = useSettingsContext();
  const router = useRouter();

  const { setState } = useOnboardingContext();

  const handleStartGuide = (): void => {
    setState({ tourActive: true });
    router.push(AppRoute.MAIN_PAGE);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
      }}
    >
      <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pb: 14, marginTop: '20px' }}>
        <Box sx={{ mb: 2 }}>
          <Typography variant="h4" textAlign="center" fontWeight="fontWeightRegular">
            {t('welcomeTxt')}
          </Typography>
          <Typography variant="h4" textAlign="center" fontWeight="fontWeightRegular">
            {t('welcomeSubTxt')}
          </Typography>
        </Box>
        <Stack
          alignItems="center"
          justifyContent="center"
          gap="1"
          padding="2"
          maxWidth="70%"
          margin="0 auto"
        >
          <MotivationIllustration />

          <Typography textAlign="center"> {t('select')}</Typography>

          <Button
            type="submit"
            variant="contained"
            fullWidth
            sx={{
              mb: '5px',
              mt: '20px',
              padding: '14px',
            }}
            color="primary"
            onClick={handleStartGuide}
          >
            {t('start')}
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
