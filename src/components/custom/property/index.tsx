'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AxiosError } from 'axios';
import { Box, Fab } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useGetProperty } from 'api/property';
import { IPropertyDetailed } from 'types/property';
import { useSnackbar } from 'components/snackbar';
import SlickSlider from './components/SlickSlider';
import getImages from './helpers/getImages';
import ViewOnMap from './components/ViewOnMap';
import Iconify from 'components/iconify';
import InfoBlock from './components/InfoBlock';
import { Title, TypographyStyled, ButtonStyled, Wrapper } from './styles';
import Image from 'components/image/image';
import useScrollToTop from '../propertiesList/hooks/useScrollToTop';

export default function Property({ id }: { id: string }): JSX.Element {
  const { property, propertyError } = useGetProperty(id);
  const [propertyDetailed, setPropertyDetailed] = useState<IPropertyDetailed>();
  const [error, setError] = useState<AxiosError>();
  const [openModal, setOpenModal] = useState(false);

  const t = useTranslations('property');
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const isVisible = useScrollToTop();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

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
    setOpenModal(!openModal);
  }

  return (
    <Wrapper
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '90%',
        margin: '0 auto',
        borderRadius: '8px',
        transition: 'easy-in 200 all',
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
          onClick={(): void => router.push(`/main-page`)}
        >
          <Iconify icon={'solar:arrow-left-linear'} width={'2rem'} height={'2rem'} />
        </ButtonStyled>
        <Title variant="h3">{t('title')}</Title>
      </Box>
      {error && enqueueSnackbar(t('error'), { variant: 'error' })}
      {propertyDetailed && (
        <>
          {propertyDetailed.media ? (
            <SlickSlider photos={getImages(propertyDetailed.media)} />
          ) : (
            <Image
              src={'/assets/images/home/properties_blank.jpg'}
              alt={t('alt')}
              sx={{
                width: '100%',
                height: '200px',
                objectFit: 'cover',
              }}
            />
          )}
          <InfoBlock property={propertyDetailed} />
          <ButtonStyled
            sx={{ padding: '14px', marginY: '1.5rem' }}
            variant="contained"
            color="primary"
            onClick={(): void => setOpenModal(!openModal)}
          >
            <TypographyStyled>{t('maps')}</TypographyStyled>
          </ButtonStyled>
          <ButtonStyled
            sx={{ padding: '14px', marginBottom: '1.5rem' }}
            variant="contained"
            color="primary"
            onClick={(): void => router.push(`/leads/${id}`)}
          >
            <TypographyStyled>{t('leads')}</TypographyStyled>
          </ButtonStyled>
        </>
      )}
      {openModal && (
        <ViewOnMap
          coordinates={
            propertyDetailed?.coordinates
              ? propertyDetailed?.coordinates
              : `${propertyDetailed?.city}, ${propertyDetailed?.street}`
          }
          closeModal={closeModal}
          openModal={openModal}
        />
      )}
      <Fab
        color="primary"
        aria-label="scroll to top"
        onClick={scrollToTop}
        sx={{
          position: 'fixed',
          bottom: '50px',
          right: '20px',
          display: isVisible ? 'block' : 'none',
          transition: 'easy-in 200 all',
        }}
      >
        ↑
      </Fab>
    </Wrapper>
  );
}
