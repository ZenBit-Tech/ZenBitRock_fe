'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Box, Card, Typography } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useGetProperty } from 'api/property';
import { IPropertyDetailed } from 'types/property';
// import { getCountries } from 'sections/verification-view/drop-box-data';
import {
  Title,
  TypographyStyled,
  ButtonStyled,
  TextStyled,
  BoxDescriptionItem,
  TypographyDescriptionLeft,
  TypographyDescriptionRight,
  Wrapper,
} from './styles';
import { useSnackbar } from 'components/snackbar';
import { fCurrency } from 'utils/format-number';
import { AxiosError } from 'axios';
import SlickSlider from './components/SlickSlider';
import getImages from './helpers/getImages';
import ViewOnMap from './components/ViewOnMap';
import Iconify from 'components/iconify';
import InfoBlock from './components/InfoBlock';

export default function Property({ id }: { id: string }): JSX.Element {
  const { property, propertyError } = useGetProperty(id);
  const [propertyDetailed, setPropertyDetailed] = useState<IPropertyDetailed>();
  const [error, setError] = useState<AxiosError>();
  const [openGoogle, setOpenGoogle] = useState(false);

  const t = useTranslations('property');
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    (async (): Promise<void> => {
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

  function closeModal(): void {
    setOpenGoogle(!openGoogle);
  }

  return (
    <Wrapper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        margin: '0 auto',
        borderRadius: '8px',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-start',
          gap: '1rem',
          marginY: '1.5rem',
        }}
      >
        <ButtonStyled
          title={t('back')}
          sx={{ padding: '14px', width: 'fit-content' }}
          onClick={() => router.push(`/main-page`)}
        >
          <Iconify icon={'solar:arrow-left-linear'} width={'2rem'} height={'2rem'} />
        </ButtonStyled>
        <Title variant="h3">{t('title')}</Title>
      </Box>
      {error && enqueueSnackbar(t('error'), { variant: 'error' })}
      {propertyDetailed && (
        <>
          <SlickSlider photos={getImages(propertyDetailed.media)} />
          <InfoBlock property={propertyDetailed} />
          <ButtonStyled
            sx={{ padding: '14px', marginY: '1.5rem' }}
            variant="contained"
            color="primary"
            onClick={() => setOpenGoogle(!openGoogle)}
          >
            <TypographyStyled>{t('maps')}</TypographyStyled>
          </ButtonStyled>
          <ButtonStyled
            sx={{ padding: '14px', marginBottom: '1.5rem' }}
            variant="contained"
            color="primary"
            onClick={() => router.push(`/leads/${id}`)}
          >
            <TypographyStyled>{t('leads')}</TypographyStyled>
          </ButtonStyled>
        </>
      )}
      {openGoogle && (
        <ViewOnMap coordinates={propertyDetailed?.coordinates} closeModal={closeModal} />
      )}
    </Wrapper>

    // <Wrapper
    //   style={{
    //     display: 'flex',
    //     flexDirection: 'column',
    //     width: '90%',
    //     margin: '0 auto',
    //     borderRadius: '8px',
    //   }}
    // >
    //   <Title variant="h3" sx={{ marginBottom: '1.5rem' }}>
    //     {t('title')}
    //   </Title>
    //   {error && enqueueSnackbar('Something went wrong!', { variant: 'error' })}
    //   {propertyDetailed && (
    //     <Card
    //       sx={{
    //         display: 'flex',
    //         justifyContent: 'center',
    //         alignItems: 'center',
    //         flexDirection: 'column',
    //         width: '45%',
    //         marginBottom: '2rem',
    //       }}
    //     >
    //       <SlickSlider photos={getImages(propertyDetailed.media)} />
    //       <TextStyled
    //         sx={{
    //           fontWeight: 'bold',
    //         }}
    //       >
    //         {propertyDetailed?.status}
    //       </TextStyled>
    //     </Card>
    //   )}
    // </Wrapper>
  );
}
