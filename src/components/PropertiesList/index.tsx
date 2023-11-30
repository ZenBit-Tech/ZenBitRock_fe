'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, List } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useGetProperties } from 'api/property';
import { PropertyList, PropertyPagination, PropertyParamsList } from 'types/properties';
import { getCountries } from 'sections/verification-view/drop-box-data';
import { LoadingScreen } from 'components/loading-screen';
import { Title, TypographyStyled, LinkStyled, ListItemStyled, TextFieldStyled } from './styles';
import Image from 'components/image';
import Iconify from 'components/iconify';

const INITIAL_PARAMS: PropertyParamsList = {
  page: 1,
  limit: 10,
  fields: ['id', 'sale_rent', 'status', 'country', 'city', 'list_selling_price_amount'],
  media: true,
};

export default function PropertiesList(): JSX.Element {
  const [propertiesList, setPropertiesList] = useState<PropertyList>([]);
  const [propertiesPagination, setPropertiesPagination] = useState<PropertyPagination>();
  const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<any>(null);
  const [params, setParams] = useState<PropertyParamsList>(INITIAL_PARAMS);
  const [isFetching, setIsFetching] = useState(false);

  const getProperties = useGetProperties({ params: params });

  const t = useTranslations('signInPage');

  useEffect(() => {
    (async () => {
      try {
        const { properties, propertiesLoading, propertiesError } = getProperties;

        setError(propertiesError);
        setIsLoading(propertiesLoading);
        if (!propertiesError && properties.data.length !== 0) {
          setPropertiesList((prev) => [...prev, ...properties.data]);
          setPropertiesPagination(properties.pagination);
        }
        setIsFetching(false);
        propertiesPagination?.has_next_page &&
          setParams((prev) => ({ ...prev, page: prev.page++ }));
      } catch (err) {
        console.error('Error fetching properties:', err);
        setError(`An error occurred while fetching properties. - ${err}`);
      }
    })();
  }, [isFetching]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    )
      return;
    setIsFetching(true);
  }

  const notify = () => toast(error, { position: 'top-center' });

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%' }}>
      <Title variant="h2" sx={{ marginBottom: '1.5rem' }}>
        {t('My properties')}
      </Title>
      <p>Filter</p>
      {error && notify()}
      {isLoading && !error && <LoadingScreen />}
      {propertiesList.length !== 0 && (
        <List
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            gap: '8%',
            width: '80%',
          }}
        >
          {propertiesList.map((item) => {
            const { id, sale_rent, status, country, city, list_selling_price_amount, photo } = item;
            return (
              <ListItemStyled key={t(id)}>
                <Box sx={{ position: 'relative', width: '100%', height: '50%' }}>
                  <Image
                    src={photo}
                    alt={t('Property photo')}
                    width={'200px'}
                    sx={{ objectFit: 'cover', width: '100%', height: '100%' }}
                  />
                  <TextFieldStyled
                    sx={{
                      position: 'absolute',
                      bottom: '1rem',
                      right: '1rem',
                      transform: 'translateX(-100%)',
                      fontWeight: 'bold',
                    }}
                  >
                    ${list_selling_price_amount}
                  </TextFieldStyled>
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
                  }}
                >
                  <Box
                    sx={{
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      width: '100%',
                    }}
                  >
                    <TextFieldStyled
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {t(sale_rent)}
                    </TextFieldStyled>
                    <TextFieldStyled
                      sx={{
                        fontWeight: 'bold',
                      }}
                    >
                      {t(status)}
                    </TextFieldStyled>
                  </Box>
                  <TextFieldStyled>
                    {t(getCountries().find((object) => object.value === country)?.label)}, {t(city)}
                  </TextFieldStyled>
                  <LinkStyled>
                    <TypographyStyled>Description</TypographyStyled>
                    <Iconify icon={'ri:arrow-right-s-line'} height={'auto'} />
                  </LinkStyled>
                </Box>
              </ListItemStyled>
            );
          })}
        </List>
      )}
    </Box>
  );
}
