'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { grey } from '@mui/material/colors';
import { NavSectionHorizontal } from 'components/nav-section';
import { UserProfileResponse } from 'types';
import { NAV_ITEMS, defaultConfig } from './lib';

type Props = {
  user: UserProfileResponse | null;
};

const Navbar = ({ user }: Props): JSX.Element => {
  return (
    <>
      {user && (
        <AppBar
          position="fixed"
          component="nav"
          sx={{
            boxShadow: (theme) => theme.customShadows.z20,
            borderTop: `1px solid ${grey[900]} `,
            top: 'auto',
            bottom: 0,
            zIndex: '1',
            backgroundColor: (theme) => theme.palette.primary.contrastText,
          }}
        >
          <Toolbar>
            <NavSectionHorizontal data={NAV_ITEMS} config={defaultConfig} />
          </Toolbar>
        </AppBar>
      )}
    </>
  );
};

export { Navbar };
