import { Box } from '@mui/material';
import {
  BoxDescriptionItem,
  TextStyled,
  TypographyDescriptionLeft,
  TypographyDescriptionRight,
  TypographyInsert,
} from '../styles';
import { fCurrency } from 'utils/format-number';
import { useTranslations } from 'next-intl';
import { IPropertyDetailed } from 'types/property';
import { getCountries } from 'sections/verification-view/drop-box-data';
import splitValue from '../helpers/splitValue';

function InfoBlock({ property }: { property: IPropertyDetailed }) {
  const t = useTranslations('property');
  const {
    price,
    status,
    name,
    propertyType,
    internalAreaAmount,
    coveredVerandasAmount,
    description,
    country,
    city,
    municipality,
    state,
    postCode,
    street,
    listingDate,
    landType,
    communityFeatures,
    unit,
    saleRent,
    bedrooms,
    bathrooms,
    livingrooms,
    kitchenType,
    petsAllowed,
    verandas,
    parking,
    seaView,
    mountainView,
    privateSwimmingPool,
    commonSwimmingPool,
    elevator,
    electricity,
    reception,
    water,
    air,
    alarm,
    fireplace,
    smart,
    storage,
    heating,
  } = property;

  return (
    <Box
      sx={{
        borderEndEndRadius: '8px',
        borderEndStartRadius: '8px',
        borderLeft: '1px solid #00a76f',
        borderRight: '1px solid #00a76f',
        borderBottom: '1px solid #00a76f',
        p: '1.5rem',
      }}
    >
      {name && price && (
        <BoxDescriptionItem>
          <TypographyDescriptionLeft>{name}</TypographyDescriptionLeft>
          <TypographyDescriptionRight>{fCurrency(price)}</TypographyDescriptionRight>
        </BoxDescriptionItem>
      )}

      {status && (
        <TextStyled
          sx={{
            fontWeight: 'bold',
          }}
        >
          {status}
        </TextStyled>
      )}
      {city && (
        <BoxDescriptionItem>
          <TypographyDescriptionLeft>{t('address')}</TypographyDescriptionLeft>
          <TypographyDescriptionRight>
            {postCode && <TypographyInsert>{`${postCode}`}</TypographyInsert>}
            {
              <TypographyInsert>{`${getCountries().find((object) => object.value === country)
                ?.label}`}</TypographyInsert>
            }
            {state && <TypographyInsert>{`${state}`}</TypographyInsert>}
            {municipality && <TypographyInsert>{`${municipality}`}</TypographyInsert>}
            {city && <TypographyInsert>{`${city}`}</TypographyInsert>}
            {street && <TypographyInsert>{`${street}`}</TypographyInsert>}
            {unit && <TypographyInsert>{`${unit}`}</TypographyInsert>}
          </TypographyDescriptionRight>
        </BoxDescriptionItem>
      )}
      {propertyType && (
        <BoxDescriptionItem>
          <TypographyDescriptionLeft>{t('type')}</TypographyDescriptionLeft>
          <TypographyDescriptionRight>{propertyType}</TypographyDescriptionRight>
        </BoxDescriptionItem>
      )}
      {internalAreaAmount && (
        <BoxDescriptionItem>
          <TypographyDescriptionLeft>{t('area')}</TypographyDescriptionLeft>
          <TypographyDescriptionRight>
            {internalAreaAmount} sq m
            {coveredVerandasAmount && ` + veranda: ${coveredVerandasAmount} sq m`}
          </TypographyDescriptionRight>
        </BoxDescriptionItem>
      )}
      {saleRent && (
        <BoxDescriptionItem>
          <TypographyDescriptionLeft>{t('operation')}</TypographyDescriptionLeft>
          <TypographyDescriptionRight>{t(saleRent)}</TypographyDescriptionRight>
        </BoxDescriptionItem>
      )}
      {description && (
        <BoxDescriptionItem>
          <TypographyDescriptionLeft>{t('description')}</TypographyDescriptionLeft>
          <TypographyDescriptionRight>{description}</TypographyDescriptionRight>
        </BoxDescriptionItem>
      )}
      {listingDate && (
        <BoxDescriptionItem>
          <TypographyDescriptionLeft>{t('since')}</TypographyDescriptionLeft>
          <TypographyDescriptionRight>{`${Math.ceil(
            (Date.now() - Date.parse(listingDate)) / 1000 / 60 / 60 / 24
          )} days`}</TypographyDescriptionRight>
        </BoxDescriptionItem>
      )}
      <BoxDescriptionItem>
        <TypographyDescriptionLeft>{t('internal')}</TypographyDescriptionLeft>
        <TypographyDescriptionRight>
          {bedrooms && <TypographyInsert>{`${t('bedrooms')}: ${bedrooms}pc`}</TypographyInsert>}
          {bathrooms && <TypographyInsert>{`${t('bathrooms')}: ${bathrooms}pc`}</TypographyInsert>}
          {livingrooms && (
            <TypographyInsert>{`${t('livingrooms')}: ${livingrooms}pc`}</TypographyInsert>
          )}
          {kitchenType && (
            <TypographyInsert>{`${t('kitchenType')}: ${splitValue(kitchenType)}`}</TypographyInsert>
          )}
          {petsAllowed ? (
            <TypographyInsert>{t('petsAllowed')}</TypographyInsert>
          ) : (
            <TypographyInsert>{t('petsNotAllowed')}</TypographyInsert>
          )}
          {electricity && <TypographyInsert>{t('electricity')}</TypographyInsert>}
          {water && <TypographyInsert>{t('water')}</TypographyInsert>}
          {air && <TypographyInsert>{t('air')}</TypographyInsert>}
          {smart && <TypographyInsert>{t('smart')}</TypographyInsert>}
          {alarm && <TypographyInsert>{t('alarm')}</TypographyInsert>}
          {heating && <TypographyInsert>{`${t('heating')}: ${heating}`}</TypographyInsert>}
        </TypographyDescriptionRight>
      </BoxDescriptionItem>
      <BoxDescriptionItem>
        <TypographyDescriptionLeft>{t('external')}</TypographyDescriptionLeft>
        <TypographyDescriptionRight>
          {verandas && <TypographyInsert>{`${t('verandas')}: ${verandas}pc`}</TypographyInsert>}
          {parking && <TypographyInsert>{`${t('parking')}: ${parking}pc`}</TypographyInsert>}
          {seaView && <TypographyInsert>{`${t('seaView')}`}</TypographyInsert>}
          {mountainView && <TypographyInsert>{t('mountainView')}</TypographyInsert>}
          {privateSwimmingPool && <TypographyInsert>{t('privateSwimmingPool')}</TypographyInsert>}
          {commonSwimmingPool && <TypographyInsert>{t('commonSwimmingPool')}</TypographyInsert>}
          {elevator && <TypographyInsert>{t('elevator')}</TypographyInsert>}
          {reception && <TypographyInsert>{t('reception')}</TypographyInsert>}
          {fireplace && <TypographyInsert>{t('fireplace')}</TypographyInsert>}
          {storage && <TypographyInsert>{t('storage')}</TypographyInsert>}
        </TypographyDescriptionRight>
      </BoxDescriptionItem>
      {landType && (
        <BoxDescriptionItem>
          <TypographyDescriptionLeft>{t('tenure')}</TypographyDescriptionLeft>
          <TypographyDescriptionRight>{landType}</TypographyDescriptionRight>
        </BoxDescriptionItem>
      )}
      {communityFeatures?.length !== 0 && (
        <BoxDescriptionItem>
          <TypographyDescriptionLeft>{t('community')}</TypographyDescriptionLeft>
          <TypographyDescriptionRight>{communityFeatures}</TypographyDescriptionRight>
        </BoxDescriptionItem>
      )}
    </Box>
  );
}

export default InfoBlock;
