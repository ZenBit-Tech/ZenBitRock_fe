'use client';

import { useTranslations } from 'next-intl';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import { _socials } from '_mock';
import { IUserProfile } from 'types/user';
import Iconify from 'components/iconify';

type Props = {
  info: IUserProfile;
};

const LINKS = {
  FACEBOOK: 'facebook',
  INSTAGRAM: 'instagram',
  LINKEDIN: 'linkedin',
  TWITTER: 'twitter',
};

const RenderAbout = ({ info }: Props) => {
  const t = useTranslations('profilePage');

  return (
    <Card>
      <CardHeader title={t('aboutTitle')} />

      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ typography: 'body2' }}>{info.quote}</Box>
        <Box sx={{ typography: 'subtitle2' }}>{t('aboutSubtitle1')}</Box>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="eva:phone-fill" width={24} sx={{ mr: 2 }} />
          <Link href={`tel: ${t('tel')}`}>{t('tel')}</Link>
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:mail-24-filled" width={24} sx={{ mr: 2 }} />
          <Link href={`mailto:${info.email}`}>{info.email}</Link>
        </Stack>

        <Box sx={{ typography: 'subtitle2' }}>{t('aboutSubtitle2')}</Box>

        <Stack direction="row" spacing={2}>
          <Iconify icon="ic:round-business-center" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {t('years')}
            <Link variant="subtitle2" color="inherit">
              10
            </Link>
          </Box>
        </Stack>

        <Stack direction="row" spacing={2}>
          <Iconify icon="mingcute:location-fill" width={24} />
          <Box sx={{ typography: 'body2' }}>
            {t('cover')}
            <Link variant="subtitle2" color="inherit">
              {info.country}
            </Link>
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

const RenderSocials = ({ info }: Props) => {
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
              {link.value === LINKS.FACEBOOK && info.socialLinks.facebook}
              {link.value === LINKS.INSTAGRAM && info.socialLinks.instagram}
              {link.value === LINKS.LINKEDIN && info.socialLinks.linkedin}
              {link.value === LINKS.TWITTER && info.socialLinks.twitter}
            </Link>
          </Stack>
        ))}
      </Stack>
    </Card>
  );
};

export default function ProfileHome({ info }: Props) {
  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={8}>
        <Stack spacing={3}>
          <RenderAbout info={info} />
        </Stack>
      </Grid>
      <Grid xs={12} md={4}>
        <Stack spacing={3}>
          <RenderSocials info={info} />
        </Stack>
      </Grid>
    </Grid>
  );
}
