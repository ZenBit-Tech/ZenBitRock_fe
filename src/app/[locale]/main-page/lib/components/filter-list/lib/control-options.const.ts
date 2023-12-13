const getPropertyStatus = (t: (key: string) => string): { value: string; label: string }[] => [
  {
    value: 'pending',
    label: t('pending'),
  },
  {
    value: 'avaliable',
    label: t('avaliable'),
  },
  {
    value: 'reserved',
    label: t('reserved'),
  },
  {
    value: 'sold',
    label: t('sold'),
  },
  {
    value: 'rented',
    label: t('rented'),
  },
  {
    value: 'withdrawn',
    label: t('withdrawn'),
  },
  {
    value: 'onboarding',
    label: t('onboarding'),
  },
  {
    value: 'acquisition',
    label: t('acquisition'),
  },
  {
    value: 'valuation',
    label: t('valuation'),
  },
  {
    value: 'instructed',
    label: t('instructed'),
  },
  {
    value: 'exchange',
    label: t('exchange'),
  },

  {
    value: 'sale_agreed',
    label: t('sale_agreed'),
  },
  {
    value: 'under_offer',
    label: t('under_offer'),
  },
  {
    value: 'sold_subject_to_contract',
    label: t('sold_subject_to_contract'),
  },
];

const BEDROOMS = [
  {
    value: '1',
    label: '1',
  },
  {
    value: '2',
    label: '2',
  },
  {
    value: '3',
    label: '3',
  },
  {
    value: '4',
    label: '4',
  },
];

const getRentOrSaleOption = (t: (key: string) => string): { value: string; label: string }[] => [
  {
    value: 'for_rent',
    label: t('for_rent'),
  },
  {
    value: 'for_sale',
    label: t('for_sale'),
  },
];

export { getPropertyStatus, BEDROOMS, getRentOrSaleOption };
