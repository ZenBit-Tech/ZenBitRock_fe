'use client';

import { Backdrop, Box, CircularProgress, Typography, Container } from '@mui/material';
import { ProtectedRoute, Onboarding, useOnboardingContext, DELAY } from 'components/custom';
import PropertiesList from 'components/custom/propertiesList';
import { useCallback, useMount, useSelector, useState, useTranslations } from 'hooks';
import { StorageKey } from 'enums';
import { getMainPagePropertyFilter, getNameFilter } from 'utils';
import { getStorage } from 'hooks/use-local-storage';
import { getStorageKeyWithUserId } from 'services';
import { RootState } from 'store';
import { NotificationCenter, PropertyFilter } from './lib';

function MainPage(): JSX.Element {
  const authUser = useSelector((state: RootState) => state.authSlice.user);
  const userId = authUser?.id || '';

  const propertyFilterWithUserId: string = getStorageKeyWithUserId(
    StorageKey.PROPERTY_FILTER,
    userId
  );
  const searchParamWithUserId: string = getStorageKeyWithUserId(
    StorageKey.PROPERTIES_SEARCH_PARAM,
    userId
  );

  const [filter, setFilter] = useState<string>(
    getStorage(propertyFilterWithUserId)
      ? getMainPagePropertyFilter(getStorage(propertyFilterWithUserId))
      : ''
  );
  const [propertyNameFilter, setPropertyNameFilter] = useState<string>(
    getStorage(searchParamWithUserId) ? getNameFilter(getStorage(searchParamWithUserId)) : ''
  );
  const [showLoader, setLoader] = useState(true);
  const {
    setState,
    state: { stepIndex, tourActive },
  } = useOnboardingContext();

  const handleSetFilter = useCallback(
    (search: string) => {
      let defaultFilter = '';
      const storedFilter = getStorage(propertyFilterWithUserId);

      if (storedFilter) {
        defaultFilter = getMainPagePropertyFilter(storedFilter);
      }
      setFilter(search ? search : defaultFilter);
    },
    [setFilter, propertyFilterWithUserId]
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

  useMount(() => {
    if (tourActive) {
      setTimeout(() => {
        setLoader(false);
        setState({ run: true, stepIndex: 0 });
      }, DELAY);
    }
  });

  return (
    <ProtectedRoute>
      <Container sx={{ pb: 8, px: 2 }} className="onboarding-step-1">
        {((showLoader && tourActive) || stepIndex === 5) && (
          <Backdrop open sx={{ zIndex: (theme) => theme.zIndex.modal + 1 }}>
            <CircularProgress color="primary" />
          </Backdrop>
        )}
        <Onboarding />
        <Box sx={{ margin: '0 auto', maxWidth: '800px' }}>
          <NotificationCenter t={t} />
          <Typography
            variant="h3"
            sx={{
              marginTop: 3,
              marginBottom: 3,
            }}
          >
            {t('myProperties')}
          </Typography>
          <PropertyFilter
            userId={userId}
            setFilter={handleSetFilter}
            searchParamWithUserId={searchParamWithUserId}
            setPropertyNameFilter={handleSetPropertyNameFilter}
          />
          <PropertiesList tourActive={tourActive} search={getCombinedFilter()} />
        </Box>
      </Container>
    </ProtectedRoute>
  );
}

export default MainPage;
