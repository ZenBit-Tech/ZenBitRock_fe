'use client';

import { useEffect, useState } from 'react';
import { Box, Card } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useGetProperties } from 'api/property';
import { PropertyList, PropertyPagination, PropertyParamsList } from 'types/properties';
import { getCountries } from 'sections/verification-view/drop-box-data';
import { LoadingScreen } from 'components/loading-screen';
import {
  Title,
  TypographyStyled,
  LinkStyled,
  TextStyled,
  ListStyled,
  BoxStyled,
  TextMiddleStyled,
  CardMediaStyled,
} from './styles';
import Iconify from 'components/iconify';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { QOBRIX_HOST } from 'config-global';
import { fCurrency } from 'utils/format-number';

const INITIAL_PARAMS: PropertyParamsList = {
  page: 1,
  limit: 10,
  fields: ['id', 'sale_rent', 'status', 'country', 'city', 'list_selling_price_amount'],
  media: true,
};

export default function PropertiesList(): JSX.Element {
  const [params, setParams] = useState<PropertyParamsList>(INITIAL_PARAMS);
  const { properties, propertiesError } = useGetProperties({ params: params });

  const [propertiesList, setPropertiesList] = useState<PropertyList>([]);
  const [propertiesPagination, setPropertiesPagination] = useState<PropertyPagination>();
  const [error, setError] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);

  const t = useTranslations('properties');

  useEffect(() => {
    isFetching &&
      (async () => {
        try {
          setError(propertiesError);
          if (!propertiesError && properties.data) {
            setPropertiesList((prev) => [...prev, ...properties.data]);
            setPropertiesPagination((prev) => ({ ...prev, ...properties.pagination }));
            setIsFetching(false);
          }
          propertiesPagination?.hasNextPage &&
            setParams((prev) => ({ ...prev, page: prev.page + 1 }));
        } catch (err) {
          console.error('Error fetching properties:', err);
          setError(`An error occurred while fetching properties. - ${err}`);
        }
      })();
  }, [isFetching, properties, propertiesError, propertiesPagination]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [propertiesPagination]);
  console.log(propertiesPagination);
  function handleScroll() {
    if (!propertiesPagination) {
      return;
    }

    const windowHeight =
      'innerHeight' in window ? window.innerHeight : document.documentElement.offsetHeight;

    const body = document.body;
    const html = document.documentElement;

    const docHeight = Math.max(
      body.scrollHeight,
      body.offsetHeight,
      html.clientHeight,
      html.scrollHeight,
      html.offsetHeight
    );
    const windowBottom = windowHeight + window.scrollY;
    console.log(propertiesPagination.hasNextPage);
    if (windowBottom >= docHeight - 200 && propertiesPagination.hasNextPage) {
      setIsFetching(true);
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', marginX: 'auto' }}>
      <Title variant="h3" sx={{ marginBottom: '1.5rem' }}>
        {t('title')}
      </Title>
      <p>Filter</p>
      <SnackbarProvider />
      {error &&
        enqueueSnackbar(error, {
          variant: 'error',
          persist: true,
        })}
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
          {propertiesList.map((item, index) => {
            const { id, saleRent, status, country, city, price, photo } = item;
            return (
              <Card
                key={`${id}${index}`}
                sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  flexDirection: 'column',
                  width: '45%',
                  marginBottom: '2rem',
                }}
              >
                <Box
                  sx={{
                    position: 'relative',
                    width: '100%',
                    height: '50%',
                  }}
                >
                  <CardMediaStyled
                    sx={{
                      width: '100%',
                      objectFit: 'cover',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={`${QOBRIX_HOST}${photo}`}
                      alt={t('alt')}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </CardMediaStyled>
                  <TextStyled
                    sx={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      fontWeight: 'bold',
                      color: 'white',
                      textShadow: '1px 1px 2px black',
                    }}
                  >
                    {fCurrency(price)}
                  </TextStyled>
                </Box>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-start',
                    alignContent: 'space-between',
                    flexDirection: 'column',
                    padding: '1rem',
                    width: '100%',
                    height: '50%',
                    maxHeight: '50%',
                    minHeight: '50%',
                  }}
                >
                  <BoxStyled
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <TextStyled
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {t(saleRent)}
                    </TextStyled>
                    <TextStyled
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {t(status)}
                    </TextStyled>
                  </BoxStyled>
                  <TextMiddleStyled>
                    {getCountries().find((object) => object.value === country)?.label}, {city}
                  </TextMiddleStyled>
                  <LinkStyled href={`/property/${id}`}>
                    <TypographyStyled>{t('Description')}</TypographyStyled>
                    <Iconify icon={'ri:arrow-right-s-line'} height={'auto'} />
                  </LinkStyled>
                </Box>
              </Card>
            );
          })}
        </ListStyled>
      )}
      {isFetching && !error && <LoadingScreen />}
    </Box>
  );
}
