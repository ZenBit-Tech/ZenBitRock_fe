'use client';

import { useState } from 'react';
import { useScrollToTop } from 'hooks';
import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Box, Fab } from '@mui/material';

import Iconify from 'components/iconify';
import Image from 'components/image/image';
import { useSnackbar } from 'components/snackbar';
import { backgroundImages } from 'constants/backgroundImgLinks';
import { endpoints } from 'utils/axios';

import InfoBlock from './components/InfoBlock';
import SlickSlider from './components/SlickSlider';
import ViewOnMap from './components/ViewOnMap';
import getImages from './helpers/getImages';
import { Title, TypographyStyled, ButtonStyled, Wrapper } from './styles';
import { useGetPropertyQuery } from 'store/api/qobrixApi';

const URL = endpoints.main;

export default function Property({ id }: { id: string }): JSX.Element {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const t = useTranslations('property');
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const isVisible = useScrollToTop();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { data, error, isFetching } = useGetPropertyQuery(id);

  const propertyDetailed = data?.data;
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
          onClick={(): void => router.push(`${URL.mainpage}`)}
        >
          <Iconify icon="solar:arrow-left-linear" width="2rem" height="2rem" />
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
              src={backgroundImages.BG_PROPERTIES_PAGE}
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
            onClick={(): void => router.push(`/property/${id}/leads/${propertyDetailed.name}`)}
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
          closeModal={() => closeModal()}
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
