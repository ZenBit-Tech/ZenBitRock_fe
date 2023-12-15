'use client';

import { useEffect, useState } from 'react';

import { useTranslations } from 'next-intl';

import { Box, Fab } from '@mui/material';
import { AxiosError } from 'axios';

import { useGetProperties } from 'api/property';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import {
  IPropertyList,
  IPropertyPagination,
  IPropertyParamsList,
  IPropertyItem,
} from 'types/property';
import uuidv4 from 'utils/uuidv4';

import useInfinityScroll from './hooks/useInfinityScroll';
import useScrollToTop from './hooks/useScrollToTop';
import { ListStyled } from './styles';
import Property from './componets/property-item/property-item';

const INITIAL_PARAMS: IPropertyParamsList = {
  page: 1,
  limit: 10,
  fields: ['id', 'sale_rent', 'status', 'country', 'city', 'list_selling_price_amount'],
  media: true,
};

function PropertiesList(): JSX.Element {
  const [params, setParams] = useState<IPropertyParamsList>(INITIAL_PARAMS);
  const { properties, propertiesError } = useGetProperties({ params });

  const [propertiesList, setPropertiesList] = useState<IPropertyList>([]);
  const [propertiesPagination, setPropertiesPagination] = useState<IPropertyPagination>();
  const [error, setError] = useState<AxiosError | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const t = useTranslations('properties');
  const { enqueueSnackbar } = useSnackbar();

  const isVisible = useScrollToTop();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useInfinityScroll({
    callback: () => {
      if (propertiesPagination && propertiesPagination.hasNextPage) {
        setIsFetching(true);
      }
    },
  });

  useEffect(() => {
    if (isFetching)
      (async (): Promise<void> => {
        try {
          setError(propertiesError);
          if (!propertiesError && properties.data) {
            setPropertiesList((prev) => [...prev, ...properties.data]);
            setPropertiesPagination((prev) => ({ ...prev, ...properties.pagination }));
            if (properties.pagination?.hasNextPage)
              setParams((prev) => ({ ...prev, page: prev.page + 1 }));
            setIsFetching(false);
          }
        } catch (err) {
          setError(err);
        }
      })();
  }, [isFetching, properties, propertiesError, propertiesPagination]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        marginX: 'auto',
        transition: 'easy-in 200 display',
      }}
    >
      {error && enqueueSnackbar(t('error'), { variant: 'error' })}
      {propertiesList.length !== 0 && (
        <ListStyled
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '5%',
            width: '90%',
            marginX: 'auto',
          }}
        >
          {propertiesList.map((property: IPropertyItem) => (
            <Property property={property} key={uuidv4()} />
          ))}
        </ListStyled>
      )}
      {isFetching && !error && <LoadingScreen />}
      <Fab
        color="primary"
        aria-label="scroll to top"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: '70px',
          right: '20px',
          display: isVisible ? 'block' : 'none',
          transition: 'easy-in 200 display',
        }}
      >
        ↑
      </Fab>
    </Box>
  );
}

export default PropertiesList;
