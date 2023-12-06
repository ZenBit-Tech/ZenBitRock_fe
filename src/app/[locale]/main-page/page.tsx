'use client';

import PropertiesList from 'components/custom/propertiesList';
import { Box, Typography } from '@mui/material';
import { ProtectedRoute } from 'components/custom';
// import { NotificationCenter, PropertyFilter } from './lib';

function MainPage() {
  return (
    <ProtectedRoute>
      <Box sx={{ p: '10px', margin: '0 auto', maxWidth: '800px' }}>
        {/* <NotificationCenter /> */}
        <Typography variant="h3" sx={{ marginTop: 3 }}>
          My properties
        </Typography>
        {/* <PropertyFilter /> */}
        <PropertiesList />
      </Box>
    </ProtectedRoute>
  );
}

export default MainPage;
