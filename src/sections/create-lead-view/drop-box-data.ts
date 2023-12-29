export type IValues = {
  value: string;
  label: string;
};

export type ICountOfBedroomsValues = {
  value: number;
  label: string;
};

export function getOfferTypes(t: Function): Array<IValues> {
  const offerTypes = [
    { value: 'to_sell', label: t('offerTypeSale') },
    { value: 'to_rent', label: t('offerTypeRent') },
  ];

  return offerTypes;
}

export function getEnquiryTypes(t: Function): Array<IValues> {
  const appartmentTypes = [
    { value: 'apartment', label: t('enquiryTypeApartment') },
    { value: 'condo', label: t('enquiryTypeCondo') },
    { value: 'land', label: t('enquiryTypeLand') },
    { value: 'manufactured', label: t('enquiryTypeManufactured') },
    { value: 'multi_family', label: t('enquiryTypeMultiFamily') },
    { value: 'single_family', label: t('enquiryTypeSingleFamily') },
    { value: 'townhouse', label: t('enquiryTypeTownhouse') },
    { value: 'agriculture', label: t('enquiryTypeAgriculture') },
    { value: 'boat_slip', label: t('enquiryTypeBoatSlip') },
    { value: 'business', label: t('enquiryTypeBusiness') },
    { value: 'cabin', label: t('enquiryTypeCabin') },
    { value: 'deeded_parking', label: t('enquiryTypeDeededParking') },
    { value: 'duplex', label: t('enquiryTypeDuplex') },
    { value: 'farm', label: t('enquiryTypeFarm') },
    { value: 'hotel_motel', label: t('enquiryTypeHotelMotel') },
    { value: 'industrial', label: t('enquiryTypeIndustrial') },
    { value: 'manufactured_on_land', label: t('enquiryTypeManufacturedOnLand') },
    { value: 'mixed_use', label: t('enquiryTypeMixedUse') },
    { value: 'mobile_home', label: t('enquiryTypeMobileHome') },
    { value: 'mobile_home_park', label: t('enquiryTypeMobileHomePark') },
    { value: 'office', label: t('enquiryTypeOffice') },
    { value: 'own_your_own', label: t('enquiryTypeOwnYourOwn') },
    { value: 'quadruplex', label: t('enquiryTypeQuadruplex') },
    { value: 'ranch', label: t('enquiryTypeRanch') },
    { value: 'retail', label: t('enquiryTypeRetail') },
    { value: 'stock_cooperative', label: t('enquiryTypeStockCooperative') },
    { value: 'timeshare', label: t('enquiryTypeTimeshare') },
    { value: 'triplex', label: t('enquiryTypeTriplex') },
    { value: 'warehouse', label: t('enquiryTypeWarehouse') },
  ];

  return appartmentTypes;
}

export function getCountOfBedrooms(): Array<ICountOfBedroomsValues> {
  const countOfBedrooms = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
    { value: 6, label: '6' },
    { value: 7, label: '7' },
    { value: 8, label: '8' },
    { value: 9, label: '9' },
    { value: 10, label: '10' },
  ];

  return countOfBedrooms;
}
