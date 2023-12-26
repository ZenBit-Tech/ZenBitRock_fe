'use client';

import { Box, Typography } from '@mui/material';

import { ProtectedRoute } from 'components/custom';
import PropertiesList from 'components/custom/propertiesList';
import { useCallback, useState } from 'hooks';

import { NotificationCenter, PropertyFilter } from './lib';

function MainPage(): JSX.Element {
  const [filter, setFilter] = useState('');

  const handleSetFilter = useCallback(
    (search: string) => {
      setFilter(search);
    },
    [setFilter]
  );

  return (
    <ProtectedRoute>
      <Box sx={{ p: '10px', margin: '0 auto', maxWidth: '800px' }}>
        <NotificationCenter />
        <Typography variant="h3" sx={{ marginTop: 3 }}>
          My properties
        </Typography>
        <PropertyFilter setFilter={handleSetFilter} />
        <PropertiesList search={filter} />
      </Box>
    </ProtectedRoute>
  );
}

export default MainPage;
