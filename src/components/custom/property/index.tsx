'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Card } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useGetProperty } from 'api/property';
import { IPropertyDetailed } from 'types/property';
// import { getCountries } from 'sections/verification-view/drop-box-data';
import { LoadingScreen } from 'components/loading-screen';
import {
  Title,
  TypographyStyled,
  ButtonStyled,
  TextStyled,
  ListStyled,
  BoxStyled,
  TextMiddleStyled,
  CardMediaStyled,
  Wrapper,
} from './styles';
import Iconify from 'components/iconify';
import { useSnackbar } from 'components/snackbar';
import { QOBRIX_HOST } from 'config-global';
import { fCurrency } from 'utils/format-number';
import { AxiosError } from 'axios';
import useViewOnMap from './components/ViewOnMap';
import SlickSlider from './components/SlickSlider';
import getImages from './helpers/getImages';
import ViewOnMap from './components/ViewOnMap';

export default function Property({ id }: { id: string }): JSX.Element {
  const { property, propertyError } = useGetProperty(id);
  const [propertyDetailed, setPropertyDetailed] = useState<IPropertyDetailed>();
  const [error, setError] = useState<AxiosError>();
  const [openGoogle, setOpenGoogle] = useState(false);

  const t = useTranslations('property');
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async () => {
      try {
        setError(propertyError);
        if (!propertyError && property) {
          setPropertyDetailed(property);
        }
      } catch (err) {
        setError(err);
      }
    })();
  }, [property]);

  function closeModal() {
    setOpenGoogle(!openGoogle);
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        margin: '0 auto',
        borderRadius: '8px',
      }}
    >
      <Title variant="h3" sx={{ marginBottom: '1.5rem' }}>
        {t('title')}
      </Title>
      {error && enqueueSnackbar('Something went wrong!', { variant: 'error' })}
      {propertyDetailed && (
        <Card
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
            width: '45%',
            marginBottom: '2rem',
          }}
        >
          <SlickSlider photos={getImages(propertyDetailed.media)} />
          <TextStyled
            sx={{
              fontWeight: 'bold',
            }}
          >
            {propertyDetailed?.status}
          </TextStyled>
          <ButtonStyled
            sx={{ padding: '14px' }}
            variant="contained"
            color="primary"
            onClick={() => setOpenGoogle(!openGoogle)}
          >
            <TypographyStyled>{t('maps')}</TypographyStyled>
          </ButtonStyled>
          <ButtonStyled
            sx={{ padding: '14px' }}
            variant="contained"
            color="primary"
            onClick={() => router.push(`/leads/${id}`)}
          >
            <TypographyStyled>{t('leads')}</TypographyStyled>
          </ButtonStyled>
        </Card>
      )}
      {openGoogle && (
        <ViewOnMap coordinates={propertyDetailed?.coordinates} closeModal={closeModal} />
      )}
    </div>
  );
}
