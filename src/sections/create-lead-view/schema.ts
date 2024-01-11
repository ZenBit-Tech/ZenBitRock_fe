/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-else-return */
import * as Yup from 'yup';
import { patterns } from 'constants/patterns';
import { ICreateLeadData } from 'types/create-lead-data';
import { QobrixLocations } from 'types/qobrix';
import i18n from 'locales/118n';
import { ranges } from 'constants/property-price-ranges';
import { ICountOfBedroomsValues, IValues } from './drop-box-data';

export type ConditionalSchema<T> = T extends string
  ? Yup.StringSchema
  : T extends number
  ? Yup.NumberSchema
  : T extends boolean
  ? Yup.BooleanSchema
  : T extends Record<any, any>
  ? Yup.AnyObjectSchema
  : T extends Array<any>
  ? Yup.ArraySchema<any, any>
  : Yup.AnySchema;

export type Shape<Fields> = {
  [Key in keyof Fields]: ConditionalSchema<Fields[Key]>;
};

export const FormSchema = Yup.object().shape<Shape<ICreateLeadData>>({
  offeringType: Yup.string(),
  leadSource: Yup.string().matches(
    patterns.textArea,
    i18n.t('CreateLeadPage.yupErrorMessageLeadSource')
  ),
  description: Yup.string().matches(
    patterns.textArea,
    i18n.t('CreateLeadPage.yupErrorMessageDescription')
  ),
  enquiryType: Yup.mixed<IValues>()
    .nullable()
    .required(i18n.t('CreateLeadPage.yupErrorMessageEnquiryType')),
  countOfBedrooms: Yup.mixed<ICountOfBedroomsValues>().nullable(),
  totalAreaFrom: Yup.number()
    .test({
      name: 'min-max',
      message: i18n.t('CreateLeadPage.yupErrorMessageTotalAreaFrom'),
      test(value) {
        if (value !== undefined)
          return value >= ranges.TOTAL_AREA_MIN && value <= ranges.TOTAL_AREA_MAX;
        else return true;
      },
    })
    .test({
      name: 'less-than & not-required',
      message: i18n.t('CreateLeadPage.yupErrorMessageTotalAreaFrom'),
      test(value) {
        const { totalAreaTo } = this.parent;

        if (value !== undefined) return value < totalAreaTo || (value === 0 && totalAreaTo === 0);
        else return true;
      },
    }),
  totalAreaTo: Yup.number()
    .test({
      name: 'min-max',
      message: i18n.t('CreateLeadPage.yupErrorMessageTotalAreaTo'),
      test(value) {
        if (value !== undefined)
          return value >= ranges.TOTAL_AREA_MIN && value <= ranges.TOTAL_AREA_MAX;
        else return true;
      },
    })
    .test({
      name: 'more-than & not-required',
      message: i18n.t('CreateLeadPage.yupErrorMessageTotalAreaTo'),
      test(value) {
        const { totalAreaFrom } = this.parent;

        if (value !== undefined)
          return value > totalAreaFrom || (value === 0 && totalAreaFrom === 0);
        else return true;
      },
    }),
  priceRangeRentFrom: Yup.number()
    .test({
      name: 'min-max',
      message: i18n.t('CreateLeadPage.yupErrorMessagePriceRangeRentFrom'),
      test(value) {
        if (value !== undefined)
          return value >= ranges.PRICE_RANGE_RENT_MIN && value <= ranges.PRICE_RANGE_RENT_MAX;
        else return true;
      },
    })
    .test({
      name: 'less-than',
      message: i18n.t('CreateLeadPage.yupErrorMessagePriceRangeRentFrom'),
      test(value) {
        const { priceRangeRentTo } = this.parent;

        if (value !== undefined) return value < priceRangeRentTo;
        else return true;
      },
    }),
  priceRangeRentTo: Yup.number()
    .test({
      name: 'min-max',
      message: i18n.t('CreateLeadPage.yupErrorMessagePriceRangeRentTo'),
      test(value) {
        if (value !== undefined)
          return value >= ranges.PRICE_RANGE_RENT_MIN && value <= ranges.PRICE_RANGE_RENT_MAX;
        else return true;
      },
    })
    .test({
      name: 'more-than',
      message: i18n.t('CreateLeadPage.yupErrorMessagePriceRangeRentTo'),
      test(value) {
        const { priceRangeRentFrom } = this.parent;

        if (value !== undefined) return value > priceRangeRentFrom;
        else return true;
      },
    }),
  priceRangeBuyFrom: Yup.number()
    .test({
      name: 'min-max',
      message: i18n.t('CreateLeadPage.yupErrorMessagePriceRangeBuyFrom'),
      test(value) {
        if (value !== undefined)
          return value >= ranges.PRICE_RANGE_BUY_MIN && value <= ranges.PRICE_RANGE_BUY_MAX;
        else return true;
      },
    })
    .test({
      name: 'less-than',
      message: i18n.t('CreateLeadPage.yupErrorMessagePriceRangeBuyFrom'),
      test(value) {
        const { priceRangeBuyTo } = this.parent;

        if (value !== undefined) return value < priceRangeBuyTo;
        else return true;
      },
    }),
  priceRangeBuyTo: Yup.number()
    .test({
      name: 'min-max',
      message: i18n.t('CreateLeadPage.yupErrorMessagePriceRangeBuyTo'),
      test(value) {
        if (value !== undefined)
          return value >= ranges.PRICE_RANGE_BUY_MIN && value <= ranges.PRICE_RANGE_BUY_MAX;
        else return true;
      },
    })
    .test({
      message: i18n.t('CreateLeadPage.yupErrorMessagePriceRangeBuyTo'),
      test(value) {
        const { priceRangeBuyFrom } = this.parent;

        if (value !== undefined) return value > priceRangeBuyFrom;
        else return true;
      },
    }),
  locations: Yup.mixed<QobrixLocations>().nullable(),
});
