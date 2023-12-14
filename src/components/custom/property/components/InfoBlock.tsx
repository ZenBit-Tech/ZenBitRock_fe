import { useTranslations } from 'next-intl';

import { Box } from '@mui/material';

import { colors } from 'constants/colors';
import { getCountries } from 'sections/verification-view/drop-box-data';
import { IPropertyDetailed } from 'types/property';
import { fCurrency } from 'utils/format-number';

import firstUpperCase from '../helpers/firstUpperCase';
import splitValue from '../helpers/splitValue';
import {
  BoxDescriptionItem,
  TextStyled,
  TypographyDescriptionLeft,
  TypographyDescriptionRight,
  TypographyInsert,
} from '../styles';

function InfoBlock({ property }: { property: IPropertyDetailed }): JSX.Element {
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
        borderLeft: `1px solid ${colors.BUTTON_PRIMARY_COLOR}`,
        borderRight: `1px solid ${colors.BUTTON_PRIMARY_COLOR}`,
        borderBottom: `1px solid ${colors.BUTTON_PRIMARY_COLOR}`,
        p: '1.5rem',
      }}
    >
      {name && price && (
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '1.5rem',
          }}
        >
          <TextStyled
            sx={{
              fontWeight: 'bold',
            }}
          >
            {name}
          </TextStyled>
          <TextStyled
            className="price"
            sx={{
              fontWeight: 'bold',
            }}
          >
            {fCurrency(price)}
          </TextStyled>
        </Box>
      )}

      {status && (
        <TextStyled
          className="underline"
          sx={{
            fontWeight: 'bold',
            marginBottom: '1rem',
          }}
        >
          {firstUpperCase(status)}
        </TextStyled>
      )}
      {city && (
        <BoxDescriptionItem>
          <TypographyDescriptionLeft>{t('address')}</TypographyDescriptionLeft>
          <TypographyDescriptionRight>
            {postCode && <TypographyInsert as="span">{`${postCode}`}</TypographyInsert>}
            <TypographyInsert as="span">{`${getCountries().find(
              (object) => object.value === country
            )?.label}`}</TypographyInsert>
            {state && <TypographyInsert as="span">{`${state}`}</TypographyInsert>}
            {municipality && <TypographyInsert as="span">{`${municipality}`}</TypographyInsert>}
            {city && <TypographyInsert as="span">{`${city}`}</TypographyInsert>}
            {street && <TypographyInsert as="span">{`${street}`}</TypographyInsert>}
            {unit && <TypographyInsert as="span">{`${unit}`}</TypographyInsert>}
          </TypographyDescriptionRight>
        </BoxDescriptionItem>
      )}
      {propertyType && (
        <BoxDescriptionItem>
          <TypographyDescriptionLeft>{t('type')}</TypographyDescriptionLeft>
          <TypographyDescriptionRight>{firstUpperCase(propertyType)}</TypographyDescriptionRight>
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
          {bedrooms && (
            <TypographyInsert as="span">{`${t('bedrooms')}: ${bedrooms}pc`}</TypographyInsert>
          )}
          {bathrooms && (
            <TypographyInsert as="span">{`${t('bathrooms')}: ${bathrooms}pc`}</TypographyInsert>
          )}
          {livingrooms && (
            <TypographyInsert as="span">{`${t('livingrooms')}: ${livingrooms}pc`}</TypographyInsert>
          )}
          {kitchenType && (
            <TypographyInsert as="span">{`${t('kitchenType')}: ${splitValue(
              kitchenType
            )}`}</TypographyInsert>
          )}
          {petsAllowed ? (
            <TypographyInsert as="span">{t('petsAllowed')}</TypographyInsert>
          ) : (
            <TypographyInsert as="span">{t('petsNotAllowed')}</TypographyInsert>
          )}
          {electricity && <TypographyInsert as="span">{t('electricity')}</TypographyInsert>}
          {water && <TypographyInsert as="span">{t('water')}</TypographyInsert>}
          {air && <TypographyInsert as="span">{t('air')}</TypographyInsert>}
          {smart && <TypographyInsert as="span">{t('smart')}</TypographyInsert>}
          {alarm && <TypographyInsert as="span">{t('alarm')}</TypographyInsert>}
          {heating && (
            <TypographyInsert as="span">{`${t('heating')}: ${t(heating)}`}</TypographyInsert>
          )}
        </TypographyDescriptionRight>
      </BoxDescriptionItem>
      <BoxDescriptionItem>
        <TypographyDescriptionLeft>{t('external')}</TypographyDescriptionLeft>
        <TypographyDescriptionRight>
          {verandas && (
            <TypographyInsert as="span">{`${t('verandas')}: ${verandas}pc`}</TypographyInsert>
          )}
          {parking && (
            <TypographyInsert as="span">{`${t('parking')}: ${parking}pc`}</TypographyInsert>
          )}
          {seaView && <TypographyInsert as="span">{`${t('seaView')}`}</TypographyInsert>}
          {mountainView && <TypographyInsert as="span">{t('mountainView')}</TypographyInsert>}
          {privateSwimmingPool && (
            <TypographyInsert as="span">{t('privateSwimmingPool')}</TypographyInsert>
          )}
          {commonSwimmingPool && (
            <TypographyInsert as="span">{t('commonSwimmingPool')}</TypographyInsert>
          )}
          {elevator && <TypographyInsert as="span">{t('elevator')}</TypographyInsert>}
          {reception && <TypographyInsert as="span">{t('reception')}</TypographyInsert>}
          {fireplace && <TypographyInsert as="span">{t('fireplace')}</TypographyInsert>}
          {storage && <TypographyInsert as="span">{t('storage')}</TypographyInsert>}
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
