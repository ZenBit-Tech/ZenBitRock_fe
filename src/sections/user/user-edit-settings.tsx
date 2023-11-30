import React, { ChangeEvent, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Switch, Theme } from '@mui/material';
import { alpha, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';
import CardHeader from '@mui/material/CardHeader';
import Iconify from 'components/iconify';

interface RenderProps {
  checked: boolean;
  handleChange: (event: ChangeEvent<HTMLInputElement>) => void;
  theme: Theme;
}

const RenderSettings = ({ checked, handleChange, theme }: RenderProps): JSX.Element => {
  const t = useTranslations('editProfilePage');

  return (
    <Card>
      <CardHeader title={t('settingsTitle')} />
      <Stack spacing={2} sx={{ p: 3 }}>
        <Box sx={{ typography: 'subtitle2' }}>{t('settingsSubtitle1')}</Box>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:lock-closed-key-24-filled" width={24} sx={{ mr: 2 }} />
          {t('changePass')}
        </Stack>

        <Stack direction="row" sx={{ typography: 'body2' }}>
          <Iconify icon="fluent:person-delete-24-filled" width={24} sx={{ mr: 2 }} />
          {t('deleteProfile')}
        </Stack>

        <Box sx={{ typography: 'subtitle2' }}>{t('settingsSubtitle2')}</Box>

        <Stack direction="row" spacing={2} sx={{ alignItems: 'center' }}>
          <Iconify icon="mdi:message-notification" width={24} />

          <Box sx={{ typography: 'body2' }}>
            {t('recieveNotifications')}
            <Switch
              sx={{
                '& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track': {
                  backgroundColor: alpha(theme.palette.primary.darker, 0.8),
                },
              }}
              checked={checked}
              onChange={handleChange}
              inputProps={{ 'aria-label': 'controlled' }}
            />
          </Box>
        </Stack>
      </Stack>
    </Card>
  );
};

function ProfileSettings(): JSX.Element {
  const [checked, setChecked] = useState<boolean>(true);
  const theme = useTheme();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setChecked(event.target.checked);
  };

  return (
    <Grid container spacing={3}>
      <Grid xs={12} md={12}>
        <Stack spacing={3}>
          <RenderSettings checked={checked} handleChange={handleChange} theme={theme} />
        </Stack>
      </Grid>
    </Grid>
  );
}

export default ProfileSettings;
