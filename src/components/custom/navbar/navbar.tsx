'use client';

import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import { grey } from '@mui/material/colors';
import { NavSectionHorizontal } from 'components/nav-section';
import { NAV_ITEMS, defaultConfig } from './lib';

const Navbar = () => {
  return (
    <>
      <AppBar
        position="static"
        component="nav"
        sx={{
          boxShadow: (theme) => theme.customShadows.z20,
          borderTop: `1px solid ${grey[900]} `,
          position: 'fixed',
          bottom: 0,
        }}
      >
        <Toolbar>
          <NavSectionHorizontal data={NAV_ITEMS} config={defaultConfig} />
        </Toolbar>
      </AppBar>
    </>
  );
};

export { Navbar };
