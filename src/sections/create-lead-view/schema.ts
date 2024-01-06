/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-else-return */
import * as Yup from 'yup';
import { patterns } from 'constants/patterns';
import { ICreateLeadData } from 'types/create-lead-data';
import { QobrixLocations } from 'types/qobrix';
import i18n from 'locales/118n';
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
    .nullable()
    .min(0, i18n.t('CreateLeadPage.yupErrorMessageTotalAreaFrom'))
    .test({
      name: 'lessThan',
      message: i18n.t('CreateLeadPage.yupErrorMessageTotalAreaFrom'),
      test(value) {
        const { totalAreaTo, totalAreaFrom } = this.parent;

        if (value) return (totalAreaTo === 0 && totalAreaFrom === 0) || value < totalAreaTo;
        else return true;
      },
    })
    .test({
      name: 'notOneOf',
      message: i18n.t('CreateLeadPage.yupErrorMessageTotalAreaFrom'),
      test(value) {
        const { totalAreaTo } = this.parent;

        return totalAreaTo === 0 || value !== totalAreaTo;
      },
    }),
  totalAreaTo: Yup.number()
    .nullable()
    .max(10000, i18n.t('CreateLeadPage.yupErrorMessageTotalAreaTo'))
    .test({
      name: 'moreThan',
      message: i18n.t('CreateLeadPage.yupErrorMessageTotalAreaTo'),
      test(value) {
        const { totalAreaFrom, totalAreaTo } = this.parent;

        if (value) return (totalAreaFrom === 0 && totalAreaTo === 0) || value > totalAreaFrom;
        else return true;
      },
    })
    .test({
      name: 'notOneOf',
      message: i18n.t('CreateLeadPage.yupErrorMessageTotalAreaTo'),
      test(value) {
        const { totalAreaFrom } = this.parent;

        return totalAreaFrom === 0 || value !== totalAreaFrom;
      },
    }),
  priceRangeRentFrom: Yup.number()
    .min(100, i18n.t('CreateLeadPage.yupErrorMessagePriceRangeRentFrom'))
    .lessThan(
      Yup.ref('priceRangeRentTo'),
      i18n.t('CreateLeadPage.yupErrorMessagePriceRangeRentFrom')
    )
    .notOneOf(
      [Yup.ref('priceRangeRentTo')],
      i18n.t('CreateLeadPage.yupErrorMessagePriceRangeRentFrom')
    ),
  priceRangeRentTo: Yup.number()
    .max(10000, i18n.t('CreateLeadPage.yupErrorMessagePriceRangeRentTo'))
    .moreThan(
      Yup.ref('priceRangeRentFrom'),
      i18n.t('CreateLeadPage.yupErrorMessagePriceRangeRentTo')
    )
    .notOneOf(
      [Yup.ref('priceRangeRentFrom')],
      i18n.t('CreateLeadPage.yupErrorMessagePriceRangeRentTo')
    ),
  priceRangeBuyFrom: Yup.number()
    .min(10000, i18n.t('CreateLeadPage.yupErrorMessagePriceRangeBuyFrom'))
    .lessThan(Yup.ref('priceRangeBuyTo'), i18n.t('CreateLeadPage.yupErrorMessagePriceRangeBuyFrom'))
    .notOneOf(
      [Yup.ref('priceRangeBuyTo')],
      i18n.t('CreateLeadPage.yupErrorMessagePriceRangeBuyFrom')
    ),
  priceRangeBuyTo: Yup.number()
    .max(10000000, i18n.t('CreateLeadPage.yupErrorMessagePriceRangeBuyTo'))
    .moreThan(
      Yup.ref('priceRangeBuyFrom'),
      i18n.t('CreateLeadPage.yupErrorMessagePriceRangeBuyTo')
    ),
  locations: Yup.mixed<QobrixLocations>().nullable(),
});
