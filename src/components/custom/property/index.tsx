'use client';

import { useEffect, useState } from 'react';
import { Box, Card } from '@mui/material';
import { useTranslations } from 'next-intl';
import { useGetProperty } from 'api/property';
import { IPropertyDetailed } from 'types/properties';
// import { getCountries } from 'sections/verification-view/drop-box-data';
import { LoadingScreen } from 'components/loading-screen';
import {
  Title,
  TypographyStyled,
  LinkStyled,
  TextStyled,
  ListStyled,
  BoxStyled,
  TextMiddleStyled,
  CardMediaStyled,
} from './styles';
import Iconify from 'components/iconify';
import { SnackbarProvider, enqueueSnackbar } from 'notistack';
import { QOBRIX_HOST } from 'config-global';
import { fCurrency } from 'utils/format-number';

export default function Property({ id }: { id: string }): JSX.Element {
  const { property, propertyError } = useGetProperty(id);

  const [propertyDetailed, setPropertyDetailed] = useState<IPropertyDetailed>();
  const [error, setError] = useState<any>(null);

  const t = useTranslations('properties');

  useEffect(() => {
    (async () => {
      try {
        setError(propertyError);
        if (!propertyError && property) {
          setPropertyDetailed(property);
        }
      } catch (err) {
        console.error('Error fetching property:', err);
        setError(`An error occurred while fetching properties. - ${err}`);
      }
    })();
  }, []);

  const {
    // saleRent,
    status,
    // country,
    // city,
    // price,
    // media,
    // description,
    // name,
    // propertyType,
    // bedrooms,
    // bathrooms,
    // livingrooms,
    // kitchenType,
    // verandas,
    // parking,
    // coordinates,
    // municipality,
    // state,
    // postCode,
    // street,
    // floorNumber,
    // seaView,
    // mountainView,
    // privateSwimmingPool,
    // commonSwimmingPool,
    // petsAllowed,
    // elevator,
    // listingDate,
    // internalAreaAmount,
    // coveredVerandasAmount,
    // tenancyType,
    // communityFeatures,
    // sellerName,
    // sellerEmail,
    // sellerPhone,
    // salespersonUserName,
    // salespersonUserEmail,
  } = propertyDetailed;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', width: '90%', marginX: 'auto' }}>
      <Title variant="h3" sx={{ marginBottom: '1.5rem' }}>
        {t('title')}
      </Title>
      <SnackbarProvider />
      {error &&
        enqueueSnackbar(error, {
          variant: 'error',
          persist: true,
        })}
      {propertyDetailed && (
        // <ListStyled
        //   sx={{
        //     display: 'flex',
        //     justifyContent: 'center',
        //     alignItems: 'center',
        //     flexWrap: 'wrap',
        //     gap: '5%',
        //     width: '90%',
        //     marginX: 'auto',
        //   }}
        // >
        //   <Card
        //     sx={{
        //       display: 'flex',
        //       justifyContent: 'center',
        //       alignItems: 'center',
        //       flexDirection: 'column',
        //       width: '45%',
        //       marginBottom: '2rem',
        //     }}
        //   >
        //     <Box
        //       sx={{
        //         position: 'relative',
        //         width: '100%',
        //         height: '50%',
        //       }}
        //     >
        //       <CardMediaStyled
        //         sx={{
        //           width: '100%',
        //           objectFit: 'cover',
        //           overflow: 'hidden',
        //         }}
        //       >
        //         <img
        //           src={`${QOBRIX_HOST}${photo}`}
        //           alt={t('alt')}
        //           style={{
        //             width: '100%',
        //             height: '100%',
        //             objectFit: 'cover',
        //           }}
        //         />
        //       </CardMediaStyled>
        //       <TextStyled
        //         sx={{
        //           position: 'absolute',
        //           bottom: '1rem',
        //           right: '1rem',
        //           fontWeight: 'bold',
        //           color: 'white',
        //           textShadow: '1px 1px 2px black',
        //         }}
        //       >
        //         {fCurrency(list_selling_price_amount)}
        //       </TextStyled>
        //     </Box>
        //     <Box
        //       sx={{
        //         display: 'flex',
        //         justifyContent: 'flex-start',
        //         alignContent: 'space-between',
        //         flexDirection: 'column',
        //         padding: '1rem',
        //         width: '100%',
        //         height: '50%',
        //         maxHeight: '50%',
        //         minHeight: '50%',
        //       }}
        //     >
        //       <BoxStyled
        //         sx={{
        //           display: 'flex',
        //           justifyContent: 'space-between',
        //           alignItems: 'center',
        //           width: '100%',
        //         }}
        //       >
        //         <TextStyled
        //           sx={{
        //             fontWeight: 'bold',
        //           }}
        //         >
        //           {t(sale_rent)}
        //         </TextStyled>
        <TextStyled
          sx={{
            fontWeight: 'bold',
          }}
        >
          {t(status)}
        </TextStyled>
        //       </BoxStyled>
        //       <TextMiddleStyled>
        //         {getCountries().find((object) => object.value === country)?.label}, {city}
        //       </TextMiddleStyled>
        //       <LinkStyled href={`/property/${id}`}>
        //         <TypographyStyled>{t('Description')}</TypographyStyled>
        //         <Iconify icon={'ri:arrow-right-s-line'} height={'auto'} />
        //       </LinkStyled>
        //     </Box>
        //   </Card>
        //   );
        // </ListStyled>
      )}
    </Box>
  );
}
