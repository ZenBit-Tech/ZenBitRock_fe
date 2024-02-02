'use client';

import { Box, Typography } from '@mui/material';

type Props = {
  title: string;
};

const PageTitle = ({ title }: Props): JSX.Element => (
  <Box
    sx={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginY: '1.5rem',
    }}
  >
    <Typography sx={{ whiteSpace: 'nowrap' }} variant="h3">
      {title}
    </Typography>
  </Box>
);

export { PageTitle };
