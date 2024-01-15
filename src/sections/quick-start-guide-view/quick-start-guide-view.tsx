'use client';

import { useTranslations } from 'next-intl';
import { useRouter } from 'next/navigation';
import { Box, Button, Container, Link, Stack, Typography } from '@mui/material';
import MenuBookIcon from '@mui/icons-material/MenuBook';
import { MotivationIllustration } from 'assets/illustrations';
import { GoBackPageTitile } from 'components/custom';
import Iconify from 'components/iconify';
import { useSettingsContext } from 'components/settings';
import { AppRoute } from 'enums';

export default function QuickStartGuideView(): JSX.Element {
  const t = useTranslations('guidePage');
  const settings = useSettingsContext();
  const router = useRouter();

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
          onClick={() => router.push(AppRoute.HOME_PAGE)}
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
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Iconify icon="fluent:home-24-filled" width={24} sx={{ mr: 2 }} />
          <Link href="#">{t('main')}</Link>
        </Stack>

        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Iconify icon="fluent:document-person-20-filled" width={24} sx={{ mr: 2 }} />
          <Link href="#">{t('profile')}</Link>
        </Stack>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Iconify icon="mdi:leads" width={24} />
          <Link href="#">{t('leads')}</Link>
        </Stack>
        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Iconify icon="f7:person-3-fill" width={24} sx={{ mr: 2 }} />
          <Link href="#">{t('agents')}</Link>
        </Stack>

        <Stack direction="row" sx={{ alignItems: 'center' }}>
          <Iconify icon="mdi:message-bubble" width={24} sx={{ mr: 2 }} minWidth={24} />
          <Link href="#">{t('messages')}</Link>
        </Stack>
        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Iconify icon="fluent-mdl2:add-group" width={24} />
          <Link href="#">{t('group')}</Link>
        </Stack>
      </Stack>
    </Container>
  );
}
