'use client';

import { useState } from 'react';
import { useScrollToTop } from 'hooks';
import { useRouter } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { Box, Fab } from '@mui/material';

import { InfoBlock, SlickSlider, ViewOnMap } from 'components/custom/property/components';
import { getImages } from 'components/custom/property/helpers';
import { TypographyStyled, ButtonStyled, Wrapper } from 'components/custom/property/styles';

import Image from 'components/image/image';
import { useSnackbar } from 'components/snackbar';
import { backgroundImages } from 'constants/backgroundImgLinks';
import { AppRoute } from 'enums';
import { useGetPropertyQuery } from 'store/api/qobrixApi';
import { GoBackPageTitile } from '../go-back-page-title/go-back-page-title';

export default function Property({ id }: { id: string }): JSX.Element {
  const [openModal, setOpenModal] = useState<boolean>(false);

  const t = useTranslations('property');
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();

  const isVisible = useScrollToTop();

  const scrollToTop = (): void => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const { data, error } = useGetPropertyQuery(id);

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
      <GoBackPageTitile title={t('title')} ml="-20px" />
      <Box sx={{ display: 'none' }}>
        {error && enqueueSnackbar(t('error'), { variant: 'error' })}
      </Box>
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
            disabled={
              !propertyDetailed.coordinates && !(propertyDetailed.city && propertyDetailed.street)
            }
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
            onClick={(): void => {
              localStorage.removeItem('leadsFilter');
              router.push(
                `${AppRoute.PROPERTY_PAGE}/${id}${AppRoute.LEADS_PAGE}/${propertyDetailed.name}`
              );
            }}
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
