'use client';

import { Box, Card } from '@mui/material';
import { QobrixProperty } from 'types/qobrix';
import Iconify from 'components/iconify';
import Image from 'components/image';
import { useRouter, useTranslations } from 'hooks';
import { QOBRIX_HOST } from 'config-global';
import { backgroundImages } from 'constants/backgroundImgLinks';
import { AppRoute } from 'enums';
import { getCountries } from 'sections/verification-view/drop-box-data';
import { fCurrency } from 'utils/format-number';
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
  className: string;
};

const PropertyCard = ({ property, className }: Props) => {
  const t = useTranslations('properties');
  const router = useRouter();

  const { id, saleRent, status, country, city, price, priceRental, photo, name } = property;

  return (
    <Card
      key={id}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        marginBottom: '2rem',
        cursor: 'pointer',
      }}
      className={className}
      onClick={() => {
        localStorage.removeItem('leadsByPropertySearch');
        router.push(`${AppRoute.PROPERTY_PAGE}/${id}`);
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: '100%',
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
            fontSize: '1rem',
          }}
        >
          {price &&
            priceRental &&
            `${fCurrency(Number(price))} / ${fCurrency(Number(priceRental))}`}
          {price && !priceRental && fCurrency(Number(price))}
          {!price && priceRental && fCurrency(Number(priceRental))}
        </TextStyled>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          padding: '1rem',
          width: '100%',
          height: 'calc(100% - 100px)',
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
          {name && (
            <TextStyled
              sx={{
                fontWeight: 'bold',
              }}
            >
              {name}
            </TextStyled>
          )}
        </BoxStyled>
        <BoxStyled
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
          }}
        >
          {saleRent && (
            <TextStyled
              sx={{
                fontWeight: 'bold',
              }}
            >
              {t(saleRent)}
            </TextStyled>
          )}
          {status && (
            <TextStyled
              sx={{
                fontWeight: 'bold',
              }}
            >
              {t(status)}
            </TextStyled>
          )}
        </BoxStyled>
        {country && city && (
          <TextMiddleStyled>
            {getCountries().find((object) => object.value === country)?.label}, {city}
          </TextMiddleStyled>
        )}
        <LinkStyled sx={{ padding: '14px', marginTop: 'auto' }} variant="contained" color="primary">
          <TypographyStyled>{t('description')}</TypographyStyled>
          <Iconify icon="fluent:tap-single-32-regular" height="auto" />
        </LinkStyled>
      </Box>
    </Card>
  );
};

export { PropertyCard };
