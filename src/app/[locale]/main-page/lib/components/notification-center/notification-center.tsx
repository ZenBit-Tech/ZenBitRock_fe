'use client';

import { Box, Typography } from '@mui/material';
import { CustomLink } from 'components/custom';
import Iconify from 'components/iconify';

const NotificationCenter = (): JSX.Element => (
  <Box>
    <Typography>Notification center</Typography>
    <Box
      sx={{
        p: 1,
        marginTop: '5px',
        borderBottom: '1px solid grey',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography>No new notifications</Typography>
      <CustomLink href="#">
        <Box component="span" display="flex" alignItems="center">
          View
          <Iconify icon="mingcute:right-line" width="15px" height="15x" color="black" />
        </Box>
      </CustomLink>
    </Box>
  </Box>
);

export { NotificationCenter };
