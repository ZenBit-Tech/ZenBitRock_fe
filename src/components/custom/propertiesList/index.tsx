'use client';

import { useEffect, useState } from 'react';

import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Box, Card, Fab } from '@mui/material';
import { AxiosError } from 'axios';

import { useGetProperties } from 'api/property';
import Iconify from 'components/iconify';
import Image from 'components/image';
import { LoadingScreen } from 'components/loading-screen';
import { useSnackbar } from 'components/snackbar';
import { QOBRIX_HOST } from 'config-global';
import { backgroundImages } from 'constants/backgroundImgLinks';
import { getCountries } from 'sections/verification-view/drop-box-data';
import {
  IPropertyList,
  IPropertyPagination,
  IPropertyParamsList,
  IPropertyItem,
} from 'types/property';
import { endpoints } from 'utils/axios';
import { fCurrency } from 'utils/format-number';

import useInfinityScroll from './hooks/useInfinityScroll';
import useScrollToTop from './hooks/useScrollToTop';
import {
  TypographyStyled,
  LinkStyled,
  TextStyled,
  ListStyled,
  BoxStyled,
  TextMiddleStyled,
  CardMediaStyled,
} from './styles';

const INITIAL_PARAMS: IPropertyParamsList = {
  page: 1,
  limit: 10,
  fields: ['id', 'sale_rent', 'status', 'country', 'city', 'list_selling_price_amount'],
  media: true,
};

const URL = endpoints.property;

function PropertiesList(): JSX.Element {
  const [params, setParams] = useState<IPropertyParamsList>(INITIAL_PARAMS);
  const { properties, propertiesError } = useGetProperties({ params });

  const [propertiesList, setPropertiesList] = useState<IPropertyList>([]);
  const [propertiesPagination, setPropertiesPagination] = useState<IPropertyPagination>();
  const [error, setError] = useState<AxiosError | null>(null);
  const [isFetching, setIsFetching] = useState<boolean>(true);

  const t = useTranslations('properties');
  const router = useRouter();
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
          {propertiesList.map((item: IPropertyItem, index: number) => {
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
                    <Image
                      src={photo ? `${QOBRIX_HOST}${photo}` : backgroundImages.BG_PROPERTIES_PAGE}
                      alt={t('alt')}
                      sx={{
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
                  <LinkStyled
                    sx={{ padding: '14px' }}
                    variant="contained"
                    color="primary"
                    onClick={() => router.push(`${URL.details}/${id}`)}
                  >
                    <TypographyStyled>{t('Description')}</TypographyStyled>
                    <Iconify icon="ri:arrow-right-s-line" height="auto" />
                  </LinkStyled>
                </Box>
              </Card>
            );
          })}
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
