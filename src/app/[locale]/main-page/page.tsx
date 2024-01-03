'use client';

import { Box, Typography } from '@mui/material';

import { ProtectedRoute } from 'components/custom';
import PropertiesList from 'components/custom/propertiesList';
import { useCallback, useState, useTranslations } from 'hooks';

import { NotificationCenter, PropertyFilter } from './lib';

function MainPage(): JSX.Element {
  const [filter, setFilter] = useState('');
  const [propertyNameFilter, setPropertyNameFilter] = useState('');

  const handleSetFilter = useCallback(
    (search: string) => {
      setFilter(search);
    },
    [setFilter]
  );

  const handleSetPropertyNameFilter = useCallback(
    (search: string) => {
      setPropertyNameFilter(search);
    },
    [setPropertyNameFilter]
  );

  const getCombinedFilter = useCallback(() => {
    let combinedFilter = filter.concat(propertyNameFilter);

    combinedFilter = combinedFilter.substring(combinedFilter.indexOf('and') + 3);

    return combinedFilter;
  }, [filter, propertyNameFilter]);

  const t = useTranslations('mainPage');

  return (
    <ProtectedRoute>
      <Box sx={{ p: '10px', margin: '0 auto', maxWidth: '800px' }}>
        <NotificationCenter t={t} />
        <Typography variant="h3" sx={{ marginTop: 3 }}>
          {t('My properties')}
        </Typography>
        <PropertyFilter
          setFilter={handleSetFilter}
          setPropertyNameFilter={handleSetPropertyNameFilter}
        />
        <PropertiesList search={getCombinedFilter()} />
      </Box>
    </ProtectedRoute>
  );
}

export default MainPage;
