/* eslint-disable @typescript-eslint/no-explicit-any */
import * as Yup from 'yup';

import { patterns } from 'constants/patterns';
import { VerificationData } from 'types/verification-data';

import { Values } from './drop-box-data';

const LEGAL_AGE = 18;

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

export const FormSchema = Yup.object().shape<Shape<VerificationData>>({
  firstName: Yup.string()
    .required('Name is required')
    .matches(patterns.name, 'Latin letters, spaces, 2-50 characters'),
  lastName: Yup.string()
    .required('Surname name is required')
    .matches(patterns.name, 'Latin letters, spaces, 2-50 characters'),
  rolesAutocomplete: Yup.mixed<Values>().nullable().required('Role is required'),
  genderRadioGroup: Yup.string().required('Choose one option'),
  dateOfBirth: Yup.date<Date>()
    .nullable()
    .required('Date of birth is required')
    .max(new Date(), "You can't be born in the future!")
    .test('dob', 'Should be greater than 18', (value, ctx) => {
      const dob = new Date(value);
      const today = new Date();
      const legalDate = new Date(today);

      legalDate.setFullYear(legalDate.getFullYear() - LEGAL_AGE);
      const valid = today >= dob && legalDate >= dob;

      return !valid ? ctx.createError() : valid;
    }),
  nationalityAutocomplete: Yup.mixed<Values>().nullable().required('Nationality is required'),
  identityRadioGroup: Yup.string().required('Choose one option'),
  statusRadioGroup: Yup.string().required('Choose one option'),
  street: Yup.string()
    .required('Street is required')
    .matches(patterns.street, 'Latin letters, numbers, commas, periods, hyphens, 2-100 character'),
  city: Yup.string()
    .required('City is required')
    .matches(patterns.city, 'Latin letters, numbers, commas, periods, hyphens, 2-100 character'),
  state: Yup.string().matches(
    patterns.state,
    'Latin letters, numbers, commas, periods, hyphens, 2-100 character'
  ),
  zip: Yup.string()
    .required('Zip code is required')
    .matches(patterns.zipCode, 'Zip code is not valid'),
  countryAutocomplete: Yup.mixed<Values>().nullable().required('Nationality is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(patterns.phone, 'Phone number is not valid'),
  singleUpload: Yup.mixed<File>().nullable().required('File is required'),
  confirmationCheckbox: Yup.boolean().oneOf([true], 'Your agree is required'),
});
