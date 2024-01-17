'use client';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import { grey } from '@mui/material/colors';
import { useTheme } from '@mui/material/styles';
import { Link, Typography } from '@mui/material';
import MessagesIndicator from 'components/custom/messages-indicator/messages-indicator';
import { useTranslations } from 'hooks';
import { AppRoute } from 'enums';
import { UserProfileResponse } from 'types';
import { HEADER, HeaderAvatar } from './lib';
import { Logo } from './styles';

type Props = {
  user: UserProfileResponse | null;
};

const FULLED_ELEMENTS_WIDTH: string = '300px';

const Header = ({ user }: Props): JSX.Element => {
  const theme = useTheme();
  const t = useTranslations('Home');

  const avatar = user?.avatarUrl ? user?.avatarUrl : '';

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
        <Container
          maxWidth={false}
          sx={{
            height: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Logo href={AppRoute.HOME_PAGE}>{t('Header.title')}</Logo>
          {user && (
            <Box sx={{ display: 'flex', alignItems: 'center', position: 'relative' }}>
              <Typography
                sx={{
                  display: 'block',
                  textAlign: 'right',
                  color: theme.palette.primary.main,
                  mr: '10px',
                  textOverflow: 'ellipsis',
                  overflow: 'hidden',
                  maxWidth: `calc(100vw - ${FULLED_ELEMENTS_WIDTH})`,
                }}
              >{`${t('Header.greeting')}, ${
                user.firstName ? `${user.firstName}` : t('Header.displayName')
              }!`}</Typography>
              <Link href={AppRoute.PROFILE_PAGE} className="onboarding-step-3">
                <HeaderAvatar avatar={avatar} />
              </Link>
              <MessagesIndicator />
            </Box>
          )}
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export { Header };
