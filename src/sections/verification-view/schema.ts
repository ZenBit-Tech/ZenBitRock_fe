import * as Yup from 'yup';
import { patterns } from 'constants/patterns';
const LEGAL_AGE = 18;

export const FormSchema = Yup.object().shape({
  firstName: Yup.string()
    .required('Name is required')
    .matches(patterns.name, 'Latin letters, spaces, 2-50 characters'),
  lastName: Yup.string()
    .required('Surname name is required')
    .matches(patterns.name, 'Latin letters, spaces, 2-50 characters'),
  rolesAutocomplete: Yup.mixed<any>().nullable().required('Role is required'),
  genderRadioGroup: Yup.string().required('Choose one option'),
  dateOfBirth: Yup.date<any>()
    .nullable()
    .required('Date of birth is required')
    .max(new Date(), "You can't be born in the future!")
    .test('dob', 'Should be greater than 18', function (value, ctx) {
      const dob = new Date(value);
      const validDate = new Date();
      const valid = validDate.getFullYear() - dob.getFullYear() >= LEGAL_AGE;
      return !valid ? ctx.createError() : valid;
    }),
  nationalityAutocomplete: Yup.mixed<any>().nullable().required('Nationality is required'),
  identityRadioGroup: Yup.string().required('Choose one option'),
  statusRadioGroup: Yup.string().required('Choose one option'),
  street: Yup.string()
    .required('Street is required')
    .matches(patterns.street, 'Latin letters, numbers, commas, periods, hyphens, 2-100 character'),
  city: Yup.string()
    .required('City is required')
    .matches(patterns.city, 'Latin letters, numbers, commas, periods, hyphens, 2-100 character'),
  state: Yup.string()
    .default('')
    .matches(patterns.state, 'Latin letters, numbers, commas, periods, hyphens, 2-100 character'),
  zip: Yup.string()
    .required('Zip code is required')
    .matches(patterns.zipCode, 'Zip code is not valid'),
  countryAutocomplete: Yup.mixed<any>().nullable().required('Nationality is required'),
  phone: Yup.string()
    .required('Phone number is required')
    .matches(patterns.phone, 'Phone number is not valid'),
  singleUpload: Yup.mixed<any>().nullable().required('File is required'),
  confirmationCheckbox: Yup.boolean().oneOf([true], 'Your agree is required'),
  confirmationFirstName: Yup.string()
    .required('Confirm Name is required')
    .oneOf([Yup.ref('firstName')], "Name's not match")
    .matches(patterns.name, 'Latin letters, spaces, 2-50 characters'),
  confirmationLastName: Yup.string()
    .required('Confirm Surname is required')
    .oneOf([Yup.ref('lastName')], "Surname's not match")
    .matches(patterns.name, 'Latin letters, spaces, 2-50 characters'),
});
