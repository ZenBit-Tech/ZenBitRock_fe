import { PropertyFilterFormData } from 'types';
import { QobrixPropertySaleRent } from 'enums/qobrix';
import { randomValues } from 'constants/randomValues';
import { fieldFormats } from 'constants/fieldFormats';

const formatSlash = (value: string) => {
  const words = value.toLowerCase().split('_');
  words[0] = words[0].charAt(0).toUpperCase() + words[0].slice(1);
  return words.join(' ');
};

const getFilterString = (formData: PropertyFilterFormData): string => {
  let filters = [];
  const {
    rentOrSale,
    location,
    propertyType,
    status,
    bedrooms,
    priceRangeSaleFrom,
    priceRangeSaleTo,
    priceRangeRentFrom,
    priceRangeRentTo,
  } = formData;

  if (rentOrSale) {
    filters.push(formatSlash(rentOrSale));
  }

  if (location) {
    filters.push(
      `location: ${
        location?.label?.trim().endsWith(',')
          ? location.label.trim().slice(0, -1)
          : location?.label?.trim()
      }`
    );
  }

  if (propertyType) {
    const typeFilter =
      propertyType.value === randomValues.PARKING_LOT
        ? formatSlash(propertyType.value)
        : propertyType.label;
    filters.push(`${randomValues.TYPE}: ${typeFilter}`);
  }
  if (status) {
    filters.push(
      `${randomValues.STATUS}: ${
        status.value.length > 1 ? formatSlash(status.value) : status.value
      }`
    );
  }

  if (bedrooms) {
    filters.push(`${randomValues.BEDROOMS}: ${bedrooms.value}`);
  }
  if (rentOrSale === QobrixPropertySaleRent.FOR_SALE && priceRangeSaleFrom) {
    filters.push(
      `${randomValues.PRICE_FROM}: ${Number(priceRangeSaleFrom).toLocaleString(
        fieldFormats.FORMAT_ZONE
      )}`
    );
  }
  if (rentOrSale === QobrixPropertySaleRent.FOR_SALE && priceRangeSaleTo) {
    filters.push(
      `${randomValues.PRICE_TO}: ${Number(priceRangeSaleTo).toLocaleString(
        fieldFormats.FORMAT_ZONE
      )}`
    );
  }
  if (rentOrSale === QobrixPropertySaleRent.FOR_RENT && priceRangeRentFrom) {
    filters.push(
      `${randomValues.PRICE_FROM}: ${Number(priceRangeRentFrom).toLocaleString(
        fieldFormats.FORMAT_ZONE
      )}`
    );
  }
  if (rentOrSale === QobrixPropertySaleRent.FOR_RENT && priceRangeRentTo) {
    filters.push(
      `${randomValues.PRICE_TO}: ${Number(priceRangeRentTo).toLocaleString(
        fieldFormats.FORMAT_ZONE
      )}`
    );
  }

  return filters.join(', ');
};

export { getFilterString };
