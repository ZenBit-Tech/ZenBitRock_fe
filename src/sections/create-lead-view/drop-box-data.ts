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
    { value: 'to_buy', label: t('offerTypeBuy') },
    { value: 'to_sell', label: t('offerTypeSale') },
    { value: 'to_rent', label: t('offerTypeRent') },
    { value: 'to_let', label: t('offerTypeLet') },
    { value: 'to_manage', label: t('offerTypeManage') },
    { value: 'to_buy_and_rent', label: t('offerTypeBuy&Rent') },
  ];

  return offerTypes;
}

export function getEnquiryTypes(t: Function): Array<IValues> {
  const appartmentTypes = [
    { value: 'House', label: t('enquiryTypeHouse') },
    { value: 'Apartment', label: t('enquiryTypeApartment') },
    { value: 'Land', label: t('enquiryTypeLand') },
    { value: 'Retail', label: t('enquiryTypeRetail') },
    { value: 'Office', label: t('enquiryTypeOffice') },
    { value: 'Industrial', label: t('enquiryTypeIndustrial') },
    { value: 'Investment', label: t('enquiryTypeInvestment') },
    { value: 'Building', label: t('enquiryTypeBuilding') },
    { value: 'Parking Lot', label: t('enquiryTypeParking') },
    { value: 'Hotel', label: t('enquiryTypeHotel') },
    { value: 'Other', label: t('enquiryTypeOther') },
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
