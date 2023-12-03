'use client';

import { useSelector } from 'react-redux';
import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import { _socials, _userAbout } from '_mock';
import { selectCurrentUser } from 'store/auth/authReducer';
import Iconify from 'components/iconify';
import { findCountryLabelByCode } from 'sections/verification-view/drop-box-data';

const LINKS = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
};

const RenderAbout = (): JSX.Element => {
  const t = useTranslations('profilePage');
  const authState = useSelector(selectCurrentUser);
  const { agency, email, country, city, phone, description } = authState;

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

        {agency && (
          <Stack direction="row" sx={{ typography: 'body2' }}>
            <Iconify icon="material-symbols-light:home-work-rounded" width={24} sx={{ mr: 2 }} />
            {agency}
          </Stack>
        )}

        <Box sx={{ typography: 'subtitle2' }}>{t('aboutSubtitle2')}</Box>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {t('countryTxt')}
            <Link variant="subtitle2" color="inherit">
              {findCountryLabelByCode(country)}
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {t('cityTxt')}
            <Link variant="subtitle2" color="inherit">
              {city}
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

const RenderSocials = (): JSX.Element => {
  const t = useTranslations('profilePage');

  return (
    <Card>
      <CardHeader title={t('socialTitle')} />

      <Stack spacing={2} sx={{ p: 3 }}>
        {_socials.map((link) => (
          <Stack
            key={link.name}
            spacing={2}
            direction="row"
            sx={{ wordBreak: 'break-all', typography: 'body2' }}
          >
            <Iconify
              icon={link.icon}
              width={24}
              sx={{
                flexShrink: 0,
                color: link.color,
              }}
            />
            <Link color="inherit">
              {link.value === LINKS.FACEBOOK && _userAbout.socialLinks.facebook}
              {link.value === LINKS.INSTAGRAM && _userAbout.socialLinks.instagram}
              {link.value === LINKS.LINKEDIN && _userAbout.socialLinks.linkedin}
              {link.value === LINKS.TWITTER && _userAbout.socialLinks.twitter}
            </Link>
          </Stack>
        ))}
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
      <Grid xs={12} md={4}>
        <Stack spacing={3}>
          <RenderSocials />
        </Stack>
      </Grid>
    </Grid>
  );
}
