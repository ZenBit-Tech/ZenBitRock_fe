'use client';

import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import { Typography } from '@mui/material';
import CardHeader from '@mui/material/CardHeader';
import { findCountryLabelByCode } from 'sections/verification-view/drop-box-data';
import { RootState } from 'store';
import Iconify from 'components/iconify';
import { LoadingScreen } from 'components/loading-screen';
import { agentRoles } from 'constants/agentRoles';

const RenderAbout = (): JSX.Element => {
  const t = useTranslations('profilePage');
  const authUser = useSelector((state: RootState) => state.authSlice.user);
  
  if (!authUser) {
    return <LoadingScreen />;
  }

  const { agencyName, contactEmail: email, country, city, phone, description, role } = authUser;

  return (
    <Card>
      <CardHeader title={t('aboutTitle')} />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ typography: 'body2' }}>{description}</Box>
        <Box sx={{ typography: 'subtitle2' }}>{t('aboutSubtitle1')}</Box>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="eva:phone-fill" width={24} sx={{ mr: 2 }} />
          <Link href={`tel: ${phone}`}>{phone}</Link>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          <Link href={`mailto:${email}`}>{email}</Link>
        </Stack>

        {agencyName && role !== agentRoles.AGENT && (
          <Stack direction="row" sx={{ typography: 'body2' }}>
            <Iconify icon="material-symbols-light:home-work-rounded" width={24} sx={{ mr: 2 }} />
            {agencyName}
          </Stack>
        )}

        <Box sx={{ typography: 'subtitle2' }}>{t('aboutSubtitle2')}</Box>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {t('countryTxt')}
            <Typography variant="subtitle2" color="inherit">
              {findCountryLabelByCode(country)}
            </Typography>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {t('cityTxt')}
            <Typography variant="subtitle2" color="inherit">
              {city}
            </Typography>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

export default function ProfileHome(): JSX.Element {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          <RenderAbout />
        </Stack>
      </Grid>
    </Grid>
  );
}
