'use client';

import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { Box, Card, CardContent, CardMedia, List } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useGetProperties } from 'api/property';
import { Properties, PropertyList, PropertyPagination, PropertyParamsList } from 'types/properties';
import { getCountries } from 'sections/verification-view/drop-box-data';
import { LoadingScreen } from 'components/loading-screen';
import { Title, TypographyStyled, LinkStyled, CardMediaStyled, TextFieldStyled } from './styles';
// import Image from 'components/image';
import Iconify from 'components/iconify';
import { SnackbarProvider } from 'notistack';
import { QOBRIX_HOST } from 'config-global';
import { fCurrency } from 'utils/format-number';

const INITIAL_PARAMS: PropertyParamsList = {
  page: 1,
  limit: 10,
  fields: ['id', 'sale_rent', 'status', 'country', 'city', 'list_selling_price_amount'],
  media: true,
};

type GetProperties = {
  properties: Properties;
  propertiesLoading: Boolean;
  propertiesError: any;
  propertiesValidating: Boolean;
  propertiesEmpty: Boolean;
};

export default function PropertiesList(): JSX.Element {
  const [params, setParams] = useState<PropertyParamsList>(INITIAL_PARAMS);
  // const getProperties =
  const { properties, propertiesError } = useGetProperties({ params: params });

  // const [getProperties] = useState<GetProperties>(useGetProperties({ params: params }));
  const [propertiesList, setPropertiesList] = useState<PropertyList>([]);
  const [propertiesPagination, setPropertiesPagination] = useState<PropertyPagination>();
  // const [isLoading, setIsLoading] = useState<Boolean>(true);
  const [error, setError] = useState<any>(null);
  const [isFetching, setIsFetching] = useState(true);

  const t = useTranslations('properties');

  // const getProperties = useGetProperties({ params: params });
  // console.log(getProperties);
  useEffect(() => {
    isFetching &&
      (async () => {
        try {
          console.log('click');

          setError(propertiesError);
          // setIsLoading(propertiesLoading);
          if (!propertiesError && properties.data) {
            setPropertiesList((prev) => [...prev, ...properties.data]);
            setPropertiesPagination(properties.pagination);
            setIsFetching(false);
          }
          propertiesPagination?.has_next_page &&
            setParams((prev) => ({ ...prev, page: prev.page++ }));
        } catch (err) {
          console.error('Error fetching properties:', err);
          setError(`An error occurred while fetching properties. - ${err}`);
        }
      })();
  });

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  function handleScroll() {
    if (window.innerHeight + window.scrollY < document.body.offsetHeight) {
      return;
    } else {
      setIsFetching(true);
    }
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', marginX: 'auto' }}>
      <Title variant="h3" sx={{ marginBottom: '1.5rem' }}>
        {t('title')}
      </Title>
      <p>Filter</p>
      <SnackbarProvider>
        {propertiesList.length !== 0 && (
          <List
            sx={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: '5%',
              width: '90%',
              // padding: '0',
              marginX: 'auto',
            }}
          >
            {propertiesList.map((item, index) => {
              const { id, sale_rent, status, country, city, list_selling_price_amount, photo } =
                item;
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
                    <CardMedia
                    // sx={{
                    //   width: 'auto',
                    //   height: 'auto',
                    // }}
                    >
                      <img
                        src={`${QOBRIX_HOST}${photo}`}
                        alt={t('alt')}
                        // height={'20rem'}
                        style={{
                          objectFit: 'fill',
                          overflow: 'hidden',
                        }}
                      />
                    </CardMedia>
                    <TextFieldStyled
                      sx={{
                        position: 'absolute',
                        bottom: '1rem',
                        right: '1rem',
                        fontWeight: 'bold',
                        color: 'white',
                        textShadow: '1px 1px 2px black',
                      }}
                    >
                      {fCurrency(list_selling_price_amount)}
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
                      maxHeight: '50%',
                      minHeight: '50%',
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
                      {getCountries().find((object) => object.value === country)?.label}, {city}
                    </TextFieldStyled>
                    <LinkStyled>
                      <TypographyStyled>{t('Description')}</TypographyStyled>
                      <Iconify icon={'ri:arrow-right-s-line'} height={'auto'} />
                    </LinkStyled>
                  </Box>
                </Card>
              );
            })}
          </List>
        )}
        {isFetching && !error && <LoadingScreen />}
      </SnackbarProvider>
    </Box>
  );
}
