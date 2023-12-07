'use client';

import { Box, Typography } from '@mui/material';
import PropertiesList from 'components/custom/propertiesList';
import { ProtectedRoute } from 'components/custom';
import { NotificationCenter, PropertyFilter } from './lib';

function MainPage(): JSX.Element {
  return (
    <ProtectedRoute>
      <Box sx={{ p: '10px', margin: '0 auto', maxWidth: '800px' }}>
        <NotificationCenter />
        <Typography variant="h3" sx={{ marginTop: 3 }}>
          My properties
        </Typography>
        <PropertyFilter />
        <PropertiesList />
      </Box>
    </ProtectedRoute>
  );
}

export default MainPage;
