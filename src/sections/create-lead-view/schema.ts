/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';
import { patterns } from 'constants/patterns';
import { ICreateLeadData } from 'types/create-lead-data';
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
  offeringType: Yup.mixed<IValues>().nullable().required('Offering type is required'),
  leadSource: Yup.string().matches(patterns.textArea, 'Latin letters, 10-200 characters'),
  description: Yup.string().matches(patterns.textArea, 'Latin letters, 10-200 characters'),
  enquiryType: Yup.mixed<IValues>().nullable().required('Enquiry type is required'),
  countOfBedrooms: Yup.mixed<ICountOfBedroomsValues>().nullable(),
  totalAreaFrom: Yup.number().min(0, 'Only positive value').max(10000, 'Max 10000'),
  totalAreaTo: Yup.number().min(0, 'Only positive value').max(10000, 'Max 10000'),
  priceRahgeRentFrom: Yup.number().min(0, 'Only positive value').max(1000000, 'Max 1000000'),
  priceRahgeRentTo: Yup.number().min(0, 'Only positive value').max(1000000, 'Max 10000000'),
  priceRahgeSellFrom: Yup.number().min(0, 'Only positive value').max(1000000, 'Max 1000000'),
  priceRahgeSellTo: Yup.number().min(0, 'Only positive value').max(1000000, 'Max 10000000'),
});
