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
        gap="1"
        padding="2"
        maxWidth="70%"
        margin="0 auto"
      >
        <MotivationIllustration />
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
          startIcon={<MenuBookIcon />}
          onClick={handleStartGuide}
        >
          {t('start')}
        </Button>
        <Typography sx={{ mb: 1 }}> {t('select')}</Typography>
      </Stack>
      <Stack
        spacing={2}
        sx={{
          margin: '0 auto',
          p: 3,
          typography: 'h4',
          fontWeight: 'fontWeightRegular',
        }}
      >
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Iconify icon="mdi:leads" width={24} />
          <Link onClick={handleStartGuideLeads}>{t('leads')}</Link>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Iconify icon="f7:person-3-fill" width={24} sx={{ mr: 2 }} />
          <Link onClick={handleStartGuideAgents}>{t('agents')}</Link>
        </Stack>

        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Iconify icon="mdi:message-bubble" width={24} sx={{ mr: 2 }} minWidth={24} />
          <Link onClick={handleStartGuideChats}>{t('messages')}</Link>
        </Stack>
      </Stack>
    </Container>
  );
}
