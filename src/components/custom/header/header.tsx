'use client';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { useMockedUser, useSelector, useTranslations } from 'hooks';
import { AppRoute } from 'enums';
import { RootState } from 'store';
import { HEADER, HeaderAvatar } from './lib';
import { Logo } from './styles';

const Header = (): JSX.Element => {
  const theme = useTheme();
  const t = useTranslations('Home');
  const { user } = useMockedUser();
  const auth = useSelector((state: RootState) => state.authSlice);

  return (
    <AppBar position="static" sx={{ borderBottom: `1px solid ${grey[900]}` }}>
      <Toolbar
        disableGutters
        sx={{
          height: {
            xs: HEADER.H_MOBILE,
            md: HEADER.H_DESKTOP,
          },
        }}
      >
        <Container maxWidth={false} sx={{ height: 1, display: 'flex', alignItems: 'center' }}>
          <Logo href={AppRoute.HOME_PAGE}>{t('Header.title')}</Logo>
          <Box sx={{ flexGrow: 1 }} />
          {auth.id && (
            <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
              <Typography sx={{ textAlign: 'right', color: theme.palette.primary.main }}>{`${t(
                'Header.greeting'
              )}, ${user.displayName}!`}</Typography>
              <HeaderAvatar avatar={''} />
            </Box>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
