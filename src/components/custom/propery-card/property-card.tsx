'use client';

import { Box, Card } from '@mui/material';
import { QobrixProperty } from 'types/qobrix';
import Iconify from 'components/iconify';
import Image from 'components/image';
import { useRouter, useTranslations } from 'hooks';
import { QOBRIX_HOST } from 'config-global';
import { backgroundImages } from 'constants/backgroundImgLinks';
import { getCountries } from 'sections/verification-view/drop-box-data';
import { fCurrency } from 'utils/format-number';
import { endpoints } from 'utils/axios';
import {
  BoxStyled,
  CardMediaStyled,
  LinkStyled,
  TextMiddleStyled,
  TextStyled,
  TypographyStyled,
} from './styles';

type Props = {
  property: QobrixProperty;
};

const URL = endpoints.property;

const PropertyCard = ({ property }: Props) => {
  const t = useTranslations('properties');
  const router = useRouter();

  const { id, saleRent, status, country, city, price, photo } = property;

  return (
    <Card
      key={id}
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
};

export { PropertyCard };
