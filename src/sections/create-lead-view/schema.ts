/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-else-return */
import * as Yup from 'yup';
import { patterns } from 'constants/patterns';
import { ICreateLeadData } from 'types/create-lead-data';
import { QobrixLocations } from 'types/qobrix';
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
  leadSource: Yup.string().matches(patterns.textArea, 'Latin letters, 10-200 characters'),
  description: Yup.string().matches(patterns.textArea, 'Latin letters, 10-200 characters'),
  enquiryType: Yup.mixed<IValues>().nullable().required('Enquiry type is required'),
  countOfBedrooms: Yup.mixed<ICountOfBedroomsValues>().nullable(),
  totalAreaFrom: Yup.number()
    .nullable()
    .min(0, 'Should be more than 0')
    .test({
      name: 'lessThan',
      message: 'Should be less than max value',
      test(value) {
        const { totalAreaTo, totalAreaFrom } = this.parent;

        if (value) return (totalAreaTo === 0 && totalAreaFrom === 0) || value < totalAreaTo;
        else return true;
      },
    })
    .test({
      name: 'notOneOf',
      message: 'Values should not be equal',
      test(value) {
        const { totalAreaTo } = this.parent;

        return totalAreaTo === 0 || value !== totalAreaTo;
      },
    }),
  totalAreaTo: Yup.number()
    .nullable()
    .max(10000, 'Max 10000')
    .test({
      name: 'moreThan',
      message: 'Should be more than min value',
      test(value) {
        const { totalAreaFrom, totalAreaTo } = this.parent;

        if (value) return (totalAreaFrom === 0 && totalAreaTo === 0) || value > totalAreaFrom;
        else return true;
      },
    })
    .test({
      name: 'notOneOf',
      message: 'Values should not be equal',
      test(value) {
        const { totalAreaFrom } = this.parent;

        return totalAreaFrom === 0 || value !== totalAreaFrom;
      },
    }),
  priceRangeRentFrom: Yup.number()
    .min(100, 'Min 100')
    .lessThan(Yup.ref('priceRangeRentTo'), 'Should be less than max value')
    .notOneOf([Yup.ref('priceRangeRentTo')], 'Values should not be equal'),
  priceRangeRentTo: Yup.number()
    .max(10000, 'Max 10000')
    .moreThan(Yup.ref('priceRangeRentFrom'), 'Should be more than min value')
    .notOneOf([Yup.ref('priceRangeRentFrom')], 'Values should not be equal'),
  priceRangeBuyFrom: Yup.number()
    .min(10000, 'Min 10000')
    .lessThan(Yup.ref('priceRangeBuyTo'), 'Should be less than max value')
    .notOneOf([Yup.ref('priceRangeBuyTo')], 'Values should not be equal'),
  priceRangeBuyTo: Yup.number()
    .max(10000000, 'Max 10000000')
    .moreThan(Yup.ref('priceRangeBuyFrom'), 'Should be more than min value')
    .notOneOf([Yup.ref('priceRangeBuyFrom')], 'Values should not be equal'),
  locations: Yup.mixed<QobrixLocations>().nullable(),
});
