'use client';

import { Box, Typography } from '@mui/material';
import { Navbar, ProtectedRoute } from 'components/custom';
import { NotificationCenter, PropertyFilter } from './lib';

export default function MainPage() {
  return (
    <ProtectedRoute>
      <Box sx={{ p: '10px', margin: '0 auto', maxWidth: '800px' }}>
        <NotificationCenter />
        <Typography variant="h3" sx={{ marginTop: 3 }}>
          My properties
        </Typography>
        <PropertyFilter />
      </Box>
      <Navbar />
    </ProtectedRoute>
  );
}
