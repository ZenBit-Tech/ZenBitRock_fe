'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { MotivationIllustration } from 'assets/illustrations';
import { GoBackPageTitile, useOnboardingContext } from 'components/custom';
import Iconify from 'components/iconify';
import { useSettingsContext } from 'components/settings';
import { AppRoute } from 'enums';

export default function QuickStartGuideView(): JSX.Element {
  const t = useTranslations('guidePage');
  const settings = useSettingsContext();
  const router = useRouter();

  const { setState } = useOnboardingContext();

  const handleStartGuide = (): void => {
    setState({ tourActive: true });
    router.push(AppRoute.MAIN_PAGE);
  };

  const handleStartGuideLeads = (): void => {
    setState({ tourActive: true });
    router.push(AppRoute.LEADS_PAGE);
  };

  const handleStartGuideAgents = (): void => {
    setState({ tourActive: true });
    router.push(AppRoute.AGENTS_PAGE);
  };

  const handleStartGuideChats = (): void => {
    setState({ tourActive: true });
    router.push(AppRoute.CHATS_PAGE);
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'} sx={{ pb: 14 }}>
      <Box sx={{ mb: 2 }}>
        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          justifyItems="center"
          sx={{ mb: 2, ml: '-22px' }}
        >
          <Stack direction="row" alignItems="center" alignContent="center">
            <GoBackPageTitile title={t('title')} />
          </Stack>
        </Stack>
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
        gap={3}
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
            padding: '14px',
          }}
          color="primary"
          startIcon={<MenuBookIcon />}
          onClick={handleStartGuide}
        >
          {t('start')}
        </Button>
      </Stack>
    </Container>
  );
}
